<template>
  <section class="section">
    <h3>Feedback Board</h3>
    <Icon size="big" class="hamburgerColor" @click="openSidebar">
      <Hamburger />
    </Icon>
    <aside :class="['section__aside', isVisible]">Mario</aside>
  </section>
</template>

<script @lang="ts">
import Icon from "src/components/UI/Icon.vue";
import Hamburger from "src/icons/Hamburger.vue";
import RoadmapSection from "src/components/sidebar/RoadmapSection.vue";
import CategoriesSection from "src/components/sidebar/RoadmapSection.vue";
export default {
  components: {
    Icon,
    Hamburger,
    RoadmapSection,
    CategoriesSection,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  computed: {
    isVisible() {
      return this.isSidebarOpen ? "visible" : "hidden";
    },
  },
  methods: {
    openSidebar() {
      this.isSidebarOpen = true;
    },
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
  /*  */
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
  }

  h3 {
    color: $primary-color;
  }

  &__aside {
    border: 1px solid black;
    position: absolute;
    top: 0%;
    right: 0%;
    transition: all 300ms;
  }
}

.visible {
  transform: translateX(0%);
  visibility: visible;
}

.hidden {
  transform: translateX(100%);
  visibility: hidden;
}

.hamburgerColor {
  color: $secondary-color;
}
</style>
