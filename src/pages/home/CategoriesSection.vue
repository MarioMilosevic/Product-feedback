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
    <Icon class="section__icon" size="big" @click="$emit('category-event')">
      <X />
    </Icon>
  </section>
</template>

<script lang="ts">
import Category from "src/components/layout/Category.vue";
import X from "src/icons/X.vue";
import Icon from "src/components/layout/Icon.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  name:"CategoriesSection",
  components: {
    Category,
    Icon,
    X,
  },
  emits: ["category-event"],
  data() {
    return {
      categoryIndex: 0,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "categories",
      "getCategoryObjects",
      "filterOptions",
      "currentPage",
    ]),
    allCategories() {
      return [{ id: 0, name: "All" }, ...this.getCategoryObjects];
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setFeedbacks",
      "setFilterId",
      "setCurrentPage",
    ]),

    async changeCategory(id: number) {
      if (this.filterOptions.filterId === id) return;
      this.categoryIndex = id;
      this.setCurrentPage(1);
      this.setFilterId(id);
      this.$emit("category-event");
      const data = await fetchFeedbacks(this.filterOptions, this.currentPage);
      if (data) {
        this.setFeedbacks(data);
        this.setCurrentPage(this.currentPage + 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.section {
  background-color: $secondary-color;
  padding: $very-big;
  display: grid;
  border-radius: $border-radius-medium;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: $medium;
  position: relative;

  @include mixins.respond(medium) {
    height: 100%;
  }

  &__icon {
    position: absolute;
    top: 1%;
    right: 2%;
    display: none;

    @include mixins.respond(small) {
      display: block;
    }
  }
}
</style>
