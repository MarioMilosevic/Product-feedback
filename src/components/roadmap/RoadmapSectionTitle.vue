<template>
  <div>
    <h3>{{ selectedStatus.name }} ({{ count }})</h3>
    <p>{{ selectedStatus.description }}</p>
  </div>
</template>
<script lang="ts">
import { StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
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
@use "src/scss/_variables.scss" as *;

div {
  display: flex;
  flex-direction: column;
  gap: $small;
  margin-bottom: $medium;
}
</style>
