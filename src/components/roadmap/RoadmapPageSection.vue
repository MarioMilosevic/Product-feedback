<template>
  <section class="section">
    <div class="section__titleContainer">
      <h4>Planned (2)</h4>
      <p>Ideas prioritized for research</p>
    </div>

    <ul class="section__list">
      <RoadmapFeedback />
      <RoadmapFeedback />
      <RoadmapFeedback />
    </ul>
  </section>
</template>
<script lang="ts">
import RoadmapFeedback from "src/components/roadmap/RoadmapFeedback.vue";
import { FeedbackType, StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  components: {
    RoadmapFeedback,
  },
  props: {
    filteredFeedbacks: {
      type: Array<PropType<FeedbackType>>,
      required: true,
    },
    status: {
      type: Array<PropType<StatusType>>,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {
    //
  },
  mounted() {
    console.log(this.filteredFeedbacks);
    //
  },
  methods: {
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
