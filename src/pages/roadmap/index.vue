<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Main class="roadmap">
      <template #navigation>
        <Navigation class="roadmap__navigation">
          <template #title>
            <h2 class="roadmap__navigation-title">Roadmap</h2>
          </template>
          <template #form-element>
            <FormBlock direction="row" color="blue" :has-icon="true">
              <template #default>
                <Input
                  :content="searchValue"
                  name="search"
                  color="blue"
                  placeholder="Search feedbacks..."
                  @update-input="searchFeedbacks"
                />
              </template>
            </FormBlock>
          </template>
          <template #button>
            <ActionButton color="purple" size="medium" @click="openModal">
              Add Feedback
            </ActionButton>
          </template>
        </Navigation>
      </template>
      <template #title>
        <RoadmapTitle
          v-for="(status, index) in statusOptions"
          :key="status.id"
          :status="status"
          :isSelected="activeIndex === index"
          @click="changeSection(index)"
        />
      </template>
      <template #list>
        <RoadmapSectionTitle
          :selectedStatus="statusOptions[activeIndex]"
          :count="filterFeedbackByStatus(statusOptions[activeIndex].name)"
        />
      </template>
      <template #feedback>
        <RoadmapFeedback
          v-for="feedback in feedbacks"
          :feedback="feedback"
          :key="feedback.id"
          @update-like="updateLikedIds"
        />
      </template>
      <template #form>
        <ModalForm :isModalOpen="isModalOpen" @close-modal="closeModal" />
      </template>
      <template #scroll>
        <Scroll :isObserving="isObserving">
          <template #loadingRef>
            <div ref="loadingRef"></div>
          </template>
        </Scroll>
      </template>
    </Main>
  </template>
</template>

<script lang="ts">
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";
import Main from "src/components/layout/Main.vue";
import RoadmapTitle from "src/pages/roadmap/RoadmapTitle.vue";
import RoadmapSectionTitle from "src/pages/roadmap/RoadmapSectionTitle.vue";
import RoadmapFeedback from "src/pages/roadmap/RoadmapFeedback.vue";
import ModalForm from "src/components/layout/ModalForm.vue";
import Footer from "src/components/layout/Footer.vue";
import Scroll from "src/components/layout/Scroll.vue";
import Navigation from "src/components/layout/Navigation.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import Label from "src/components/form/Label.vue";
import Input from "src/components/form/Input.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { getData } from "src/api/FeedbacksApi";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { FeedbackType } from "src/utils/types";

export default {
  name:"Roadmap",
  components: {
    LoadingSpinner,
    Main,
    Navigation,
    RoadmapTitle,
    RoadmapSectionTitle,
    RoadmapFeedback,
    ModalForm,
    Footer,
    Scroll,
    FormBlock,
    Label,
    Input,
    ActionButton,
  },
  async created() {
    this.setLoading(true);
    await getData(1, 1);
    this.setLoading(false);
  },
  data() {
    return {
      activeIndex: 0,
      isModalOpen: false,
      searchValue: "",
      isObserving: true,
      timeout: undefined as ReturnType<typeof setTimeout> | undefined,
      loadingObserver: null as IntersectionObserver | null,
      loadingRef: null,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "loading",
      "feedbacks",
      "statusOptions",
      "currentPage",
      "filterOptions",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setStatusOptions",
      "setFeedbacks",
      "setLoading",
      "setFeedbacksLikes",
      "setCurrentPage",
    ]),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    filterFeedbackByStatus(statusName: string) {
      const filteredFeedbacks = this.feedbacks.filter(
        (feedback) => feedback.status.name === statusName
      );
      return filteredFeedbacks.length;
    },
    updateLikedIds(updatedFeedback: FeedbackType) {
      this.setFeedbacksLikes(updatedFeedback);
    },
    async changeSection(index: number) {
      this.searchValue = "";
      this.activeIndex = index;
      this.setCurrentPage(2);
      const data = await fetchFeedbacks(
        this.filterOptions,
        1,
        this.activeIndex + 1
      );
      this.setFeedbacks(data as FeedbackType[]);
      this.setupObserver();
    },
    searchFeedbacks(value: string) {
      this.setCurrentPage(1);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        this.searchValue = value;
        const data = await fetchFeedbacks(
          this.filterOptions,
          1,
          this.activeIndex + 1,
          this.searchValue
        );
        this.setFeedbacks(data as FeedbackType[]);
        this.setCurrentPage(2);
        this.setupObserver();
      }, 500);
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
                this.currentPage,
                this.activeIndex + 1,
                this.searchValue
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
      if (this.loadingObserver && this.loadingRef) {
        this.loadingObserver.observe(this.loadingRef as HTMLElement);
      }
    },
    observerUnobserve() {
      if (this.loadingObserver && this.loadingRef) {
        this.loadingObserver.unobserve(this.loadingRef as HTMLElement);
        this.loadingObserver = null;
      }
      this.isObserving = false;
    },
  },
  updated() {
    if (this.isObserving) {
      this.loadingRef = this.$refs.loadingRef as null;
      this.setupObserver();
    }
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.roadmap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column: 1 / 10;

  @include mixins.respond(medium) {
    column-gap: $big;
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $medium;
    grid-column: 1/4;
    background-color: $terniary-color;
    border-radius: $border-radius-medium;
    color: $secondary-color;

    @include mixins.respond(small) {
      column-gap: $small;
      padding: $small;
    }

    @include mixins.respond(medium) {
      column-gap: $big;
    }

    &-title {
      @include mixins.respond(small) {
        display: none;
      }
    }
  }

  &__list {
    grid-column: 1/4;
    display: flex;
    flex-direction: column;
    padding: 0 $medium;
    gap: $big;

    @include mixins.respond(small) {
      column-gap: $medium;
    }
  }
}

.loadingRef {
  grid-column: 2/3;
}
</style>
