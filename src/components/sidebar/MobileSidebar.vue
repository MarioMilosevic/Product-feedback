<template>
  <section class="mobile">
    <ImageSection class="mobile__imageSection" />
    <Icon class="mobile__icon" size="big" @click="toggleSidebar">
      <Hamburger class="mobile__icon-button" v-if="!isSidebarOpen" />
      <X class="mobile__icon-button" v-else />
    </Icon>
    <aside :class="['mobile__sidebar', isVisible]">
      <CategoriesSection />
      <RoadmapSection />
    </aside>
    <div class="mobile__overlay" v-if="isSidebarOpen"></div>
  </section>
</template>

<script lang="ts">
import Close from "src/icons/Close.vue";
import Icon from "src/components/UI/Icon.vue";
import ImageSection from "src/components/sidebar/ImageSection.vue";
import Hamburger from "src/icons/Hamburger.vue";
import CategoriesSection from "src/components/sidebar/CategoriesSection.vue";
import RoadmapSection from "src/components/sidebar/RoadmapSection.vue";
import X from "src/icons/X.vue";

export default {
  components: {
    Icon,
    Close,
    ImageSection,
    Hamburger,
    CategoriesSection,
    RoadmapSection,
    X,
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
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.mobile {
  grid-column: 1/10;
  transition: all 300ms;
  flex-direction: column;
  display: none;
  position: relative;

  @include mixins.respond(small) {
    display: flex;
  }

  &__imageSection {
    z-index: 2;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    z-index: 2;

    &-button {
      color: $secondary-color;
    }
  }

  &__sidebar {
    z-index: 2;
    position: absolute;
    top: 100%;
    right: 0%;
    transition: all;
    transition-duration: 300ms;
    display: flex;
    flex-direction: column;
    gap: $medium;
    background-color: $primary-color;
    border-radius: $border-radius-big;
  }

  &__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0%;
    right: 0%;
    z-index: 1;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.6);
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
</style>
