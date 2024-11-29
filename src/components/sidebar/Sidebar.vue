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
.sidebar {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
