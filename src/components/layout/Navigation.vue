<template>
  <nav>
    <div class="title">
      <slot name="icon"/>
      <slot name="title" />
      <slot name="form-element" />
    </div>
    <slot name="button" />
  </nav>
</template>
<script lang="ts">
export default {
  name:"Navigation",
  props: {
    activeCategory: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.title {
  display: flex;
  gap: $medium;
  align-items: center;
}
</style>
