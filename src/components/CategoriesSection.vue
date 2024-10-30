<template>
  <section class="section">
    <Category
      v-for="(category, index) in allOptions"
      :key="index"
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
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
