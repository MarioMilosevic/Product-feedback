<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;

button {
  padding: $medium;
  border-radius: $border-radius-medium;
  background-color: $primary-color;
  border: none;
  text-align: left;
  cursor: pointer;
  color: $image-button-color;
  font-weight: 400;
}
</style>
