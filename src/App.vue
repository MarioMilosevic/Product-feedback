<template>
  <SharedLayout />
  <RouterView />
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { getData } from "src/api/FeedbacksApi";
import SharedLayout from "src/components/SharedLayout.vue";
import { useFeedbackStore } from "./stores/FeedbackStore";
export default {
  components: {
    SharedLayout,
  },
  async created() {
    const data = await getData();
    if (data) {
      this.setCategories(data.categories);
      this.setFeedbacks(data.feedbacks);
      this.setStatusOptions(data.statusOptions);
    }
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setCategories",
      "setStatusOptions",
      "setFeedbacks",
    ]),
  },
};
</script>
