<template>
  <SharedLayout />
  <RouterView />
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { getData } from "src/api/FeedbacksApi";
import { useFeedbackStore } from "./stores/FeedbackStore";
import SharedLayout from "src/components/SharedLayout.vue";
export default {
  components: {
    SharedLayout,
  },
  async created() {
    const data = await getData();
    if (data) {
      this.setCategories(data.categories);
      this.setFeedbacks(data.feedbacks);
      this.setStatusOptions(data.statusOptions);
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
