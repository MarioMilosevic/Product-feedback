<template>
  <LoadingSpinner v-if="isLoading"/>
  <template v-else>
    <Sidebar />
    <Main />
  </template>
</template>

<script lang="ts">
import Sidebar from "src/components/Sidebar.vue";
import Main from "src/components/Main.vue";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import LoadingSpinner from "src/components/LoadingSpinner.vue";

export default {
  components: {
    Sidebar,
    Main,
    LoadingSpinner
  },
  data() {
    return {
      isLoading: false,
      // u svakom slucaju da sve fecujem, al da filterujem drugi stejt i taj prikazujem
      // neki stejt za filterovanje
    };
  },
  async created() {
    this.isLoading = true;
    const data = await fetchFeedbacks();
    if (data) {
      this.setFeedbacks(data);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
  },
  mounted() {
    //
  },
};
</script>
