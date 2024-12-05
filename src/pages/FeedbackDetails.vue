<template>
  <LoadingSpinner v-if="loading" style="grid-area: 2 / 4 / 3 / 5" />
  <div v-else class="wrapper">
    <Feedback
      :isEditing="singleFeedback.userId === user.auth_id"
      :feedback="singleFeedback"
      @edit-event="editFeedback"
      @delete-event="deleteHandler(singleFeedback.id)"
      @update-like="updateSingleFeedback"
    />
    <div class="wrapper__comments">
      <h3>{{ commentCount }} <span>Comments</span></h3>
      <Comment
        v-for="comment in singleFeedback.Comments"
        :key="comment.id"
        :comment="comment"
        @reply-event="replyHandler"
      />
    </div>

    <div class="wrapper__addComment">
      <h4>Add comment</h4>
      <Textarea
        ref="textareaRef"
        :maxCharacters="maxCharacters"
        :content="textAreaContent"
        @update-textarea="handleUpdateTextarea"
      />
      <div class="wrapper__addComment-div">
        <p>{{ remainingCharacters }} characters left</p>
        <ActionButton color="purple" size="big" @click="postComment">
          Post Comment
        </ActionButton>
      </div>
    </div>
  </div>

  <ModalForm
    v-if="singleFeedback.id"
    :feedback="singleFeedback"
    :isModalOpen="isModalOpen"
    @close-modal="closeModal"
    @update-feedback="updateFeedback"
  />
</template>

<script lang="ts">
import { CommentType, SingleFeedbackType } from "src/utils/types";
import { fetchSingleFeedback, deleteFeedback } from "src/api/FeedbacksApi";
import Feedback from "src/components/feedbacks/Feedback.vue";
import Comment from "src/components/UI/Comment.vue";
import Icon from "src/components/UI/Icon.vue";
import Textarea from "src/components/form/Textarea.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import LeftArrow from "src/icons/LeftArrow.vue";
import { showToast } from "src/utils/toastify";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { addComment } from "src/api/CommentsApi";

export default {
  async created() {
    this.setLoading(true);
    const data = await fetchSingleFeedback(this.feedbackId);
    if (data) {
      this.singleFeedback = { ...data };
      this.setLoading(false);
    }
  },
  components: {
    Feedback,
    Icon,
    Comment,
    Textarea,
    ActionButton,
    ModalForm,
    LoadingSpinner,
    LeftArrow,
  },
  data() {
    return {
      singleFeedback: {} as SingleFeedbackType,
      textAreaContent: "",
      maxCharacters: 225,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ["user", "getFeedback", "loading", "isModalOpen"]),
    feedbackId() {
      return Number(this.$route.params.id);
    },
    commentCount() {
      return this.singleFeedback.Comments.length;
    },
    remainingCharacters() {
      return this.maxCharacters - this.textAreaContent.length;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setLoading", 'setIsModalOpen']),
    editFeedback() {
      this.setIsModalOpen(true)
    },
    closeModal() {
      this.setIsModalOpen(false);
    },
    handleUpdateTextarea(newContent: string) {
      this.textAreaContent = newContent;
    },
    updateFeedback(newFeedback: SingleFeedbackType) {
      this.singleFeedback = newFeedback;
    },

    async deleteHandler(id: number) {
      const data = await deleteFeedback(id);
      if (data.id) {
        this.$emit("close-modal");
        this.$router.push("/home");
        this.$nextTick(() => {
          showToast("Deleted feedback successfully");
        });
      } else {
        showToast("Something went wrong, please try again", "error");
      }
    },

    async postComment() {
      if (this.textAreaContent.length === 0) {
        showToast("Comment can't be empty", "error");
        return;
      }

      if (!this.user.is_anonymous) {
        const newComment = {
          content: this.textAreaContent,
          feedbackId: this.singleFeedback.id,
          auth_id: this.singleFeedback.userId,
          userId: this.user.id,
        };
        const data = await addComment(newComment as CommentType);
        data.Users = {
          auth_id: this.user.auth_id,
          fullName: this.user.fullName,
          id: this.user.id,
          image: this.user.image,
          username: this.user.username,
        };
        this.singleFeedback.Comments.push(data);
        this.textAreaContent = "";
      } else {
        showToast("You must create an account first", "error");
      }
    },

    replyHandler(username: string) {
      if (!this.user.is_anonymous) {
        (this.textAreaContent = `${username} `),
          (this.$refs.textareaRef as typeof Textarea).focusTextarea();
      } else {
        showToast("You must create an account first", "error");
      }
    },
    updateSingleFeedback(newFeedback: SingleFeedbackType) {
      this.singleFeedback = {
        ...this.singleFeedback,
        likes: newFeedback.likes,
        likedUserIds: newFeedback.likedUserIds,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.wrapper {
  width: 100%;
  margin: 0 auto;
  grid-column: span 8;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__comments {
    background-color: $secondary-color;
    border-radius: $border-radius-big;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__addComment {
    background-color: $secondary-color;
    border-radius: $border-radius-big;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &-div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.error {
  display: flex;
  align-items: center;
  gap: 3rem;
}
</style>
