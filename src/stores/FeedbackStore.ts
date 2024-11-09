import { defineStore } from "pinia";
import { FeedbackType, CategoryType, StatusType } from "src/types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
      categories: [] as CategoryType[],
      statusOptions: [] as StatusType[],
    };
  },
  getters: {
    getFeedback: (state) => {
      return (feedbackId: number) =>
        state.feedbacks.find((feedback) => feedback.id === feedbackId);
    },
    getStatusCount: (state) => {
      return state.feedbacks.reduce((acc, feedback) => {
        if (acc[feedback.status.name]) {
          acc[feedback.status.name]++;
        } else {
          acc[feedback.status.name] = 1;
        }
        return acc;
      }, {} as Record<string, number>);
    },
    getCategories: (state) => {
      return state.categories.map((category) => category)
    },
    getStatusOptions: (state) => {
      return state.statusOptions.map((status) => status.status)
    },
    getFeedbacksLength: (state) => {
      return state.feedbacks.length
    }
  },
  actions: {
    setFeedbacks(feedbacks: FeedbackType[]) {
      this.feedbacks = feedbacks;
    },
    addFeedbackToStore(feedback: FeedbackType) {
      this.feedbacks.push(feedback);
    },
    deleteFeedbackFromStore(id: number) {
      this.feedbacks = this.feedbacks.filter((feedback) => feedback.id !== id);
    },
    setCategories(categories: CategoryType[]) {
      this.categories = categories;
    },
    setStatusOptions(status: StatusType[]) {
      this.statusOptions = status;
    },
  },
});
