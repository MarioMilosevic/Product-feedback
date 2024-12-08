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


.section {
  width: 100%;
  height: 150px;
  border-radius: 15px;
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    color: $primary-color;
  }
}
</style>
