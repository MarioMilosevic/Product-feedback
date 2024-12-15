<template>
  <header>
    <h4>{{ title }} ({{ feedbackCount }})</h4>
    <p>{{ description }}</p>
  </header>
</template>
<script lang="ts">
export default {
  name:"RoadmapHeading",
  props: {
    title: {
      type: String,
      required: true,
    },
    feedbackCount: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

header {
  display: flex;
  flex-direction: column;
  gap: $small;

  p {
    color: $cancel-color;
  }
}
</style>
