<template>
  <main>
    <FeedbackNav  @open-modal="openModal" />
    <Feedback
      v-for="feedback in feedbackStore.feedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
    <ModalForm
      :feedback="emptyFeedback"
      :isModalOpen="isModalOpen"
      :content="emptyFeedback"
      @close-modal="closeModal"
    />
  </main>
</template>

<script lang="ts">
import { emptyFeedback } from "src/utils/constants";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions } from "pinia";
import Feedback from "src/components/Feedback.vue";
import FeedbackNav from "src/components/FeedbackNav.vue";
import ModalForm from "src/components/ModalForm.vue";

export default {
  name: "Main",
  components: {
    Feedback,
    FeedbackNav,
    ModalForm,
  },
  props: {},
  data() {
    return {
      emptyFeedback: emptyFeedback,
      isModalOpen: false,
      feedbackStore:useFeedbackStore()
    };
  },
   async created() {
    const data = await fetchFeedbacks();
    this.setFeedbacks(data);
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks"]),
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
}
</style>
