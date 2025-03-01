<template>
  <div class="title">
    <h3>{{ selectedStatus.name }} ({{ count }})</h3>
    <p>{{ selectedStatus.description }}</p>
  </div>
</template>
<script lang="ts">
import { StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  name:"RoadmapSectionTitle",
  props: {
    selectedStatus: {
      type: Object as PropType<StatusType>,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.title {
  padding: 0 $medium;
  display: flex;
  flex-direction: column;
  gap: $small;
  margin-bottom: $very-big;
  grid-column: 1/4;

  @include mixins.respond(small) {
    font-size: $small-font;
  }
}
</style>
