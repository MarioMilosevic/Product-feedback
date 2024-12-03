<template>
  <main>
    <Header>
      <template #title> Roadmap </template>
      <template #button>
        <ActionButton color="purple" size="big">Add Feedback</ActionButton>
      </template>
    </Header>
    <RoadmapPageSection/>
    <RoadmapPageSection/>
    <RoadmapPageSection/>
  </main>
</template>

<script lang="ts">
import Header from "src/components/roadmap/Header.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
export default {
  components: {
    ActionButton,
    Header,
    RoadmapPageSection
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

main {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5rem;
  column-gap: 2rem;
}
</style>
