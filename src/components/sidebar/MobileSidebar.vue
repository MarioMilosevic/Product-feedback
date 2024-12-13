<template>
  <section class="mobile">
    <ImageSection class="mobile__imageSection" />
    <Icon
      class="mobile__icon"
      size="big"
      @click="openSidebar"
      v-if="!isSidebarOpen"
    >
      <Hamburger />
    </Icon>
    <aside class="mobile__sidebar"
    :style="{transform: isSidebarOpen ? 'translateX(0%)' : 'translateX(100%)'}"
    >
      <CategoriesSection @category-event="closeSidebar"/>
      <RoadmapSection />
    </aside>
    <div
      class="mobile__overlay"
      :style="{ visibility: isSidebarOpen ? 'visible' : 'hidden' }"
      @click="closeSidebar"
    ></div>
  </section>
</template>

<script lang="ts">
import Close from "src/icons/Close.vue";
import Icon from "src/components/UI/Icon.vue";
import ImageSection from "src/components/sidebar/ImageSection.vue";
import Hamburger from "src/icons/Hamburger.vue";
import CategoriesSection from "src/components/sidebar/CategoriesSection.vue";
import RoadmapSection from "src/components/sidebar/RoadmapSection.vue";

export default {
  components: {
    Icon,
    Close,
    ImageSection,
    Hamburger,
    CategoriesSection,
    RoadmapSection,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    openSidebar() {
      this.isSidebarOpen = true;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
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
  overflow: hidden;

  @include mixins.respond(small) {
    display: flex;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    z-index: 2;
    color: $secondary-color;
  }

  &__sidebar {
    z-index: 2;
    position: fixed;
    top: 15%;
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
    visibility: hidden;
  }
}
</style>
