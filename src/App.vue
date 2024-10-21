<script lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { fetchFeedbacks } from "./api/FeedbacksApi";
export default {
  name: "App",
  data() {
    return {
      feedbacks: [],
    };
  },
  async created() {
    this.feedbacks = await fetchFeedbacks();
  },
  components: {
    Sidebar,
  },
};
</script>

<template>
  <Sidebar />
</template>

<style lang="scss" scoped></style>
