<template>
  <svg
    :xmlns="xmlns"
    :fill="fill"
    :viewBox="viewBox"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    :class="class"
    :width="width"
    :height="height"
    @click="$emit('click')"
  >
    <slot></slot>
  </svg>
</template>

<script>
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
    class: {
      type: String,
      default: "size-6",
    },
    width: {
      type: [String, Number],
      default: 20,
    },
    height: {
      type: [String, Number],
      default: 20,
    },
  },
  emits: ["click"],
};
</script>
