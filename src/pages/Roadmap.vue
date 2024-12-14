<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <MainMario class="roadmap">
      <template #navigation>
        <Navigation
          @open-modal="openModal"
          name="roadmap"
          :activeCategory="activeIndex"
        />
      </template>
      <template #title>
        <RoadmapTitle
          v-for="(status, index) in statusOptions"
          :key="status.id"
          :status="status"
          :isSelected="activeIndex === index"
          @click="changeSection(index)"
        />
      </template>
      <template #list>
        <RoadmapSectionTitle
          :selectedStatus="statusOptions[activeIndex]"
          :count="filterFeedbackByStatus(statusOptions[activeIndex].name)"
        />
      </template>
      <template #feedback>
        <RoadmapFeedback
          v-for="feedback in feedbacks"
          :feedback="feedback"
          :key="feedback.id"
          @update-like="updateLikedIds"
        />
      </template>
      <template #form>
        <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
      </template>
    </MainMario>
  </template>
</template>
<script lang="ts">
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Main from "src/components/UI/Main.vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { getData } from "src/api/FeedbacksApi";
import MainMario from "src/components/UI/MainMario.vue";
import Navigation from "src/components/feedbacks/Navigation.vue";
import RoadmapTitle from "src/components/roadmap/RoadmapTitle.vue";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { FeedbackType } from "src/utils/types";
import RoadmapSectionTitle from "src/components/roadmap/RoadmapSectionTitle.vue";
import RoadmapFeedback from "src/components/roadmap/RoadmapFeedback.vue";
import ModalForm from "src/components/UI/ModalForm.vue";

export default {
  components: {
    Main,
    LoadingSpinner,
    MainMario,
    Navigation,
    RoadmapTitle,
    RoadmapSectionTitle,
    RoadmapFeedback,
    ModalForm,
  },
  async created() {
    this.setLoading(true);
    await getData(1, 1);
    this.setLoading(false);
  },
  data() {
    return {
      activeIndex: 0,
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "statusOptions",
      "currentPage",
      "filterOptions",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setStatusOptions",
      "setFeedbacks",
      "setLoading",
      "setFeedbacksLikes",
      "setCurrentPage",
      'setSearchValue'
    ]),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    filterFeedbackByStatus(statusName: string) {
      const filteredFeedbacks = this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
      return filteredFeedbacks.length;
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
    async changeSection(index: number) {
      console.log('radi')
      this.activeIndex = index;
      this.setCurrentPage(2);
      const data = await fetchFeedbacks(
        this.filterOptions,
        1,
        this.activeIndex + 1
      );
      this.setFeedbacks(data as FeedbackType[]);
      this.setSearchValue("");
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.roadmap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / 10;

  @include mixins.respond(medium) {
    column-gap: $big;
  }

  &__list {
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    padding: 0 $medium;
    gap: $big;

    @include mixins.respond(small) {
      column-gap: $medium;
    }
  }
}
</style>
