<template>
  <section class="sidebar">
    <ImageSection />
    <CategoriesSection />
    <RoadmapSection />
  </section>
</template>

<script lang="ts">
import ImageSection from "src/pages/home/ImageSection.vue";
import CategoriesSection from "src/pages/home/CategoriesSection.vue";
import RoadmapSection from "src/pages/home/RoadmapSection.vue";

export default {
  name: "Sidebar",
  components: {
    ImageSection,
    CategoriesSection,
    RoadmapSection,
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_mixins.scss" as mixins;
@use "src/scss/_variables.scss" as *;

.sidebar {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: $medium;

  @include mixins.respond(medium) {
    grid-row: 2/3;
    grid-column: 1/10;
    flex-direction: row;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include mixins.respond(small) {
    display: none;
  }
}
</style>
