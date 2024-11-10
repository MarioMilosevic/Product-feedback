<template>
  <LoadingSpinner v-if="isLoading" />
  <template v-else>
    <SharedLayout />
    <RouterView />
  </template>
</template>

<script lang="ts">
import { getData } from "src/api/FeedbacksApi";
import SharedLayout from "src/components/SharedLayout.vue";
import LoadingSpinner from "src/components/LoadingSpinner.vue";

export default {
  components: {
    SharedLayout,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    await getData();
    this.isLoading = false;
  },
  methods: {},
};
</script>
