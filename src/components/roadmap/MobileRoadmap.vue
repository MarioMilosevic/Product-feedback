<template>
  <main class="main">
    <Navigation name="roadmap" />
    <RoadmapTitle
      v-for="(status, index) in data"
      :key="status.id"
      :title="status.name"
      :isSelected="active === index"
    />

    <!-- <RoadmapHeading v-for="statusOption in data" :key="statusOption.id" 
    :title="statusOption.name"
    :description="statusOption.description"

    /> -->
    <!-- nek prikazuje naslov svih a ispod nek prikazuje samo trenutno selektovani roadmappage, i na promjenu
 da feca od onog koji je selektovan i da proslijedi kroz prop podatke
 i to je to -->
  </main>
</template>
<script lang="ts">
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import RoadmapHeading from "src/components/roadmap/RoadmapHeading.vue";
import { StatusType } from "src/utils/types";
import { PropType } from "vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";

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
  mounted() {
    console.log(this.data);
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
