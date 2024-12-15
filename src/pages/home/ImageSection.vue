<template>
  <section class="section">
    <h3>Feedback Board</h3>
  </section>
</template>

<script @lang="ts">
import Icon from "src/components/layout/Icon.vue";
import Hamburger from "src/icons/Hamburger.vue";
import CategoriesSection from "src/pages/home/CategoriesSection.vue";
import RoadmapSection from "src/pages/home/RoadmapSection.vue";
export default {
  components: {
    Icon,
    Hamburger,
    RoadmapSection,
    CategoriesSection,
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins" as mixins;

.section {
  width: 100%;
  height: $feedbackHeight;
  border-radius: $border-radius-big;
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @include mixins.respond(small) {
    height: 5rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 $medium;
  }
  @include mixins.respond(medium) {
    height: 100%;
    /* width: 33%; */
  }

  h3 {
    color: $primary-color;
  }
}
</style>
