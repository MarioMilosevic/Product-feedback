<script lang="ts">
export default {
  name:"Category",
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
@use "src/scss/abstracts/_variables" as *;


.category {
  transition: all 300ms;
  padding: $small $medium;
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
