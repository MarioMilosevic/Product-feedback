<script>
import ImageSection from "./ImageSection.vue";
export default {
  name:"Sidebar",
  components: {
    ImageSection,
  },
};
</script>

<template>
  <aside class="sidebar">
    <!-- <ImageSection /> -->
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  border: 1px solid black;
  height: 50px;
  width: 25%;
}
</style>


