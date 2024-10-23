<script>
import Feedback from "./Feedback.vue";

export default {
  name: "Main",
  props: ["feedbacks"],
  components: {
    Feedback,
  },
};
</script>
<template>
  <main>
    <Feedback v-for="feedback in feedbacks" :key="feedback" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid black;
}
</style>
