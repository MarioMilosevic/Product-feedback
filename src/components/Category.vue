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
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: $primary-color;
  color: #303233;
  /* color: $primary-color-hover; */
}
</style>
