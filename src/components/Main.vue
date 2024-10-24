<script lang="ts">
import {  PropType } from "vue";
import { FeedbackType } from "../types/types";
import Feedback from "./Feedback.vue";

export default {
  name: "Main",
  components: {
    Feedback,
  },
  props: {
    feedbacks: {
      type: Array as PropType<FeedbackType[]>,
      required: true,
    },
  },
};
</script>

<template>
  <main>
    <Feedback v-for="feedback in feedbacks" :key="feedback.id" :feedback="feedback" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}
</style>
