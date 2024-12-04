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

  data() {
    return {};
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
    //
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacksLikes"]),
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
  },
  mounted() {
    console.log(this.filteredFeedbacks);
    console.log(this.status);
    //
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.section {
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__titleContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      color: $cancel-color;
    }
  }

  &__list {
    /* border: 1px solid black; */
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
