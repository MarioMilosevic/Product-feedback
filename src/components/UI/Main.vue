<template>
  <main :class="mainClass">
    <Navigation @open-modal="openModal" :name="page" />
    <template v-if="feedbacks.length > 0">
      <Feedback
        v-if="page === 'home'"
        v-for="(feedback, index) in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        @update-like="updateLikedIds"
        :ref="index === feedbacks.length - 1 ? 'lastFeedbackRef' : undefined"
      />
      <RoadmapPageSection
        v-else-if="page === 'roadmap'"
        v-for="status in statusOptions"
        :key="status.id"
        :status="status"
        :filteredFeedbacks="filterFeedbackByStatus(status.name)"
      />
    </template>
    <Nofeedbacks v-else @open-modal="openModal" />
    <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
  </main>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import Feedback from "src/components/feedbacks/Feedback.vue";
import Navigation from "src/components/feedbacks/Navigation.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import Nofeedbacks from "src/components/feedbacks/Nofeedbacks.vue";
import { FeedbackType, StatusType } from "src/utils/types";
import RoadmapPageSection from "../roadmap/RoadmapPageSection.vue";
import { PropType } from "vue";

export default {
  name: "Main",
  components: {
    Feedback,
    Navigation,
    ModalForm,
    Nofeedbacks,
    RoadmapPageSection,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<FeedbackType[] | StatusType[]>,
      required: true,
      lastFeedbackRef: null
    },
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "sort",
      "sort",
      "feedbacks",
      "statusOptions",
      "isModalOpen",
    ]),
    mainClass() {
      return `${this.page}Main`;
    },
  },
  methods: {
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
    ...mapActions(useFeedbackStore, ["setFeedbacksLikes", "setIsModalOpen"]),
    closeModal() {
      this.setIsModalOpen(false);
    },
    openModal() {
      this.setIsModalOpen(true);
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
  },
  mounted() {
    // const targetProxy = this.$refs.lastFeedbackRef
    // console.log(targetProxy)
    // console.log(targetProxy[0].$refs.lastFeedbackRef)
    // const mario = toRaw(targetProxy[0])
    // console.log("mario", mario.$refs.lastFeedbackRef)
    
    // console.log(targetElement)
    
    // if (!targetElement) {
    //   console.log("NO element");
    //   return;
    // }
    // console.log(targetElement.value)

    // const lastElement = Array.isArray(targetElement)
    //   ? targetElement[targetElement.length - 1]
    //   : targetElement;

    // if (!lastElement) {
    //   console.log("No valid last feedback element");
    //   return;
    // }

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         console.log("Last feedback is visible");
    //         // Trigger your fetch or any other action here
    //       }
    //     });
    //   },
    //   {
    //     root: null,
    //     threshold: 0.5,
    //   }
    // );
    // // console.log(observer)

    // // observer.observe(mario);
  },
};
</script>

<style lang="scss" scoped>
.homeMain {
  display: flex;
  flex-direction: column;
  grid-column: span 7;
  gap: 1rem;
}
.roadmapMain {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5rem;
  column-gap: 2rem;
}
</style>
