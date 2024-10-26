<template>
  <div v-if="currentFeedback" class="wrapper">
    <div class="wrapper__header">
      <router-link to="/" class="wrapper__header-backButton">
        <Icon>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </Icon>
        <h4>Go Back</h4>
      </router-link>
      <button class="wrapper__header-editButton">
        <h3>Edit Feedback</h3>
      </button>
    </div>
    <Feedback :feedback="currentFeedback" />
  </div>
  <h1 v-else>Unexpected error occured</h1>
</template>
<script lang="ts">
import Feedback from "../components/Feedback.vue";
import Icon from "../components/Icon.vue";
import { useFeedbackStore } from "../stores/FeedbackStore";
export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    return { feedbackStore };
  },
  components: {
    Feedback,
    Icon,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {
    currentFeedback() {
      const feedbackId = Number(this.id);
      return this.feedbackStore.getFeedback(feedbackId);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;

    &-editButton {
      cursor: pointer;
      padding: 10px 20px;
      border: none;
      background-color: $terniary-color;
      border-radius: $border-radius-medium;
      color: $secondary-color;
    }

    &-backButton {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 6px 12px;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>
