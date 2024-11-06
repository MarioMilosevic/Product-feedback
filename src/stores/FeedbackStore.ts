import { defineStore } from "pinia";
import { FeedbackType } from "../types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
      // kategorije a maknucu filters
      filters: {
        filter: "",
        sort: "",
      },
      // isLoading: false,
    };
  },
  getters: {
    getFeedback: (state) => {
      return (feedbackId: number) =>
        state.feedbacks.find((feedback) => feedback.id === feedbackId);
    },
    getStatusCount: (state) => {
      return state.feedbacks.reduce((acc, feedback) => {
        if (acc[feedback.status]) {
          acc[feedback.status]++;
        } else {
          acc[feedback.status] = 1;
        }
        return acc;
      }, {} as Record<string, number>);
    },
    getFilters: (state) => {
      return state.filters;
    },
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
    setFilter(filter: string) {
      this.filters = { ...this.filters, filter: filter };
    },
    setSort(sort: string) {
      this.filters = { ...this.filters, sort: sort };
    },

    // setLoading(value: boolean) {
    //   this.isLoading = value;
    // },
  },
});
