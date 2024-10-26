<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <button class="category">{{ category }}</button>
</template>

<style lang="scss" scoped>
@import "../scss/variables";

.category {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  background-color: $primary-color;
  color: $terniary-color;
  border-radius: $border-radius-medium;
}
</style>
