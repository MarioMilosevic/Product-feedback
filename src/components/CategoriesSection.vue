<template>
  <section class="section">
    <Category
      v-for="(category, index) in allCategories"
      :key="index"
      :isSelected="index === categoryIndex"
      :hoverEnabled="index === categoryIndex ? false : true"
      :category="category.category"
      @category-event="changeCategory(category.category, category.id)"
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
  // emits:['filter-categories'],
  data() {
    return {
      // allOptions: ["All", ],
      categoryIndex: 0,
    };
  },
  computed: {
    //
    ...mapState(useFeedbackStore, ["categories"]),

    allCategories() {
      const feedbackstore = useFeedbackStore();
      const categories = feedbackstore.getCategories;
      return [{ id: 0, category: "All" }, ...categories];
    },
    // categories
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
    async changeCategory(name: string, id: number) {
      this.$router.replace(name);
      this.categoryIndex = id;
      const data = await fetchFeedbacks(id);
      if (data) {
        this.setFeedbacks(data);
      }
    },

    // async changeCategory(name: string, categoryIndex: number) {
    //   console.log(category)
    //   this.$router.replace(category)
    //   // this.setLoading(true)
    //   // this.$emit('filter-categories')
    //   this.categoryIndex = categoryIndex;
    //   this.setFilter(category);
    //   const data = await fetchFeedbacks(category, this.filters.sort);
    //   if (data) {
    //     this.setFeedbacks(data);
    //     // this.setLoading(false)
    //   }
    // },
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
