<template>
  <main class="main">
    <Navigation name="roadmap" @open-modal="openModal" />
    <RoadmapTitle
      v-for="(status, index) in data"
      :key="status.id"
      :title="status.name"
      :isSelected="active === index"
      @click="changeSection(index)"
    />
    <RoadmapPageSection
      :status="statusOptions[active]"
      :filteredFeedbacks="feedbacks"
    />
    <div class="main__bottom">
      <LoadingSpinner :style="{ margin: '0 auto' }" />
      <Footer />
    </div>
    <ModalForm :is-modal-open="isModalOpen" @close-modal="closeModal" />
  </main>
</template>
<script lang="ts">
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapPageSection from "src/components/roadmap/RoadmapPageSection.vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";
import RoadmapHeading from "src/components/roadmap/RoadmapHeading.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Footer from "src/components/UI/Footer.vue";
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
    ModalForm,
    LoadingSpinner,
    Footer,
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
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["statusOptions", "feedbacks"]),
  },
  methods: {
    changeSection(index: number) {
      this.active = index;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.main {
  display: none;
  @include mixins.respond(small) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column: 1 / 10;
  }

  &__bottom {
    margin-top: $big;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $medium;
  }
}
</style>
