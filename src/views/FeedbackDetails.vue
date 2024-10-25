<template>
  <p>The feedback id is {{ id }}</p>
</template>
<script lang="ts">
import { useFeedbackStore } from "../stores/FeedbackStore";
export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    return { feedbackStore };
  },
  components: {},
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {
    currentFeedback() {
      const feedbackId = Number(this.id);
      return this.feedbackStore.getFeedback(feedbackId);
    },
  },
  methods: {
    //
  },
};
</script>
