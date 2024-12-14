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
      <template #scroll>
        <Scroll :isObserving="isObserving" class="home__loading" ref="scrollRef"/>
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
import { getData, fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType } from "src/utils/types";
import Scroll from "src/components/UI/Scroll.vue";

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
    Scroll
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
      isObserving: true,
      loadingObserver: null as IntersectionObserver | null,
      loadingRef: null,
    };
  },

  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "currentPage",
      "filterOptions",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setFeedbacksLikes",
      "setCurrentPage",
      "setFeedbacks",
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
    setupObserver() {
      if (!this.loadingRef) return;
      this.isObserving = true;
      this.loadingObserver?.disconnect();
      this.loadingObserver = null;
      this.loadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && this.isObserving) {
              const feedbacksData = await fetchFeedbacks(
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
                this.isObserving = false;
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
  updated() {
    if (this.isObserving) {
      this.loadingRef = this.$refs.scrollRef.$el;
      this.setupObserver();
    }
  },
  watch: {
    currentPage(newValue) {
      if (newValue === 2) {
        this.setupObserver();
      }
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
