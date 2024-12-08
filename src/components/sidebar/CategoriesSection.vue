<template>
  <section class="section">
    <Category
      v-for="(category, index) in allCategories"
      :key="index"
      :isSelected="index === categoryIndex"
      :hoverEnabled="index === categoryIndex ? false : true"
      :category="category.name"
      @category-event="changeCategory(category.id)"
    />
  </section>
</template>

<script lang="ts">
import Category from "src/components/UI/Category.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFilteredFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Category,
  },
  data() {
    return {
      categoryIndex: 0,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["categories", "getCategoryObjects", "sort"]),

    allCategories() {
      return [{ id: 0, name: "All" }, ...this.getCategoryObjects];
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setFilterId"]),
    async changeCategory(id: number) {
      this.categoryIndex = id;
      this.setFilterId(id);
      const data = await fetchFilteredFeedbacks(id, this.sort);
      if (data) {
        this.setFeedbacks(data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins" as mixins;

.section {
  background-color: $secondary-color;
  padding: $very-big-gap;
  display: grid;
  border-radius: $border-radius-medium;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: $medium-gap;
  
  @include mixins.respond(medium) {
    height: 100%;
  }
}
</style>
