<template>
  <main>
    <Navigation @open-modal="openModal" name="home"/>
    <Feedback
      v-if="feedbacks.length > 0"
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :feedback="feedback"
      @update-like="updateLikedIds"
    />
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
import { FeedbackType } from "src/utils/types";

export default {
  name: "Main",
  components: {
    Feedback,
    Navigation,
    ModalForm,
    Nofeedbacks,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["feedbacks", "sort", "sort"]),
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacksLikes"]),
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  grid-column: span 7;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
