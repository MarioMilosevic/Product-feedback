<template>
  <section class="section">
    <div class="section__titleContainer">
      <h4>{{ title }} ({{ feedebackCount }})</h4>
      <p>{{ descripton }}</p>
    </div>

    <ul class="section__list">
      <RoadmapFeedback v-for="feedback in filteredFeedbacks" :feedback="feedback" :key="feedback.id"/>
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
      return this.status.name
    },
    descripton() {
      return this.status.description
    },
    feedebackCount() {
      return this.filteredFeedbacks.length
    }
    //
  },
  mounted() {
    console.log(this.filteredFeedbacks);
    console.log(this.status)
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
