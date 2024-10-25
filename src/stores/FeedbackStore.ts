import { defineStore } from "pinia";

export const useFeedbackStore = defineStore("feedbacksStore", {
  state: () => ({
    feedbacks: [],
  }),
});
