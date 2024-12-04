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
    <FeedbackCommentIcon v-if="commentsCount > 0" :commentsCount="commentsCount"/>
    <!-- <div v-if="commentsCount > 0" class="feedback__comments">
      <Icon class="size-24" fill="#f0f9ff" size="medium">
        <Chat />
      </Icon>
      <span class="feedback__comments-length">{{ commentsCount }}</span>
    </div> -->
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
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { toggleLike } from "src/api/FeedbacksApi";
import { showToast } from "src/utils/toastify";
import LikeButton from "../UI/LikeButton.vue";
import FeedbackCommentIcon from "./FeedbackCommentIcon.vue";

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
    FeedbackCommentIcon
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
      if (this.user.id) {
        return !!(
          this.user.id && this.feedback.likedUserIds.includes(this.user.id)
        );
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacksLikes"]),
    async likeHandler() {
      if (this.user.is_anonymous) {
        showToast("You must create an account first", "error");
        return;
      }
      if (!this.feedback.id || !this.user.id) {
        return;
      }
      const updatedFeedback = await toggleLike(this.feedback.id, this.user.id);
      this.$emit("update-like", updatedFeedback);
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
  }
}

.edit-delete {
  display: flex;
  width: 100px;
  gap: 2rem;
}
</style>
