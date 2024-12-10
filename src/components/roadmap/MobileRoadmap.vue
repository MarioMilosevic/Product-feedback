<template>
  <main class="main">
    <Navigation name="roadmap" />
    <RoadmapTitle
      v-for="(status, index) in data"
      :key="status.id"
      :title="status.name"
      :isSelected="active === index"
      @click="changeSection(index)"
    />
    <RoadmapPageSection :status="statusOptions[active]" :filteredFeedbacks="feedbacks"/>
  </main>
</template>
<script lang="ts">
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";
import RoadmapHeading from "src/components/roadmap/RoadmapHeading.vue";
import { StatusType } from "src/utils/types";
import { PropType } from "vue";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";

export default {
  components: {
    Navigation,
    RoadmapPageSection,
    RoadmapHeading,
    RoadmapTitle,
  },
  props: {
    data: {
      type: Array as PropType<StatusType[]>,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ['statusOptions', 'feedbacks'])
  },
  methods: {
    changeSection(index:number) {
      this.active = index
    }
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.main {
  display: none;

  @include mixins.respond(small) {
    grid-column: 1 / 10;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* row-gap: 4rem; */
  }
}
</style>
