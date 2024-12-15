<template>
  <main>
    <slot name="navigation" />
    <slot name="title" />
    <slot name="list" />
    <slot name="feedback" />
    <slot name="form" />
    <slot name="empty" />
    <slot name="scroll"/>
 
  </main>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";

export default {
  name:"Main",
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

};
</script>

