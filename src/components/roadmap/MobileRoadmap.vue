<template>
  <main class="main">
    <Navigation name="roadmap" />
  </main>
</template>
<script lang="ts">
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";

export default {
  components: {
    Navigation,
    RoadmapPageSection,
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.main {
  display: none;

  @include mixins.respond(small) {
    grid-column: 1 / 10;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4rem;
  }
}
</style>
