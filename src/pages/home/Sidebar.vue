<template>
  <section class="sidebar">
    <ImageSection @sidebar-event="openSidebar" />
    <div :class="['sidebar__categories', { isOpen: isSidebarOpen }]">
      <CategoriesSection @category-event="closeSidebar" />
      <RoadmapSection />
    </div>
    <div
      class="sidebar__overlay"
      :style="{ visibility: isSidebarOpen ? 'visible' : 'hidden' }"
      @click="closeSidebar"
    ></div>
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
    grid-template-columns: repeat(3, 1fr);
  }

  @include mixins.respond(small) {
    grid-column: 1/10;
    overflow: hidden;
  }

  &__categories {
    display: flex;
    flex-direction: column;
    gap: $medium;

    @include mixins.respond(medium) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column: 2/4;
    }
    @include mixins.respond(small) {
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
      transform: translateX(100%);

      &.isOpen {
        transform: translateX(0%);
      }
    }
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
    display: none;

    @include mixins.respond(small) {
      display: block;
    }
  }
}
</style>
