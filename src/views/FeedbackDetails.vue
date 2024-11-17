<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="wrapper">
    <div class="wrapper__header">
      <router-link :to="{ name: 'Home' }" class="wrapper__header-backButton">
        <Icon>
          <LeftArrow />
        </Icon>
        <h4>Go Back</h4>
      </router-link>
      <ActionButton color="blue" size="big" @click="editFeedback">
        Edit Feedback
      </ActionButton>
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
  />
</template>

<script lang="ts">
import { SingleFeedbackType } from "src/types/types";
import { fetchSingleFeedback } from "src/api/FeedbacksApi";
import Feedback from "src/components/Feedback.vue";
import Comment from "src/components/Comment.vue";
import Icon from "src/components/Icon.vue";
import Textarea from "src/components/Textarea.vue";
import ActionButton from "src/components/ActionButton.vue";
import ModalForm from "src/components/ModalForm.vue";
import LoadingSpinner from "src/components/LoadingSpinner.vue";
import LeftArrow from "src/icons/LeftArrow.vue";

export default {
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
  async created() {
    this.isLoading = true;
    const data = await fetchSingleFeedback(this.feedbackId);
    if (data) {
      this.singleFeedback = { ...data };
      this.isLoading = false;
    }
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

    &-editButton {
      cursor: pointer;
      padding: 1rem 2rem;
      border: none;
      background-color: $terniary-color;
      border-radius: $border-radius-medium;
      color: $secondary-color;
    }

    &-backButton {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 6px 12px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
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
