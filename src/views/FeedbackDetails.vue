<template>
  <div v-if="currentFeedback" class="wrapper">
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
      <button class="wrapper__header-editButton">
        <h3>Edit Feedback</h3>
      </button>
    </div>
    <Feedback :feedback="currentFeedback" />

    <div class="wrapper__comments">
      <h3>{{ commentsLength }} <span>Comments</span></h3>
      <Comment
        v-for="comment in currentFeedback.Comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <div class="wrapper__addComment">
      <h4>Add comment</h4>
      <textarea name="comment" id="comment"></textarea>
    </div>
  </div>
  <!--  -->
  <div v-else class="error">
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
  </div>
</template>

<script lang="ts">
import Feedback from "../components/Feedback.vue";
import Icon from "../components/Icon.vue";
import Comment from "../components/Comment.vue";
import { useFeedbackStore } from "../stores/FeedbackStore";
export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    return { feedbackStore };
  },
  components: {
    Feedback,
    Icon,
    Comment,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {
    feedbackId() {
      return Number(this.id);
    },
    currentFeedback() {
      return this.feedbackStore.getFeedback(this.feedbackId);
    },
    commentsLength() {
      return this.feedbackStore.getFeedbackCommentsLength(this.feedbackId);
    },
  },
  mounted() {
    //
  },
};
</script>

<style lang="scss">
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
    border: 1px solid black;
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
