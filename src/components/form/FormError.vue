<template>
  <p>
    <slot />
  </p>
</template>
<script lang="ts">
export default {};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

p {
  color: $error-color;
  font-size: 0.8rem;
}
</style>
