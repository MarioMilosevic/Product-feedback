<template>
  <main>
    <Header>
      <template #title> Roadmap </template>
      <template #button>
        <ActionButton color="purple" size="big">Add Feedback</ActionButton>
      </template>
    </Header>
    <LoadingSpinner
      v-if="statusOptions.length === 0 || allFeedbacks.length === 0"
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
import { fetchRoadmapData } from "src/api/RoadmapApi";
import { FeedbackType, StatusType } from "src/utils/types";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
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
      this.statusOptions = roadmapData?.statusData || [];
      this.allFeedbacks = roadmapData?.feedbacksData || [];
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  },
  props: {},
  data() {
    return {
      statusOptions: [] as StatusType[],
      allFeedbacks: [] as FeedbackType[],
    };
  },
  computed: {
    //
  },
  methods: {
    filterFeedbackByStatus(statusName: string) {
      return this.allFeedbacks.filter(
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
