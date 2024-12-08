<template>
  <section class="section">
    <div class="section__header">
      <h4>Roadmap</h4>
      <router-link :to="{name:'Roadmap'}" class="section__header-button">View</router-link>
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
import { useFeedbackStore } from "src/stores/FeedbackStore";
import Status from "src/components/UI/Status.vue";
import Category from "src/components/UI/Category.vue";
import { mapState } from "pinia";

export default {
  components: { Status, Category },
  computed: {
    ...mapState(useFeedbackStore, ["getStatusCount"]),
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;


.section {
  background-color: $secondary-color;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: $border-radius-medium;
  gap: 1rem;

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
