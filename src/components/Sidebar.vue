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
  border: 1px solid black;
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
