<template>
  <section class="section">
    <Category
      v-for="(category, index) in allOptions"
      :key="index"
      :isSelected="index === categoryIndex"
      :hoverEnabled="index === categoryIndex ? false : true"
      :category="category"
    />
  </section>
</template>

<script lang="ts">
import { categoryOptions } from "src/utils/constants";
import Category from "src/components/Category.vue";

export default {
  components: {
    Category,
  },
  props: {},
  data() {
    return {
      allOptions: ["All", ...categoryOptions],
      categoryIndex:0
    };
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.section {
  background-color: $secondary-color;
  padding: 2rem;
  display: grid;
  border-radius: $border-radius-medium;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
