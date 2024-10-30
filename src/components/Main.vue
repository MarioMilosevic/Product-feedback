<template>
  <main>
    <FeedbackNav :feedbacks="feedbacks" />
    <Feedback
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
  </main>
</template>
<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "src/types/types";
import Feedback from "src/components/Feedback.vue";
import FeedbackNav from "src/components/FeedbackNav.vue";

export default {
  name: "Main",
  components: {
    Feedback,
    FeedbackNav,
  },
  props: {
    feedbacks: {
      type: Array as PropType<FeedbackType[]>,
      required: true,
    },
  },
  mounted() {},
};
</script>


<style lang="scss" scoped>
main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}
</style>
