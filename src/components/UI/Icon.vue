<template>
  <svg
    :xmlns="xmlns"
    :fill="fill"
    :viewBox="viewBox"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    :class="[iconSize]"
    :size="size"
    @click="$emit('click')"
  >
    <slot></slot>
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    xmlns: {
      type: String,
      default: "http://www.w3.org/2000/svg",
    },
    fill: {
      type: String,
      default: "none",
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    },
    strokeWidth: {
      type: String,
      default: "1.5",
    },
    stroke: {
      type: String,
      default: "currentColor",
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  emits: ["click"],
  computed: {
    iconSize() {
      return this.size;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.small {
  width: $small-gap;
  height: $small-gap;
}
.medium {
  width: $medium-gap;
  height: $medium-gap;
}
.big {
  width: 2rem;
  height: 2rem;
}
</style>
