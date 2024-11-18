import { defineStore } from "pinia";
import { FeedbackType, CategoryType, StatusType } from "src/types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
      categories: [] as CategoryType[],
      statusOptions: [] as StatusType[],
      filterId: 0,
      sort: "Most Likes",
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
    getCategoryObjects: (state) => {
      return state.categories.map((category) => category);
    },
    getCategoryNames: (state) => {
      return state.categories.map((category) => category.name);
    },
    getStatusObjects: (state) => {
      return state.statusOptions.map((status) => status);
    },
    getStatusNames: (state) => {
      return state.statusOptions.map((status) => status.name);
    },
    getFeedbacksLength: (state) => {
      return state.feedbacks.length;
    },
    getSort: (state) => {
      return state.sort;
    },
    getFilterId: (state) => {
      return state.filterId;
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
    editFeedbackFromStore(feedback: FeedbackType) {
      this.feedbacks = this.feedbacks.map((f) =>
        f.id === feedback.id ? { ...f, ...feedback } : f
      );
    },
    setCategories(categories: CategoryType[]) {
      this.categories = categories;
    },
    setStatusOptions(status: StatusType[]) {
      this.statusOptions = status;
    },
    setSort(value: string) {
      this.sort = value;
    },
    setFilterId(value: number) {
      this.filterId = value;
    },
  },
});
