<template>
  <section class="section">
    <h3>Feedback Board</h3>
    <Icon size="big" class="hamburger" @click="openSidebar">
      <Hamburger />
    </Icon>
    <!-- <aside :class="['section__aside', isVisible]"> -->
    <MobileSidebar :isSidebarOpen="isSidebarOpen">
      <template #categories>
        <CategoriesSection />
      </template>
      <!-- <template #roadmap>
        <RoadmapSection />
      </template> -->
    </MobileSidebar>
    <!-- </aside> -->
  </section>
</template>

<script @lang="ts">
import Icon from "src/components/UI/Icon.vue";
import Hamburger from "src/icons/Hamburger.vue";
import RoadmapSection from "src/components/sidebar/RoadmapSection.vue";
import CategoriesSection from "src/components/sidebar/CategoriesSection.vue";
import MobileSidebar from "src/components/sidebar/MobileSidebar.vue";
export default {
  components: {
    Icon,
    Hamburger,
    RoadmapSection,
    CategoriesSection,
    MobileSidebar,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
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
}

.hamburger {
  color: $secondary-color;
  display: none;
    @include mixins.respond(small) {
      display: flex;
    }
}
</style>
