<template>
  <div class="feedback">
    <div class="feedback__content">
      <button class="feedback__content__likes">
        <!-- <button class="feedback__content__likes" @click="toggleLike"> -->
        <Icon class="feedback__content__likes-caret" size="small">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </Icon>
        <span class="feedback__content__likes-number">
          {{ feedback.likes }}
        </span>
      </button>
      <router-link
        class="feedback__content__link"
        :to="{ name: 'FeedbackDetails', params: { id: feedbackId } }"
      >
        <h4>{{ feedback.title }}</h4>
        <p>{{ feedback.description }}</p>
        <Category :category="feedback.category.category" />
      </router-link>
    </div>

    <div v-if="commentsCount > 0" class="feedback__comments">
      <!-- <div v-if="feedback.Comments.length > 0" class="feedback__comments"> -->
      <Icon class="size-24" fill="#f0f9ff" size="medium">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </Icon>

      <span class="feedback__comments-length">{{
        commentsCount
}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "src/types/types";
// import { toggleLike } from "src/api/FeedbacksApi";
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
  data() {
    return {
      // isLiked:this.feedback.
    };
  },
  computed: {
    feedbackId() {
      return this.feedback.id;
    },
    commentsCount() {
      return this.feedback.Comments?.[0]?.count || 0;
    },
  },
  methods: {
    // async toggleLike() {
    //   try {
    //     await toggleLike(this.feedback.id)
    //     this.feedback.likes += 1
    //   } catch (error) {
    //     console.log('Error toggling like:', error)
    //   }
    // }
  },
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.feedback {
  /* min-width: 740px; */
  width: 100%;
  background-color: $secondary-color;
  border-radius: $border-radius-big;
  padding: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  &__content {
    display: flex;
    align-items: center;
    gap: 2rem;

    &__link {
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    &__likes {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background-color: $primary-color;
      border-radius: $border-radius-medium;
      border: none;
      padding: 10px;
      cursor: pointer;

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
