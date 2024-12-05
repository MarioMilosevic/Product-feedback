<template>
  <main>
    <Navigation name="roadmap"/>
    <LoadingSpinner
      v-if="loading"
      :style="'grid-column: 2 / 3'"
    />
    <RoadmapPageSection
      v-else
      v-for="status in statusOptions"
      :key="status.id"
      :status="status"
      :filteredFeedbacks="filterFeedbackByStatus(status.name)"
    />
    <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal"/>
  </main>
</template>

<script lang="ts">
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import { fetchRoadmapData } from "src/api/RoadmapApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import Navigation from "src/components/feedbacks/Navigation.vue";
export default {
  components: {
    ActionButton,
    RoadmapPageSection,
    LoadingSpinner,
    ModalForm,
    Navigation
  },
  data() {
    return {
      isModalOpen:false
    }
  },
  async created() {
    try {
      this.setLoading(true)
      const roadmapData = await fetchRoadmapData();
      this.setStatusOptions(roadmapData?.statusData ?? []);
      this.setFeedbacks(roadmapData?.feedbacksData ?? []);
      this.setLoading(false)
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  },
  computed: {
    ...mapState(useFeedbackStore, ["statusOptions", "feedbacks", 'loading']),
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setStatusOptions", 'setLoading']),
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
    closeModal() {
      this.isModalOpen = false
    },
    openModal() {
      this.isModalOpen = true
    }
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

main {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5rem;
  column-gap: 2rem;
}
</style>
