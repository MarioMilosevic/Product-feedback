<script lang="ts">
import ImageSection from "src/components/sidebar/ImageSection.vue";
import CategoriesSection from "src/components/sidebar/CategoriesSection.vue";
import RoadmapSection from "src/components/sidebar/RoadmapSection.vue";

export default {
  name: "Sidebar",
  components: {
    ImageSection,
    CategoriesSection,
    RoadmapSection,
  },
};
</script>

<template>
  <section class="sidebar">
    <ImageSection />
    <CategoriesSection />
    <RoadmapSection />
  </section>
</template>

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
  }

  @include mixins.respond(small) {
    display:none;
  }
}
</style>
