<template>
  <p :class="[selected, borderColor]">
    {{ status.name }}
  </p>
</template>
<script lang="ts">
import { StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  props: {
    status: {
      type: Object as PropType<StatusType>,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    borderColor() {
      return this.isSelected ? `${this.status.name}`.toLowerCase() : "";
    },
    selected() {
      return this.isSelected ? "withBorder" : "";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

p {
  text-align: center;
  padding: $medium;
  transition: all;
  transition-duration: 100ms;
  margin-bottom: $big;
  cursor: pointer;

  &:active {
    background-color: $primary-color-hover;
  }
}

.withBorder {
  border-bottom-width: 0.3rem;
  border-bottom-style: solid;
}

.planned {
  border-color: $error-color;
}
.in-progress {
  border-color: $terniary-color;
}
.live {
  border-color: $forthiary-color;
}
</style>
