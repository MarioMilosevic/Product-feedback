<template>
  <main>
    <slot name="navigation" />
    <slot name="title" />
    <slot name="list" />
    <slot name="feedback" />
    <slot name="form" />
    <slot name="empty" />
    <slot name="scroll"/>
    <!-- <div ref="loadingRef" class="loading">
      <slot name="loading" v-if="isObserving" />
      <slot name="footer" v-if="!isObserving" />
    </div> -->
  </main>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
// import { fetchFeedbacks } from "src/api/FeedbacksApi";

export default {
//   data() {
//     return {
      
//     };
//   },
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
   
  },

//   mounted() {
//     this.setupObserver();
//   },
//   beforeUnmount() {
//     this.observerUnobserve();
//   },
//   watch: {
//     currentPage(newValue) {
//       if (newValue === 2) {
//         this.setupObserver();
//       }
//     },
//   },
};
</script>

<style scoped lang="scss">
.loading {
  /* display: flex;
  justify-content: center; */
  display:grid;
  grid-column: 4/8;
}
</style>
