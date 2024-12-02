<template>
  <div class="feedback">
    <div class="feedback__content">
      <button class="feedback__content__likes" :style="{backgroundColor: isLiked}" @click="likeHandler">
        <Icon class="feedback__content__likes-caret" size="small">
          <Caret />
        </Icon>
        <span class="feedback__content__likes-number">
          {{ feedback.likes }}
        </span>
      </button>

      <router-link
        :to="{ name: 'FeedbackDetails', params: { id: feedbackId } }"
        class="feedback__content__link"
      >
        <h4>{{ feedback.title }}</h4>
        <p class="feedback__content__link-paragraph">
          {{ feedback.description }}
        </p>
        <Category :category="feedback.category.name" />
      </router-link>
    </div>
    <div v-if="commentsCount > 0" class="feedback__comments">
      <Icon class="size-24" fill="#f0f9ff" size="medium">
        <Chat />
      </Icon>
      <span class="feedback__comments-length">{{ commentsCount }}</span>
    </div>
    <div v-if="isEditing" class="edit-delete">
      <Icon
        size="big"
        @click="$emit('edit-event')"
        :style="{ cursor: 'pointer' }"
      >
        <Edit />
      </Icon>
      <Icon
        size="big"
        @click="$emit('delete-event')"
        :style="{ cursor: 'pointer' }"
      >
        <Delete />
      </Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { FeedbackType, SingleFeedbackType } from "src/utils/types";
import Icon from "src/components/UI/Icon.vue";
import Category from "src/components/UI/Category.vue";
import Caret from "src/icons/Caret.vue";
import Chat from "src/icons/Chat.vue";
import Edit from "src/icons/Edit.vue";
import Delete from "src/icons/Delete.vue";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { toggleLike } from "src/api/FeedbacksApi";

export default {
  name: "Feedback",
  props: {
    feedback: {
      type: Object as PropType<FeedbackType | SingleFeedbackType>,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["edit-event", "delete-event"],
  components: {
    Category,
    Icon,
    Caret,
    Chat,
    Edit,
    Delete,
  },
  computed: {
    ...mapState(useFeedbackStore, ["user"]),
    feedbackId() {
      return this.feedback.id;
    },
    commentsCount() {
      return this.feedback.Comments?.[0]?.count || 0;
    },
    isLiked() {
      return this.user.id && this.feedback.likedUserIds.includes(this.user.id)
      ? "#cce7ff"
      : "#f0f9ff";
    },
  },
  methods: {
    async likeHandler() {
      console.log("radi");
      console.log(this.isLiked);
      if (this.feedback.id && this.user.id) {
        await toggleLike(this.feedback.id, this.user.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.feedback {
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

    &__link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: 1rem;
      color: inherit;
      text-decoration: none;

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

      &:active {
        transform: scale(1.1);
        transition-duration: 100ms;
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

.edit-delete {
  display: flex;
  width: 100px;
  gap: 2rem;
}
</style>
