<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Main page="roadmap" />
  </template>
</template>
<script lang="ts">
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Main from "src/components/UI/Main.vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { getData } from "src/api/FeedbacksApi";

export default {
  components: {
    Main,
    LoadingSpinner,
  },
  async created() {
    this.setLoading(true);
    await getData(1, 1);
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
