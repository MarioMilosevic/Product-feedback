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
import { getData } from "src/api/FeedbacksApi";
import LoadingSpinner from "src/components/LoadingSpinner.vue";

export default {
  components: {
    Sidebar,
    Main,
    LoadingSpinner
  },
  props: {
  },
  data() {
    return {
      isLoading:false
    };
  },
  async created() {
    this.isLoading = true;
    await getData();
    this.isLoading = false;
  },
  computed: {},
  methods: {},
  mounted() {
  },
};
</script>