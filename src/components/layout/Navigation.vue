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
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.title {
  display: flex;
  gap: $medium;
  align-items: center;
}
</style>
