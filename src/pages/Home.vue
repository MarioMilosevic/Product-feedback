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
//  async fetchData() {
//   await getData()
//   },
  components: {
    Sidebar,
    Main,
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
};
</script>
