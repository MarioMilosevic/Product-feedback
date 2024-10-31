<script lang="ts">
import ImageSection from "src/components/ImageSection.vue";
import CategoriesSection from "src/components/CategoriesSection.vue";

export default {
  name: "Sidebar",
  components: {
    ImageSection,
    CategoriesSection
  },

  computed: {
  //
  },
  mounted() {
    //
  },
};
</script>

<template>
  <aside class="sidebar">
    <ImageSection />
    <CategoriesSection />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
