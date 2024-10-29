<template>
  <Sidebar />
  <Main :feedbacks="feedbackStore.feedbacks" />
</template>

<script lang="ts">
import Sidebar from "src/components/Sidebar.vue";
import Main from "src/components/Main.vue";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions } from "pinia";

export default {
  components: {
    Sidebar,
    Main,
  },
  data() {
    return {
      feedbackStore: useFeedbackStore(),
    };
  },
  async created() {
    const data = await fetchFeedbacks();
    this.setFeedbacks(data);
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
  },
};
</script>
