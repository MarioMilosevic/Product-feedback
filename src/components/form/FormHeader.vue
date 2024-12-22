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
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

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
