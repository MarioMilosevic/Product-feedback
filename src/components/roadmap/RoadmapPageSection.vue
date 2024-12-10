<template>
  <section class="section">
    <RoadmapHeading
      :title="title"
      :feedbackCount="feedbackCount"
      :description="description"
    />
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
import RoadmapFeedback from "src/components/roadmap/RoadmapFeedback.vue";
import RoadmapHeading from "src/components/roadmap/RoadmapHeading.vue";
import { mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType, StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  components: {
    RoadmapFeedback,
    RoadmapHeading,
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
    description() {
      return this.status.description;
    },
    feedbackCount() {
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
  gap: $very-big;

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $very-big;
  }
}
</style>
