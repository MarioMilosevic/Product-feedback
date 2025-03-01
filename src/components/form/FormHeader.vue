<template>
  <header class="header">
    <HomepageLink position="absolute" />
    <slot />
  </header>
</template>

<script lang="ts">
import HomepageLink from "src/components/layout/HomepageLink.vue";

export default {
  components: {
    HomepageLink,
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.header {
  @include mixins.respond(small) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: $small;
  }
}
</style>
