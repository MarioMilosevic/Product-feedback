<template>
  <router-link
    :to="{ name: 'FeedbackDetails', params: { id: feedbackId } }"
    class="feedback"
  >
    <div class="feedback__content">
      <button class="feedback__content__likes">
        <Icon class="feedback__content__likes-caret" size="small">
          <Caret />
        </Icon>
        <span class="feedback__content__likes-number">
          {{ feedback.likes }}
        </span>
      </button>
      <div class="feedback__content__div">
        <h4>{{ feedback.title }}</h4>
        <p class="feedback__content__div-paragraph">
          {{ feedback.description }}
        </p>
        <Category :category="feedback.category.name" />
      </div>
    </div>
    <div v-if="commentsCount > 0" class="feedback__comments">
      <Icon class="size-24" fill="#f0f9ff" size="medium">
        <Chat />
      </Icon>
      <span class="feedback__comments-length">{{ commentsCount }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { PropType } from "vue";
import { FeedbackType } from "src/types/types";
import Icon from "src/components/UI/Icon.vue";
import Category from "src/components/UI/Category.vue";
import Caret from "src/icons/Caret.vue";
import Chat from "src/icons/Chat.vue";

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
    Caret,
    Chat,
  },
  data() {
    return {};
  },
  computed: {
    feedbackId() {
      return this.feedback.id;
    },
    commentsCount() {
      return this.feedback.Comments?.[0]?.count || 0;
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.feedback {
  text-decoration: none;
  color: inherit;
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
    flex-grow: 1;

    &__div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 1rem;

      &-paragraph {
        line-height: 1.5rem;
      }
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
