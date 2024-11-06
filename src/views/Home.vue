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
import { mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
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
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
  },
  mounted() {
    //
  },
};
</script>

<!-- u bazu roadmap 
 categories
 da sa paramsima sredim onaj fetch getData
 da popravim Select i input i label
 -->