<template>
  <LoadingSpinner v-if="isLoading" />
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
import { initialFiltersState } from "src/utils/constants";
import LoadingSpinner from "src/components/LoadingSpinner.vue";

export default {
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
  computed: {},
  async created() {
    this.isLoading = true;
    this.setFilter(initialFiltersState.filter);
    this.setSort(initialFiltersState.sort);
    const data = await fetchFeedbacks(
      initialFiltersState.filter,
      initialFiltersState.sort
    );
    // console.log(data)
    if (data) {
      this.setFeedbacks(data);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setFilter", "setSort"]),
  },
  mounted() {
    console.log(this.$router.props)
    //
  },
};
</script>

<!-- u bazu roadmap 
 categories
 da sa paramsima sredim onaj fetch getData
 da popravim Select i input i label

 
 -->