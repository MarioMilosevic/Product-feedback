<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Main page="roadmap" :data="statusOptions" />
    <MobileRoadmap :data="statusOptions" />
  </template>
</template>
<script lang="ts">
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Main from "src/components/UI/Main.vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { getData } from "src/api/FeedbacksApi";
import MobileRoadmap from "src/components/roadmap/MobileRoadmap.vue";

export default {
  components: {
    Main,
    LoadingSpinner,
    MobileRoadmap,
  },
  async created() {
    this.setLoading(true);
    await getData(1, false, 1)
    // if (window.innerWidth > 700) {
    //   await getData(1, true);
    // } else {
    //   await getData(1, false, 1);
    // }
    this.setLoading(false);
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "statusOptions",
      "currentPage",
      "filterOptions",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setStatusOptions",
      "setFeedbacks",
      "setLoading",
    ]),
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
  },
};
</script>
