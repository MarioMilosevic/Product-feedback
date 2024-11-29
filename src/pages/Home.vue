<template>
  <LoadingSpinner v-if="isLoading" />
  <template v-else>
    <Sidebar />
    <Main />
  </template>
</template>

<script lang="ts">
import Sidebar from "src/components/sidebar/Sidebar.vue";
import Main from "src/components/UI/Main.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import { getData } from "src/api/FeedbacksApi";

export default {
  components: {
    Sidebar,
    Main,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async created() {
    await getData();
    this.isLoading = false;
  },
};
</script>
