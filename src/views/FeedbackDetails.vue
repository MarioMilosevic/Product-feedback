<template>
  <div class="wrapper">
    <Feedback :feedback="currentFeedback" />
  </div>
</template>
<script lang="ts">
import Feedback from "../components/Feedback.vue";
import { useFeedbackStore } from "../stores/FeedbackStore";
export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    return { feedbackStore };
  },
  components: {
    Feedback,
  },
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
    //
  },
  mounted() {
    console.log(this.currentFeedback);
  },
  methods: {
    //
  },
};
</script>

<style lang="scss">
.wrapper {
  border: 1px solid black;
  width: 100%;
}
</style>
