<template>
  <main :class="mainClass" ref="mainRef">
    <Navigation @open-modal="openModal" :name="page" />
    <template v-if="feedbacks.length > 0">
      <Feedback
        v-if="page === 'home'"
        v-for="(feedback, index) in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        @update-like="updateLikedIds"
        :ref="index === feedbacks.length - 1 ? 'lastFeedbackRef' : undefined"
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
    <Footer
      @intersecting-event="intersect"
      :position="footerPosition"
      :isObserving="isObserving"
    />
    <!-- <Footer ref="footerRef" :position="footerPosition"/> -->
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
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { PropType } from "vue";
import { FeedbackType, StatusType } from "src/utils/types";
import { fetchAllFeedbacks } from "src/api/FeedbacksApi";
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
  },
  props: {
    page: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<FeedbackType[] | StatusType[]>,
      required: true,
      lastFeedbackRef: null,
    },
  },
  data() {
    return {
      isObserving: true,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "sort",
      "sort",
      "feedbacks",
      "statusOptions",
      "isModalOpen",
      "currentPage",
      "limit",
    ]),
    mainClass() {
      return `${this.page}Main`;
    },
    footerPosition() {
      return `${this.page}Footer`;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setFeedbacksLikes",
      "setIsModalOpen",
      "setCurrentPage",
      "addMultipleFeedbacksToStore",
      "setLoading",
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
    async intersect() {
      if (this.isObserving) {
        const nextFeedbacksData = await fetchAllFeedbacks(
          this.currentPage,
          this.limit
        );
        if (nextFeedbacksData && nextFeedbacksData.length > 0) {
          this.setCurrentPage(this.currentPage + 1);
          this.addMultipleFeedbacksToStore(nextFeedbacksData);
        } else {
          this.isObserving = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.homeMain {
  display: flex;
  flex-direction: column;
  grid-column: span 7;
  gap: 1rem;
}
.roadmapMain {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5rem;
  column-gap: 2rem;
}
</style>
