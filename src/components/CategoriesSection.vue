<template>
  <section class="section">
    <Category
      v-for="(category, index) in allCategories"
      :key="index"
      :isSelected="index === categoryIndex"
      :hoverEnabled="index === categoryIndex ? false : true"
      :category="category.name"
      @category-event="changeCategory(category.name, category.id)"
    />
  </section>
</template>

<script lang="ts">
import Category from "src/components/Category.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Category,
  },
  props: {},
  data() {
    return {
      categoryIndex: 0,
    };
  },
  computed: {
    //
    ...mapState(useFeedbackStore, ["categories"]),

    allCategories() {
      const feedbackstore = useFeedbackStore();
      const categories = feedbackstore.getCategories;
      return [{ id: 0, name: "All" }, ...categories];
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
    async changeCategory(name: string, id: number) {
      this.categoryIndex = id;
      const data = await fetchFeedbacks(id);
      if (data) {
        this.setFeedbacks(data);
      }
    },
  },
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
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
