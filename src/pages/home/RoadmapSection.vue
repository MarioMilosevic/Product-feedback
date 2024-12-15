<template>
  <section class="section">
    <div class="section__header">
      <h4>Roadmap</h4>
      <router-link :to="{ name: 'Roadmap' }" class="section__header-button"
        >View</router-link
      >
    </div>
    <div class="section__counts">
      <Status
        v-for="(count, status) in getStatusCount"
        :key="status"
        :status="status"
        :count="count"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Status from "src/components/layout/Status.vue";
import Category from "src/components/layout/Category.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapState } from "pinia";

export default {
  name:"RoadmapSection",
  components: { Status, Category },
  computed: {
    ...mapState(useFeedbackStore, ["getStatusCount"]),
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins" as mixins;

.section {
  background-color: $secondary-color;
  padding: $very-big;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius-medium;
  gap: $medium;
  
  @include mixins.respond(medium) {
    height: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-button {
      border: none;
      padding: 5px 10px;
      background-color: $secondary-color;
      color: $terniary-color;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &__counts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
