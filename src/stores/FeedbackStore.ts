import { defineStore } from "pinia";
import { FeedbackType } from "../types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
    };
  },
  getters: {
    getFeedback: (state) => (id: number) => {
      return state.feedbacks.find((feedback) => feedback.id === id);
    },
  },
  actions: {
    setFeedbacks(feedbacks: FeedbackType[]) {
      this.feedbacks = feedbacks;
    },
  },
});
