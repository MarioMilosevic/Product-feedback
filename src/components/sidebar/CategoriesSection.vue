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
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Category,
  },
  emits:['category-event'],
  data() {
    return {
      categoryIndex: 0,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["categories", "getCategoryObjects", "filterOptions", 'currentPage']),

    allCategories() {
      return [{ id: 0, name: "All" }, ...this.getCategoryObjects];
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setFilterId", "setCurrentPage"]),

    async changeCategory(id: number) {
      this.categoryIndex = id;
      this.setCurrentPage(1)
      this.setFilterId(id);
      this.$emit('category-event')
      const data = await fetchFeedbacks(this.filterOptions,this.currentPage);
      if (data) {
        this.setFeedbacks(data);
        this.setCurrentPage(this.currentPage + 1)
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
  padding: $very-big;
  display: grid;
  border-radius: $border-radius-medium;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap:$medium;

  @include mixins.respond(medium) {
    height: 100%;
  }
}
</style>
