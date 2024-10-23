<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "../types/types";
import { IoChatbubbleOutline } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import Category from "./Category.vue";
addIcons(IoChatbubbleOutline)

export default {
  name: "Feedback",
  props: {
    feedback: {
      type: Object as PropType<FeedbackType>,
      required: true,
    },
  },
  components: {
    Category,
    "v-icon": OhVueIcon,
  },
};
</script>

<template>
  <div class="feedback">
    <div class="feedback__content">
      <div class="feedback__content__likes">
        <span class="feedback__content__likes-caret">^</span>
        <span class="feedback__content__likes-number">
          {{ feedback.likes }}
        </span>
      </div>
      <div class="feedback__content__info">
        <h3>{{ feedback.title }}</h3>
        <p class="feedback__content__info-description">
          {{ feedback.description }}
        </p>
        <Category :category="feedback.category" />
      </div>
    </div>

    <div class="feedback__comments">
      <v-icon name="io-chatbubble-outline" class="icon"/>
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
  cursor: pointer;
  align-items: center;

  &__content {
    display: flex;
    align-items: center;
    gap: 2rem;

    &__likes {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $primary-color;
      border-radius: $border-radius-medium;
      padding: 5px 10px;

      &:hover {
        background-color: $primary-color-hover;
      }

      &-caret {
        color: blue;
      }

      &-number {
        font-weight: 600;
        font-size: 0.9rem;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.7rem;

      &-description {
        font-size: 0.8rem;
      }

      &-category {
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        background-color: $primary-color;
        color: blue;
      }
    }
  }

  /* &__likes {

  &__content {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    &-description {
      font-size: 0.8rem;
    }
  } */
}
</style>
