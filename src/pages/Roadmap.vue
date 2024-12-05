<template>
  <main>
    <Header>
      <template #title> Roadmap </template>
      <template #button>
        <ActionButton color="purple" size="big">Add Feedback</ActionButton>
      </template>
    </Header>
    <LoadingSpinner
      v-if="statusOptions.length === 0 || feedbacks.length === 0"
      :style="'grid-column: 2 / 3'"
    />
    <RoadmapPageSection
      v-else
      v-for="status in statusOptions"
      :key="status.id"
      :status="status"
      :filteredFeedbacks="filterFeedbackByStatus(status.name)"
    />
  </main>
</template>

<script lang="ts">
import Header from "src/components/roadmap/Header.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import { fetchRoadmapData } from "src/api/RoadmapApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
export default {
  components: {
    ActionButton,
    Header,
    RoadmapPageSection,
    LoadingSpinner,
  },
  async created() {
    try {
      const roadmapData = await fetchRoadmapData();
      this.setStatusOptions(roadmapData?.statusData ?? []);
      this.setFeedbacks(roadmapData?.feedbacksData ?? []);
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  },
  computed: {
    ...mapState(useFeedbackStore, ["statusOptions", "feedbacks"]),
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setStatusOptions"]),
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
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
