<template>
  <router-link
    class="link"
    :to="{ name: 'FeedbackDetails', params: { id: feedbackId } }"
  >
    <div class="feedback">
      <div class="feedback__content">
        <div class="feedback__content__likes">
          <Icon class="feedback__content__likes-caret">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </Icon>
          <span class="feedback__content__likes-number">
            {{ feedback.likes }}
          </span>
        </div>
        <div class="feedback__content__info">
          <h4>{{ feedback.title }}</h4>
          <p class="feedback__content__info-description">
            {{ feedback.description }}
          </p>
          <Category :category="feedback.category" />
        </div>
      </div>

      <div v-if="feedback.Comments.length > 0" class="feedback__comments">
        <Icon class="size-24" fill="#f0f9ff">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </Icon>

        <span class="feedback__comments-length">{{
          feedback.Comments.length
        }}</span>
      </div>
    </div>
  </router-link>
</template>


<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "src/types/types";
import Icon from "./Icon.vue";
import Category from "./Category.vue";

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
    Icon,
  },
  computed: {
    feedbackId() {
      return this.feedback.id
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../scss/variables";

.link {
  text-decoration: none;
  color: inherit;
}

.feedback {
  width: 100%;
  background-color: $secondary-color;
  border-radius: $border-radius-big;
  padding: 2rem;
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
      gap: 0.6rem;
      background-color: $primary-color;
      border-radius: $border-radius-medium;
      padding: 10px;

      &:hover {
        background-color: $primary-color-hover;
      }

      &-caret {
        color: $terniary-color;
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
      gap: 1rem;

      /* &-description {
        font-size: 0.8rem; 
      } */

      &-category {
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        background-color: $primary-color;
        color: blue;
      }
    }
  }
  &__comments {
    display: flex;
    gap: 1rem;
    align-items: center;

    &-length {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
