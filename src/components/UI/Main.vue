<template>
  <main :class="mainClass" ref="mainRef">
    <Navigation @open-modal="openModal" :name="page" />
    <template v-if="feedbacks.length > 0">
      <Feedback
        v-if="page === 'home'"
        v-for="(feedback, index) in feedbacks"
        :key="feedback.id"
        :feedback="feedback"
        @update-like="updateLikedIds"
        :ref="index === feedbacks.length - 1 ? 'lastFeedbackRef' : undefined"
      />
      <RoadmapPageSection
        v-else-if="page === 'roadmap'"
        v-for="status in statusOptions"
        :key="status.id"
        :status="status"
        :filteredFeedbacks="filterFeedbackByStatus(status.name)"
      />
    </template>
    <Nofeedbacks v-else @open-modal="openModal" />
    <Footer ref="footerRef" />
    <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
  </main>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import Feedback from "src/components/feedbacks/Feedback.vue";
import Navigation from "src/components/feedbacks/Navigation.vue";
import ModalForm from "src/components/UI/ModalForm.vue";
import Nofeedbacks from "src/components/feedbacks/Nofeedbacks.vue";
import { FeedbackType, StatusType } from "src/utils/types";
import RoadmapPageSection from "../roadmap/RoadmapPageSection.vue";
import { PropType } from "vue";
import { fetchAllFeedbacks } from "src/api/FeedbacksApi";
import Footer from "src/components/UI/Footer.vue";

export default {
  name: "Main",
  components: {
    Feedback,
    Navigation,
    ModalForm,
    Nofeedbacks,
    RoadmapPageSection,
    Footer,
  },
  props: {
    page: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<FeedbackType[] | StatusType[]>,
      required: true,
      lastFeedbackRef: null,
    },
  },
  data() {
    return {
      observer: null as IntersectionObserver | null,
      rootMarginHeight: 335,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "sort",
      "sort",
      "feedbacks",
      "statusOptions",
      "isModalOpen",
      "currentPage",
      "limit",
    ]),
    mainClass() {
      return `${this.page}Main`;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setFeedbacksLikes",
      "setIsModalOpen",
      "setCurrentPage",
      "addMultipleFeedbacksToStore",
    ]),
    filterFeedbackByStatus(statusName: string) {
      return this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
    },
    closeModal() {
      this.setIsModalOpen(false);
    },
    openModal() {
      this.setIsModalOpen(true);
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
    // setupIntersectionObserver() {
    //   const mainRef = this.$refs.mainRef as HTMLElement;
    //   // console.log(this.$refs.mainRef.clientHeight)
    //   let heightDifference = Math.abs(mainRef.clientHeight - window.innerHeight);
    //   if (heightDifference) {
    //     console.log('uslo')
    //   }
    //   console.log(heightDifference);
    //   if (this.observer) {
    //     this.observer.disconnect();
    //     this.observer = null;
    //   }
    //   this.observer = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach(async (entry) => {
    //         // const heightDifference =
    //         //   entry.boundingClientRect.height - window.innerHeight;
    //         // this.rootMarginHeight = heightDifference;
    //         console.log("razlika", heightDifference);
    //         console.log("main visina", entry.boundingClientRect.height);
    //         console.log("window visina", window.innerHeight);
    //         if (entry.isIntersecting) {
    //           console.log("Intersecting");
    //           const nextFeedbacksData = await fetchAllFeedbacks(
    //             this.currentPage,
    //             this.limit
    //           );
    //           if (nextFeedbacksData) {
    //             this.setCurrentPage(this.currentPage + 1);
    //             this.addMultipleFeedbacksToStore(nextFeedbacksData);
    //             this.rootMarginHeight = heightDifference;
    //             // this.observer?.unobserve(mainRef)
    //             console.log("trebalo bi da unobserve");
    //             // console.log(this.observer)
    //             this.reinitializeObserver();
    //           }
    //         }
    //       });
    //     },
    //     {
    //       root: null,
    //       rootMargin: `0px 0px ${heightDifference}px 0px`,
    //       threshold: 1,
    //     }
    //   );
    //   this.observer.observe(mainRef);
    //   console.log(this.observer);
    //   console.log("visina rootMarginHeigh state", this.rootMarginHeight);
    // },
    // reinitializeObserver() {
    //   // const mainRef = this.$refs.mainRef as HTMLElement;
    //   if (this.observer) {
    //     this.observer.disconnect();
    //     this.observer = null;
    //     console.log("unobserve");
    //     // this.observer.observe(mainRef);
    //   }
    //   console.log("Reinitializing");
    //   this.setupIntersectionObserver();
    // },
  },
  mounted() {
    const footerRef = this.$refs.footerRef.$el;
    console.log(footerRef);

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("intersecting");
          }
        });
      },
      {
        root: null,
        // rootMargin,
        threshold: 0.5,
      }
    );

    footerObserver.observe(footerRef);
    // console.log("mount");
    // this.setupIntersectionObserver();
    // if (this.observer) {
    //   this.observer.disconnect()
    // }
    //   const mainRef = this.$refs.mainRef;
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach(async (entry) => {
    //         console.log("klient rect visina", entry.boundingClientRect.height);
    //         console.log("window visina", window.innerHeight);
    //         if (entry.isIntersecting) {
    //           console.log("radi");
    //           const nextFeedbacksData = await fetchAllFeedbacks(
    //             this.currentPage,
    //             this.limit
    //           );
    //           if (nextFeedbacksData) {
    //             this.setCurrentPage(this.currentPage + 1);
    //             this.addMultipleFeedbacksToStore(nextFeedbacksData);
    //           }
    //         }
    //       });
    //     },
    //     {
    //       root: null,
    //       rootMargin: "0px 0px 335px 0px",
    //       threshold: 1,
    //     }
    //   );
    //   observer.observe(mainRef as HTMLElement);
  },
};
</script>

<style lang="scss" scoped>
.homeMain {
  display: flex;
  flex-direction: column;
  grid-column: span 7;
  gap: 1rem;
}
.roadmapMain {
  grid-column: 1 / 9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5rem;
  column-gap: 2rem;
}
</style>
