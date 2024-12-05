<template>
  <LoadingSpinner v-if="loading" />
  <Main v-else page="roadmap" :data="statusOptions"/>
</template>
<script lang="ts">
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Main from "src/components/UI/Main.vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchRoadmapData } from "src/api/RoadmapApi";

export default {
  components: {
    Main,
    LoadingSpinner,
  },
  async created() {
    try {
      this.setLoading(true);
      const roadmapData = await fetchRoadmapData();
      this.setStatusOptions(roadmapData?.statusData ?? []);
      this.setFeedbacks(roadmapData?.feedbacksData ?? []);
      this.setLoading(false);
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  },
  props: {},
  data() {
    return {};
  },
  computed: {
      ...mapState(useFeedbackStore, ["loading", 'feedbacks', 'statusOptions']),
    
  },
  mounted() {
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setLoading", 'setStatusOptions', 'setFeedbacks']),
    filterFeedbackByStatus(statusName: string) {
     return this.feedbacks.filter(
       (feedback) => feedback.status.name === statusName
     );
   },
  },
};
</script>

<style scoped></style>
