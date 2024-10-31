<script>
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
};
</script>

<template>
  <button
    :class="[
      'category',
      { hoverEnabled: hoverEnabled },
      { isSelected: isSelected },
    ]"
  >
    {{ category }}
  </button>
</template>

<style lang="scss" scoped>
@import "src/scss/variables";

.category {
  padding: 10px 15px;
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
