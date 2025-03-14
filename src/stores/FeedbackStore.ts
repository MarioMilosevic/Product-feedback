import { defineStore } from "pinia";
import { notLoggedInUser } from "src/utils/constants";
import {
  FeedbackType,
  CategoryType,
  StatusType,
  UserType,
  FilterOptionsType,
} from "src/utils/types";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => {
    return {
      feedbacks: [] as FeedbackType[],
      categories: [] as CategoryType[],
      statusOptions: [] as StatusType[],
      filterOptions: {
        filterId: 0,
        sort: "Most Likes",
      } as FilterOptionsType,
      user: notLoggedInUser as UserType,
      loading: false,
      currentPage: 1,
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
  },
  actions: {
    setFeedbacks(feedbacks: FeedbackType[]) {
      this.feedbacks = feedbacks;
    },
    setFeedbacksLikes(updatedFeedback: FeedbackType) {
      this.feedbacks = this.feedbacks.map((feedback) => {
        if (feedback.id === updatedFeedback.id) {
          return {
            ...feedback,
            likes: updatedFeedback.likes,
            likedUserIds: updatedFeedback.likedUserIds,
          };
        }
        return feedback;
      });
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
      this.filterOptions.sort = value;
    },
    setFilterId(value: number) {
      this.filterOptions.filterId = value;
    },
    setUser(newUser: UserType) {
      this.user = newUser;
    },
    setLoading(value: boolean) {
      this.loading = value;
    },
    setCurrentPage(value: number) {
      this.currentPage = value;
    },
  },
});
