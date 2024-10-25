<template>
  <Sidebar />
  <Main :feedbacks="feedbackStore.feedbacks" />
</template>

<script lang="ts">
import Sidebar from "../components/Sidebar.vue";
import { fetchFeedbacks } from "../api/FeedbacksApi";
import { useFeedbackStore } from "../stores/FeedbackStore";
import Main from "../components/Main.vue";

export default {
  components: {
    Sidebar,
    Main,
  },
  setup() {
    const feedbackStore = useFeedbackStore();
    return { feedbackStore };
  },
  data() {
    return {};
  },
  async created() {
    const fetchResults = await fetchFeedbacks();
    this.feedbackStore.setFeedbacks(fetchResults);
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

:root {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: $primary-color;
    font-family: $main-font;
  }
  #app {
    max-width: 1280px;
    display: flex;
    margin: 5rem auto;
    gap: 2rem;
  }
}
</style>
