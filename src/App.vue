<template>
  <SharedLayout />
  <RouterView />
</template>

<script lang="ts">
import { getData } from "src/api/FeedbacksApi";
import SharedLayout from "src/components/SharedLayout.vue";
export default {
  components: {
    SharedLayout,
  },
  async created() {
   const {feedbacks, categories, status} = await getData()
  },
};
</script>
