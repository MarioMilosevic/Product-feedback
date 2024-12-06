<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Sidebar />
    <Main page="home" :data="feedbacks"/>
  </template>
</template>

<script lang="ts">
import Sidebar from "src/components/sidebar/Sidebar.vue";
import Main from "src/components/UI/Main.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import { getData } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";

export default {
  components: {
    Sidebar,
    Main,
    LoadingSpinner,
  },
  async created() {
    this.setLoading(true);
    await getData(this.page, this.limit);
    this.setLoading(false);
  },
  data() {
    return {
      page: 1,
      limit:3
    }
  },
  computed: {
    ...mapState(useFeedbackStore, ["loading", 'feedbacks']),
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setLoading"]),
  },
};
</script>
