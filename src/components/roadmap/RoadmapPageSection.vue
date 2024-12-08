<template>
  <section class="section">
    <div class="section__titleContainer">
      <h4>{{ title }} ({{ feedebackCount }})</h4>
      <p>{{ descripton }}</p>
    </div>

    <ul class="section__list">
      <RoadmapFeedback
        v-for="feedback in filteredFeedbacks"
        :feedback="feedback"
        :key="feedback.id"
        @update-like="updateLikedIds"
      />
    </ul>
  </section>
</template>
<script lang="ts">
import { mapActions } from "pinia";
import RoadmapFeedback from "src/components/roadmap/RoadmapFeedback.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType, StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  components: {
    RoadmapFeedback,
  },
  props: {
    filteredFeedbacks: {
      type: Array as PropType<FeedbackType[]>,
      required: true,
    },
    status: {
      type: Object as PropType<StatusType>,
      required: true,
    },
  },
  computed: {
    title() {
      return this.status.name;
    },
    descripton() {
      return this.status.description;
    },
    feedebackCount() {
      return this.filteredFeedbacks.length;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacksLikes"]),
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

.section {
  display: flex;
  flex-direction: column;
  gap: $very-big-gap;

  &__titleContainer {
    display: flex;
    flex-direction: column;
    gap:$small-gap;

    p {
      color: $cancel-color;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $very-big-gap;
  }
}
</style>
