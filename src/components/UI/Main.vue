<template>
  <main :class="mainClass">
    <Navigation @open-modal="openModal" :name="page" />
    <template v-if="feedbacks.length > 0">
      <Feedback
        v-if="page === 'home'"
        v-for="feedback in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        @update-like="updateLikedIds"
      />
      <RoadmapPageSection
        v-else-if="page === 'roadmap'"
        v-for="status in statusOptions"
        :key="status.id"
        :status="status"
        :filteredFeedbacks="filterFeedbackByStatus(status.name)"
      />
    </template>
    <Nofeedbacks v-else @open-modal="openModal" />
    <div :class="['loading', loadingPosition]" ref="loadingRef">
      <LoadingSpinner v-if="isObserving" :style="{ margin: '0 auto' }" />
      <Footer v-if="!isObserving" />
    </div>
    <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
  </main>
</template>

<script lang="ts">
import Feedback from "src/components/feedbacks/Feedback.vue";
import Navigation from "src/components/feedbacks/Navigation.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import Nofeedbacks from "src/components/feedbacks/Nofeedbacks.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import Footer from "src/components/UI/Footer.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { PropType } from "vue";
import { FeedbackType, StatusType } from "src/utils/types";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  name: "Main",
  components: {
    Feedback,
    Navigation,
    ModalForm,
    Nofeedbacks,
    RoadmapPageSection,
    Footer,
    LoadingSpinner,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<FeedbackType[] | StatusType[]>,
      required: true,
    },
  },
  data() {
    return {
      isObserving: true,
      loadingObserver: null as IntersectionObserver | null,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "statusOptions",
      "isModalOpen",
      "currentPage",
      "filterOptions",
    ]),
    mainClass() {
      return `${this.page}Main`;
    },
    loadingPosition() {
      return `${this.page}Loading`;
    },
    loadingRef() {
      return this.$refs.loadingRef;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setFeedbacksLikes",
      "setIsModalOpen",
      "setCurrentPage",
      "addMultipleFeedbacksToStore",
      "setLoading",
      "setFeedbacks",
    ]),
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
    closeModal() {
      this.setIsModalOpen(false);
    },
    openModal() {
      this.setIsModalOpen(true);
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
    setupObserver() {
      this.isObserving = true;
      this.loadingObserver?.disconnect();
      this.loadingObserver = null;

      this.loadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && this.isObserving) {
              const nextFeedbacksData = await fetchFeedbacks(
                this.filterOptions,
                this.currentPage,
              );
              if (nextFeedbacksData && nextFeedbacksData.length > 0) {
                this.setCurrentPage(this.currentPage + 1);
                this.addMultipleFeedbacksToStore(
                  nextFeedbacksData,
                  this.filterOptions.sort
                );
              } else {
                this.observerUnobserve();
              }
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        }
      );
      this.observerObserve();
    },
    observerObserve() {
      if (this.loadingObserver) {
        this.loadingObserver.observe(this.loadingRef as HTMLElement);
      }
    },
    observerUnobserve() {
      if (this.loadingObserver) {
        this.loadingObserver.unobserve(this.loadingRef as HTMLElement);
        this.loadingObserver = null;
      }
      this.isObserving = false;
    },
  },
  beforeUnmount() {
    this.observerUnobserve();
  },
  mounted() {
    this.setupObserver();
  },
  watch: {
    currentPage(newValue) {
      if (newValue === 2) {
        this.setupObserver();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.homeMain {
  display: flex;
  flex-direction: column;
  grid-column: span 8;
  gap: $medium;

  @include mixins.respond(small) {
    grid-column: span 9;
  }
  @include mixins.respond(medium) {
    grid-column: span 9;
  }
}
.roadmapMain {
  grid-column: 1 / 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 4rem;
  column-gap: $very-big;

  @include mixins.respond(small) {
    display: none;
  }
  @include mixins.respond(medium) {
    column-gap: $big;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  gap: $very-big;
}

.homeLoading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.roadmapLoading {
  grid-column: 2/3;
}
</style>
