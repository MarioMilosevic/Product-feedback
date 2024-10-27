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
      <div v-for="comment in currentFeedback.Comments" :key="comment.id">
        <Comment :comment="comment" />
      </div>
      <!-- <div class="wrapper__comments-singleComment">
        <figure class="wrapper__comments-singleComment-figure">
          <img
            :src="currentFeedback.Comments[0].Users.image"
            :alt="currentFeedback.Comments[0].Users.image"
          />
        </figure>
        <div class="wrapper__comments-singleComment-information">
          <div class="wrapper__comments-singleComment-information-div">
            <div class="wrapper__comments-singleComment-information-div-name">
              <h4>{{ currentFeedback.Comments[0].Users.fullName }}</h4>
              <h5>{{ currentFeedback.Comments[0].Users.username }}</h5>
            </div>
            <button
              class="wrapper__comments-singleComment-information-div-button"
            >
              Reply
            </button>
          </div>
          <p>{{ currentFeedback.Comments[0].content }}</p>
        </div>
      </div> -->
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
    console.log(this.currentFeedback);
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
  gap: 1rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;

    &-editButton {
      cursor: pointer;
      padding: 10px 20px;
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

    /* &-singleComment {
      display: flex;
      align-items: center;
      gap: 1rem;

      &-figure {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          object-fit: cover;
        }
      }

      &-information {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        &-div {
          display: flex;
          justify-content: space-between;

          &-name {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }
          &-button {
            border: none;
            background-color: $secondary-color;
            cursor: pointer;
            color: $terniary-color;
            font-weight: 600;
          }
        }
      }
    } */
  }
}

.error {
  display: flex;
  align-items: center;
  gap: 3rem;
}
</style>
