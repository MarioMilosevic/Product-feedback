<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "../types/types";


export default {
  name: "Feedback",
  props: {
    feedback: {
      type: Object as PropType<FeedbackType>,
      required: true,
    },
  },
  mounted() {
    console.log(this.feedback);
  },
};
</script>

<template>
  <div class="feedback">
    <div class="feedback__likes">
      <span class="feedback__likes-caret">^</span>
      <span class="feedback__likes-number">
        {{ feedback.likes }}
      </span>
    </div>
    <div class="feedback__content">
      <h3>{{ feedback.title }}</h3>
      <p class="feedback__content-description">{{ feedback.description }}</p>
      <button class="feedback__content-category">
        {{ feedback.category }}
      </button>
    </div>
    <div class="feedback__comments">
      <span>{{ feedback.Comments.length }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/variables";

.feedback {
  width: 100%;
  background-color: $secondary-color;
  border-radius: $border-radius-big;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: $primary-color-hover;
  }

  &__likes {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $primary-color;
    padding: 5px 10px;
    border-radius: $border-radius-medium;

    &-caret {
      color: blue;
      font-size: 1rem;
    }

    &-number {
        font-weight: 600;
        font-size: 0.9rem;
    }
  }
}
</style>
