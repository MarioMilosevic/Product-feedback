<script>
import ImageSection from "./ImageSection.vue";
export default {
  components: {
    ImageSection,
  },
};
</script>

<template>
  <aside class="sidebar">
    <ImageSection />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  border: 1px solid black;
  /* width: 100px; */
  height: 50px;
  grid-column: 10%;
}
</style>


