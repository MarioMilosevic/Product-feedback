<script lang="ts">
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
    },
    hoverEnabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["category-event"],
  mounted() {},
};
</script>

<template>
  <button
    :class="[
      'category',
      { hoverEnabled: hoverEnabled },
      { isSelected: isSelected },
    ]"
    @click="$emit('category-event')"
  >
    {{ category }}
  </button>
</template>

<style lang="scss" scoped>
@import "src/scss/variables";

.category {
  transition: all 300ms;
  padding: $small-gap $medium-gap;
  border: none;

  cursor: pointer;
  background-color: $primary-color;
  color: $terniary-color;
  border-radius: $border-radius-medium;
}

.hoverEnabled {
  &:hover {
    background-color: $primary-color-hover;
  }
}
.isSelected {
  background-color: $terniary-color;
  color: $secondary-color;
}
</style>
