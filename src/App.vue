<script lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { fetchFeedbacks } from "./api/FeedbacksApi";
import { FeedbackType } from "./types/types";
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

  },
};
</script>

<template>
  <Sidebar />
    <div class="mario">
        Mario
    </div>
</template>

<style lang="scss" scoped>
.mario {
    background-color: red;
}</style>
