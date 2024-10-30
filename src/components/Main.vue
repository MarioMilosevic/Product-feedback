<template>
  <main>
    <FeedbackNav :feedbacks="feedbacks" @open-modal="openModal" />
    <Feedback
      v-for="feedback in feedbacks"
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
import { PropType } from "vue";
import { FeedbackType } from "src/types/types";
import { emptyFeedback } from "src/utils/constants";
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
  props: {
    feedbacks: {
      type: Array as PropType<FeedbackType[]>,
      required: true,
    },
  },
  data() {
    return {
      emptyFeedback: emptyFeedback,
      isModalOpen: false,
    };
  },
  methods: {
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
