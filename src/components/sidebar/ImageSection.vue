<template>
  <section class="section">
    <h3>Feedback Board</h3>
  </section>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins" as mixins;

.section {
  width: 100%;
  height: 10rem;
  border-radius: 15px;
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;

  @include mixins.respond(medium) {
    height: 100%;
  }

  h3 {
    color: $primary-color;
  }
}
</style>
