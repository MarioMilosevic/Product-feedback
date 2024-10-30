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
      // u svakom slucaju da sve fecujem, al da filterujem drugi stejt i taj prikazujem
      // neki stejt za filterovanje
    };
  },
  async created() {
    const data = await fetchFeedbacks();
    this.setFeedbacks(data);
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
  },
  mounted() {
    //
  },
};
</script>
