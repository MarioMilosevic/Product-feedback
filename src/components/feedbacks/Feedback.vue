<template>
  <div class="feedback">
    <div class="feedback__content">
      <LikeButton
        direction="column"
        :isLiked="isLiked"
        :likes="feedback.likes"
        @click="likeHandler"
      />
      <router-link
        :to="{ name: 'FeedbackDetails', params: { id: feedback.id } }"
        class="feedback__content__link"
      >
        <h4>{{ feedback.title }}</h4>
        <p>
          {{ feedback.description }}
        </p>
        <Category :category="feedback.category.name" />
      </router-link>
    </div>
    <CommentIcon v-if="commentsCount > 0" :commentsCount="commentsCount" />
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
import { checkLikeValidation, isLikedClass } from "src/api/FeedbacksApi";
import LikeButton from "src/components/UI/LikeButton.vue";
import CommentIcon from "src/components/UI/CommentIcon.vue";
import { showToast } from "src/utils/toastify";

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
  emits: ["edit-event", "delete-event", "update-like"],
  components: {
    Category,
    Icon,
    Caret,
    Chat,
    Edit,
    Delete,
    LikeButton,
    CommentIcon,
  },
  computed: {
    ...mapState(useFeedbackStore, ["user"]),
    commentsCount() {
      return this.feedback.Comments?.[0]?.count || 0;
    },
    isLiked() {
      return isLikedClass(this.feedback);
    },
  },
  methods: {
    async likeHandler() {
      if (this.user.id) {
        const updatedFeedback = await checkLikeValidation(this.feedback);
        this.$emit("update-like", updatedFeedback);
      } else {
        showToast("You must login first", 'error')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;


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

      h4 {
        color: $heading-color;
      }

      p {
        line-height: $paragraph-lineHeight;
        color: $paragraph-color;
      }

    }
  }
}

.edit-delete {
  display: flex;
  width: 100px;
  gap: 2rem;
}
</style>
