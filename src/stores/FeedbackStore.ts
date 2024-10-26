import { defineStore } from "pinia";
import { FeedbackType } from "../types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
    };
  },
  getters: {
    getFeedback: (state) => {
      return (feedbackId: number) =>
        state.feedbacks.find((feedback) => feedback.id === feedbackId);
    },
    getFeedbackCommentsLength: (state) => {
      return (feedbackId: number) => {
        const currentFeedback = state.feedbacks.find(
          (feedback) => feedback.id === feedbackId
        );
        if (currentFeedback) {
          return currentFeedback.Comments.length;
        }
      };
    },
  },
  actions: {
    setFeedbacks(feedbacks: FeedbackType[]) {
      this.feedbacks = feedbacks;
    },
  },
});
