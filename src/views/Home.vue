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
import LoadingSpinner from "src/components/LoadingSpinner.vue";
import { mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";

export default {
  components: {
    Sidebar,
    Main,
    LoadingSpinner,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
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
    console.log(this.category)
    //
  },
};
</script>

<!-- u bazu roadmap 
 categories
 da sa paramsima sredim onaj fetch getData
 da popravim Select i input i label
 -->
