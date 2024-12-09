<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Sidebar />
    <Main page="home" :data="feedbacks" />
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
    this.setCurrentPage(1);
    this.setFilterId(0);
    this.setSort("Most Likes");
    await getData(this.filterOptions, this.currentPage);
    this.setCurrentPage(this.currentPage + 1);
    this.setLoading(false);
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "currentPage",
      "filterOptions",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setCurrentPage",
      "setFilterId",
      "setSort",
    ]),
  },
};
</script>
