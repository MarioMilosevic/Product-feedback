<template>
  <main>
    <FeedbackNav @open-modal="openModal" />
    <Feedback
      v-if="feedbacks.length > 0"
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
    <Nofeedbacks v-else @open-modal="openModal" />
    <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
  </main>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapState } from "pinia";
import Feedback from "src/components/feedbacks/Feedback.vue";
import FeedbackNav from "src/components/feedbacks/FeedbackNav.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import Nofeedbacks from "src/components/feedbacks/Nofeedbacks.vue";

export default {
  name: "Main",
  components: {
    Feedback,
    FeedbackNav,
    ModalForm,
    LoadingSpinner,
    Nofeedbacks,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["feedbacks"]),
  },
  methods: {
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
main {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
