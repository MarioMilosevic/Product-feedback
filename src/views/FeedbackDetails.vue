<template>
  <div v-if="singleFeedback" class="wrapper">
    <div class="wrapper__header">
      <router-link to="/" class="wrapper__header-backButton">
        <Icon>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </Icon>
        <h4>Go Back</h4>
      </router-link>
      <ActionButton color="blue" @click="editFeedback">
        <h3>Edit Feedback</h3>
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
      <Textarea />
    </div>

    <Input name="title">
      Add a short descriptive headline
    </Input>
  </div>

  <Modal v-if="isModalOpen" />

  <!-- <div v-else class="error">
    <h2>Unexpected error occured</h2>
    <router-link to="/" class="wrapper__header-backButton">
      <Icon>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </Icon>
      <h4>Go Back</h4>
    </router-link>
  </div> -->
</template>

<script lang="ts">
import { SingleFeedbackType } from "src/types/types";
import Feedback from "src/components/Feedback.vue";
import Comment from "src/components/Comment.vue";
import Icon from "src/components/Icon.vue";
import Textarea from "src/components/Textarea.vue";
import { emptySingleFeedback } from "src/utils/constants";
import { fetchSingleFeedback } from "src/api/FeedbacksApi";
import ActionButton from "src/components/ActionButton.vue";
import Modal from "src/components/Modal.vue";
import Input from "src/components/Input.vue";
export default {
  components: {
    Feedback,
    Icon,
    Comment,
    Textarea,
    ActionButton,
    Modal,
    Input,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      singleFeedback: emptySingleFeedback as SingleFeedbackType,
      isModalOpen: false,
    };
  },
  computed: {
    feedbackId() {
      return Number(this.id);
    },
    commentCount() {
      return this.singleFeedback.Comments.length;
    },
  },
  async created() {
    const data = await fetchSingleFeedback(this.feedbackId);
    this.singleFeedback = {
      ...data,
      Comments: data.Comments,
    };
  },
  methods: {
    editFeedback() {
      console.log("nesto");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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
  }
}

.error {
  display: flex;
  align-items: center;
  gap: 3rem;
}
</style>
