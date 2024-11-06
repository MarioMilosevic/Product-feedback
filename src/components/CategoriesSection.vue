<template>
  <section class="section">
    <Category
      v-for="(category, index) in allOptions"
      :key="index"
      :isSelected="index === categoryIndex"
      :hoverEnabled="index === categoryIndex ? false : true"
      :category="category"
      @category-event="changeCategory(category, index)"
    />
  </section>
</template>

<script lang="ts">
import { categoryOptions } from "src/utils/constants";
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
      allOptions: ["All", ...categoryOptions],
      categoryIndex: 0,
    };
  },
  computed: {
    //
    ...mapState(useFeedbackStore, ["filters"]),
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setFilter"]),

    async changeCategory(category: string, categoryIndex: number) {
      console.log(category)
      this.$router.replace(category)
      // this.setLoading(true)
      // this.$emit('filter-categories')
      this.categoryIndex = categoryIndex;
      this.setFilter(category);
      const data = await fetchFeedbacks(category, this.filters.sort);
      if (data) {
        this.setFeedbacks(data);
        // this.setLoading(false)
      }
    },
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
