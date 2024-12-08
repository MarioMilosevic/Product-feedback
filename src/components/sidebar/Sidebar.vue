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
  <aside class="sidebar">
    <ImageSection />
    <CategoriesSection />
    <RoadmapSection />
  </aside>
</template>

<style lang="scss" scoped>
@use "src/scss/_mixins.scss" as mixins;
@use "src/scss/_variables.scss" as *;

.sidebar {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: $medium-gap;

  @include mixins.respond(medium) {
    border:1px solid black;
    grid-row:1/2;
    grid-column:1/9;
    flex-direction:row;
    align-items:center;
  }

  @include mixins.respond(small){
    display: none;
  }
}
</style>
