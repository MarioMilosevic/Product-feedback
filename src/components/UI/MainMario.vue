<template>
  <main>
    <slot name="navigation" />
    <slot name="title" />
    <slot name="sectionTitle" />
    <slot name="feedback" />
    <slot name="form" />
    <slot name="empty" />
    <div ref="loadingRef">
      <slot name="loading" v-if="isObserving"/>
      <slot name="footer"  v-if="!isObserving"/>
    </div>
  </main>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { fetchFeedbacks } from "src/api/FeedbacksApi";

export default {
  data() {
    return {
      isObserving: true,
      loadingObserver: null as IntersectionObserver | null,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "filterOptions",
      "currentPage",
    ]),
    loadingRef() {
      return this.$refs.loadingRef;
    },
  },

  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setCurrentPage"]),
    setupObserver() {
      if (!this.loadingRef) return;
      console.log(this.$refs.loadingRef);
      this.isObserving = true;
      this.loadingObserver?.disconnect();
      this.loadingObserver = null;

      this.loadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && this.isObserving) {
              let feedbacksData;
              feedbacksData = await fetchFeedbacks(
                this.filterOptions,
                this.currentPage
              );
              if (
                feedbacksData &&
                feedbacksData.length > 0 &&
                feedbacksData.length !== this.feedbacks.length
              ) {
                this.setCurrentPage(this.currentPage + 1);
                this.setFeedbacks(feedbacksData);
                this.setFeedbacks(feedbacksData);
              } else {
                this.observerUnobserve();
              }
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        }
      );
      this.observerObserve();
    },
    observerObserve() {
      if (this.loadingObserver) {
        this.loadingObserver.observe(this.loadingRef as HTMLElement);
      }
    },
    observerUnobserve() {
      if (this.loadingObserver) {
        this.loadingObserver.unobserve(this.loadingRef as HTMLElement);
        this.loadingObserver = null;
      }
      this.isObserving = false;
    },
  },

  mounted() {
      console.log(this.$refs.loadingRef);
    this.setupObserver()
    },
   beforeUnmount() {
    this.observerUnobserve();
  },
};
</script>

<style></style>
