<template>
  <LoadingSpinner v-if="isLoading" />
  <template v-else>
    <SharedLayout />
    <RouterView />
  </template>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { getData } from "src/api/FeedbacksApi";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import SharedLayout from "src/components/SharedLayout.vue";
import LoadingSpinner from "src/components/LoadingSpinner.vue";
export default {
  components: {
    SharedLayout,
    LoadingSpinner
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    const data = await getData();
    if (data) {
      this.$router.push("All");
      this.setCategories(data.categories);
      this.setFeedbacks(data.feedbacks);
      this.setStatusOptions(data.statusOptions);
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setCategories",
      "setStatusOptions",
      "setFeedbacks",
    ]),
  },
};
</script>

<!-- na mount aplikacije fecam iz 3 tabele da bih imao 3 stejta, 
prikazujem ta 3 stejta
hocu da promjenim 1 stejt FEEDBACKS 
i da renderujem samo njega drugacijeg
ako sam dobar trebalo bi samo kada se izabere kategorija da se uzme params i proslijedi u search funckiju
ili da se proslijedi ta kategorija iz Category componente a gore isto to u params, tako nesto 
-->
