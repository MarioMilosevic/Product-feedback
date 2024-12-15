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
      <CommentIcon v-if="commentsCount > 0" :commentsCount="commentsCount" />
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
import LikeButton from "src/components/layout/LikeButton.vue";
import CommentIcon from "src/components/layout/CommentIcon.vue";
import Icon from "src/components/layout/Icon.vue";
import Category from "src/components/layout/Category.vue";
import Caret from "src/icons/Caret.vue";
import Chat from "src/icons/Chat.vue";
import Edit from "src/icons/Edit.vue";
import Delete from "src/icons/Delete.vue";
import { PropType } from "vue";
import { FeedbackType, SingleFeedbackType } from "src/utils/types";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { checkLikeValidation, isLikedClass } from "src/api/FeedbacksApi";
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
        showToast("You must login first", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.feedback {
  width: 100%;
  background-color: $secondary-color;
  border-radius: $border-radius-big;
  padding: $very-big;
  display: flex;
  gap: $medium;
  justify-content: space-between;
  align-items: center;

  @include mixins.respond(small) {
    padding: $small;
    flex-direction: column;
    position: relative;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: $very-big;
    flex-grow: 1;

    @include mixins.respond(small) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: $medium;
      gap: $medium;
    }

    &__link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      gap: $medium;
      color: inherit;
      text-decoration: none;

      @include mixins.respond(small) {
        grid-column: 1/4;
        grid-row: 1/2;
      }

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
  max-width: $edit-delete;
  gap: $very-big;

  @include mixins.respond(small) {
    position: absolute;
    bottom: 12%;
    right: 6%;
  }
}
</style>
