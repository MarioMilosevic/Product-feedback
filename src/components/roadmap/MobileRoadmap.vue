<template>
  <main class="main">
    <Navigation name="roadmap" @open-modal="openModal" />
    <RoadmapTitle
      v-for="(status, index) in data"
      :key="status.id"
      :title="status.name"
      :isSelected="active === index"
      @click="changeSection(index)"
    />
    <RoadmapPageSection
      :status="statusOptions[active]"
      :filteredFeedbacks="feedbacks"
    />
    <div class="main__bottom" ref="loadingRef">
      <LoadingSpinner v-if="isObserving" :style="{ margin: '0 auto' }" />
      <Footer v-else />
    </div>
    <ModalForm :is-modal-open="isModalOpen" @close-modal="closeModal" />
  </main>
</template>
<script lang="ts">
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";
import RoadmapHeading from "src/components/roadmap/RoadmapHeading.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Footer from "src/components/UI/Footer.vue";
import { FeedbackType, StatusType } from "src/utils/types";
import { PropType } from "vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFeedbacks } from "src/api/FeedbacksApi";

export default {
  components: {
    Navigation,
    RoadmapPageSection,
    RoadmapHeading,
    RoadmapTitle,
    ModalForm,
    LoadingSpinner,
    Footer,
  },
  props: {
    data: {
      type: Array as PropType<StatusType[]>,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
      isModalOpen: false,
      isObserving: false,
      loadingObserver: null as IntersectionObserver | null,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "statusOptions",
      "feedbacks",
      "filterOptions",
      "currentPage",
    ]),
    loadingRef() {
      return this.$refs.loadingRef;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setCurrentPage",
      "addMultipleFeedbacksToStore",
      "setFeedbacks",
    ]),

    async changeSection(index: number) {
      this.active = index;
      this.setCurrentPage(2);
      const data = await fetchFeedbacks(
        this.filterOptions,
        1,
        true,
        this.active + 1
      );
      this.setFeedbacks(data as FeedbackType[]);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setupObserver() {
      this.isObserving = true;
      this.loadingObserver?.disconnect();
      this.loadingObserver = null;

      this.loadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && this.isObserving) {
              console.log("interserctin");
              const nextFeedbacksData = await fetchFeedbacks(
                this.filterOptions,
                this.currentPage,
                true,
                this.active + 1
              );
              if (nextFeedbacksData && nextFeedbacksData.length > 0) {
                this.setCurrentPage(this.currentPage + 1);
                this.addMultipleFeedbacksToStore(nextFeedbacksData);
              } else {
                console.log("uslo");
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
    // active() {
    //   this.setupObserver();
    // },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.main {
  display: none;
  @include mixins.respond(small) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column: 1 / 10;
  }

  &__bottom {
    margin-top: $big;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $medium;
  }
}
</style>
