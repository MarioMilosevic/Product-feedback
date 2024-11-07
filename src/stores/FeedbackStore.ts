import { defineStore } from "pinia";
import { FeedbackType, CategoryType, StatusType } from "src/types/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
      categories: [] as CategoryType[],
      statusOptions: [] as StatusType[],
      // kategorije a maknucu filters
      // filters: {
      //   filter: "",
      //   sort: "",
      // },
    };
  },
  getters: {
    getFeedback: (state) => {
      return (feedbackId: number) =>
        state.feedbacks.find((feedback) => feedback.id === feedbackId);
    },
    getStatusCount: (state) => {
      return state.feedbacks.reduce((acc, feedback) => {
        if (acc[feedback.status.status]) {
          acc[feedback.status.status]++;
        } else {
          acc[feedback.status.status] = 1;
        }
        return acc;
      }, {} as Record<string, number>);
    },
    // getFilters: (state) => {
    //   return state.filters;
    // },
    getCategories: (state) => {
      return state.categories.map(category => category.category);
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
    // setFilter(filter: string) {
    //   this.filters = { ...this.filters, filter: filter };
    // },
    // setSort(sort: string) {
    //   this.filters = { ...this.filters, sort: sort };
    // },
    setCategories(categories: CategoryType[]) {
      this.categories = categories;
    },
    setStatusOptions(status: StatusType[]) {
      this.statusOptions = status;
    },
  },
});
