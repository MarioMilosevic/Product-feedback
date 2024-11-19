<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="wrapper">
    <div class="wrapper__header">
      <ActionButton color="grey" size="medium" @click="goBack">
        <Icon>
          <LeftArrow />
        </Icon>
        <span>Go Back</span>
      </ActionButton>
      <div class="wrapper__header-div">
          <ActionButton
            color="red"
            size="medium"
            @click="deleteHandler(singleFeedback.id)"
          >
            Delete
          </ActionButton>
        <ActionButton color="blue" size="big" @click="editFeedback">
          Edit Feedback
        </ActionButton>
      </div>
    </div>
    <Feedback :feedback="singleFeedback" />
    <div class="wrapper__comments">
      <h3>{{ commentCount }} <span>Comments</span></h3>
      <Comment
        v-for="comment in singleFeedback.Comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <div class="wrapper__addComment">
      <h4>Add comment</h4>
      <Textarea
        :maxCharacters="maxCharacters"
        :content="textAreaContent"
        @update-textarea="handleUpdateTextarea"
      />
      <div class="wrapper__addComment-div">
        <p>{{ remainingCharacters }} characters left</p>
        <ActionButton color="purple" size="big"> Post Comment </ActionButton>
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
import { SingleFeedbackType } from "src/types/types";
import { fetchSingleFeedback, deleteFeedback } from "src/api/FeedbacksApi";
import Feedback from "src/components/feedbacks/Feedback.vue";
import Comment from "src/components/UI/Comment.vue";
import Icon from "src/components/UI/Icon.vue";
import Textarea from "src/components/UI/Textarea.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import LeftArrow from "src/icons/LeftArrow.vue";
import { showToast } from "src/utils/toastify";

export default {
  async created() {
    this.isLoading = true;
    const data = await fetchSingleFeedback(this.feedbackId);
    if (data) {
      this.singleFeedback = { ...data };
      this.isLoading = false;
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
      isModalOpen: false,
      textAreaContent: "",
      maxCharacters: 225,
      isLoading: false,
    };
  },
  computed: {
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
    editFeedback() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleUpdateTextarea(newContent: string) {
      this.textAreaContent = newContent;
    },
    updateFeedback(newFeedback: SingleFeedbackType) {
      this.singleFeedback = newFeedback;
    },
    goBack() {
          this.$router.push("/");
    },
    async deleteHandler(id: number) {
      const data = await deleteFeedback(id);
      if (data.id) {
        this.$emit("close-modal");
        this.goBack();
        showToast("Deleted feedback successfully");
      } else {
        showToast("Something went wrong, please try again", "error");
      }
    },
  },
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.wrapper {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;

    &-div {
      display: flex;
      gap: 1rem;
    }

    &-editButton {
      cursor: pointer;
      padding: 1rem 2rem;
      border: none;
      background-color: $terniary-color;
      border-radius: $border-radius-medium;
      color: $secondary-color;
    }
  }

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
