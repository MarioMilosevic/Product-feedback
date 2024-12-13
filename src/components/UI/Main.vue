<template>
  <main :class="mainClass">
    <Navigation
      @open-modal="openModal"
      :name="page"
      :activeCategory="roadmapActiveSection"
    />
    <template v-if="feedbacks.length > 0">
      <Feedback
        v-if="page === 'home'"
        v-for="feedback in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        @update-like="updateLikedIds"
      />
      <template v-else-if="page === 'roadmap'">
        <RoadmapTitle
          v-for="(status, index) in statusOptions"
          :key="status.id"
          :status="status"
          :isSelected="roadmapActiveSection === index"
          @click="changeSection(index)"
        />
        <ul class="roadmapMain__list">
          <RoadmapSectionTitle
            :selectedStatus="statusOptions[roadmapActiveSection]"
            :count="
              filterFeedbackByStatus(statusOptions[roadmapActiveSection].name)
            "
          />
          <RoadmapFeedback
            v-for="feedback in feedbacks"
            :feedback="feedback"
            :key="feedback.id"
          />
        </ul>
      </template>
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
import Footer from "src/components/UI/Footer.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";
import RoadmapFeedback from "src/components/roadmap/RoadmapFeedback.vue";
import RoadmapSectionTitle from "src/components/roadmap/RoadmapSectionTitle.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType } from "src/utils/types";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  name: "Main",
  components: {
    Feedback,
    Navigation,
    ModalForm,
    Nofeedbacks,
    RoadmapTitle,
    RoadmapFeedback,
    RoadmapSectionTitle,
    Footer,
    LoadingSpinner,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isObserving: true,
      loadingObserver: null as IntersectionObserver | null,
      roadmapActiveSection: 0,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "statusOptions",
      "isModalOpen",
      "currentPage",
      "filterOptions",
      "searchValue"
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
      "setLoading",
      "setFeedbacks",
    ]),
    filterFeedbackByStatus(statusName: string) {
      const filteredFeedbacks = this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
      return filteredFeedbacks.length;
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
    async changeSection(index: number) {
      this.roadmapActiveSection = index;
      this.setCurrentPage(2);
      const data = await fetchFeedbacks(
        this.filterOptions,
        1,
        this.roadmapActiveSection + 1
      );
      this.setFeedbacks(data as FeedbackType[]);
    },
    setupObserver() {
      this.isObserving = true;
      this.loadingObserver?.disconnect();
      this.loadingObserver = null;

      this.loadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && this.isObserving) {
              let feedbacksData;
              if (this.page === "home") {
                feedbacksData = await fetchFeedbacks(
                  this.filterOptions,
                  this.currentPage
                );
              } else if (this.page === "roadmap") {
                feedbacksData = await fetchFeedbacks(
                  this.filterOptions,
                  this.currentPage,
                  this.roadmapActiveSection + 1,
                  this.searchValue
                );
              }
              if (
                feedbacksData &&
                feedbacksData.length > 0 &&
                feedbacksData.length !== this.feedbacks.length
              ) {
                this.setCurrentPage(this.currentPage + 1);
                this.setFeedbacks(feedbacksData);
                this.setFeedbacks(feedbacksData);
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
  mounted() {
    this.setupObserver();
  },
  beforeUnmount() {
    this.observerUnobserve();
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / 10;

  @include mixins.respond(medium) {
    column-gap: $big;
  }

  &__list {
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    padding: 0 $medium;
    gap: $big;

    @include mixins.respond(small) {
      column-gap: $medium;
    }
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
