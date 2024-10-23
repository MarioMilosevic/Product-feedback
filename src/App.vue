<script lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { fetchFeedbacks } from "./api/FeedbacksApi";
import { FeedbackType } from "./types/types";
import Main from "./components/Main.vue";
export default {
  name: "App",
  data() {
    return {
      feedbacks: [] as FeedbackType[],
    };
  },
  async created() {
    this.feedbacks = await fetchFeedbacks();
  },
  components: {
    Sidebar,
    Main
  },
};
</script>

<template>
  <Sidebar />
  <Main :feedbacks="feedbacks"/>
</template>

<style lang="scss">
:root {
  $primary-color: #f0f9ff;
  $main-font: "Courier New", Courier, monospace;

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
