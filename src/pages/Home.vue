<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Sidebar />
    <MobileSidebar />
    <MainMario class="home">
      <template #navigation>
        <Navigation
          @open-modal="openModal"
          name="home"
          :activeCategory="activeCategory"
        />
      </template>
      <template #feedback>
        <Feedback
          v-for="feedback in feedbacks"
          :key="feedback.id"
          :feedback="feedback"
          @update-like="updateLikedIds"
        />
      </template>
      <template #form>
        <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
      </template>
      <template #empty v-if="feedbacks.length === 0">
        <Nofeedbacks />
      </template>
      <template #loading>
        <LoadingSpinner :style="{ margin: '0 auto' }" />
      </template>
      <template #footer>
        <Footer />
      </template>
    </MainMario>
  </template>
</template>

<script lang="ts">
import Sidebar from "src/components/sidebar/Sidebar.vue";
import Main from "src/components/UI/Main.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";
import MobileSidebar from "src/components/sidebar/MobileSidebar.vue";
import MainMario from "src/components/UI/MainMario.vue";
import Navigation from "src/components/feedbacks/Navigation.vue";
import Feedback from "src/components/feedbacks/Feedback.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import Nofeedbacks from "src/components/feedbacks/Nofeedbacks.vue";
import Footer from "src/components/UI/Footer.vue";
import { getData } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType } from "src/utils/types";

export default {
  components: {
    Sidebar,
    MobileSidebar,
    Main,
    LoadingSpinner,
    Navigation,
    MainMario,
    Feedback,
    ModalForm,
    Nofeedbacks,
    Footer,
  },
  async created() {
    this.setLoading(true);
    await getData(this.currentPage);
    this.setLoading(false);
  },
  data() {
    return {
      isModalOpen: false,
      activeCategory: 0,
    };
  },

  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "currentPage",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      'setFeedbacksLikes'
    ]),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.home {
  display: flex;
  flex-direction: column;
  grid-column: span 8;
  gap: $medium;

  @include mixins.respond(small) {
    grid-column: span 9;
  }
  @include mixins.respond(medium) {
    grid-column: span 9;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $very-big;
  }
}
</style>
