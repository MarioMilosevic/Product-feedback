<template>
  <main>
    <FeedbackNav @open-modal="openModal" />
    <Feedback
      v-for="feedback in feedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
    <ModalForm
      :isModalOpen="isModalOpen"
      @close-modal="closeModal"
    />
  </main>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapState } from "pinia";
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
  mounted() {},
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
