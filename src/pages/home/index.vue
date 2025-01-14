<template>
  <LoadingSpinner v-if="loading" />
  <template v-else>
    <Sidebar />
    <Main class="home">
      <template #navigation>
        <Navigation class="home__navigation">
          <template #icon>
            <Icon size="big" class="home__navigation-icon">
              <Lightbulb />
            </Icon>
          </template>
          <template #title>
            <div class="home__navigation-title">
              <h3>{{ getFeedbacksLength }} Suggestions</h3>
            </div>
          </template>
          <template #form-element>
            <FormBlock direction="row" color="blue">
              <Label name="sort" textColor="white">
                <template #title>Sort By:</template>
              </Label>
              <Select
                color="blue"
                name="sort"
                :options="navSortOptions"
                :content="filterOptions.sort"
                @update-select="updateSelect"
              ></Select>
            </FormBlock>
          </template>
          <template #button>
            <ActionButton color="purple" size="medium" @click="openModal">
              Add Feedback
            </ActionButton>
          </template>
        </Navigation>
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
import Sidebar from "src/pages/home/Sidebar.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";
import Main from "src/components/layout/Main.vue";
import Feedback from "src/pages/feedbacks/Feedback.vue";
import ModalForm from "src/components/form/ModalForm.vue";
import Nofeedbacks from "src/pages/feedbacks/Nofeedbacks.vue";
import Footer from "src/components/layout/Footer.vue";
import Scroll from "src/components/layout/Scroll.vue";
import Navigation from "src/components/layout/Navigation.vue";
import Lightbulb from "src/icons/Lightbulb.vue";
import Icon from "src/components/layout/Icon.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import Label from "src/components/form/Label.vue";
import Select from "src/components/form/Select.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import { getData, fetchFeedbacks } from "src/api/FeedbacksApi";
import { mapActions, mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { FeedbackType } from "src/utils/types";
import { navSortOptions } from "src/utils/constants";

export default {
  name: "Home",
  components: {
    Sidebar,
    LoadingSpinner,
    Navigation,
    Main,
    Feedback,
    ModalForm,
    Nofeedbacks,
    Footer,
    Scroll,
    Icon,
    Lightbulb,
    FormBlock,
    Label,
    Select,
    ActionButton,
  },
  async created() {
    this.setLoading(true);
    await getData(this.currentPage);
    this.setLoading(false);
  },
  data() {
    return {
      navSortOptions,
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
      "getFeedbacksLength",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setLoading",
      "setFeedbacksLikes",
      "setCurrentPage",
      "setFeedbacks",
      "setSort",
    ]),
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async updateSelect(value: string) {
      this.setSort(value);
      this.setCurrentPage(1);
      const data = await fetchFeedbacks(this.filterOptions, this.currentPage);
      if (data) {
        this.setFeedbacks(data);
        this.setCurrentPage(this.currentPage + 1);
      }
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

  &__navigation {
    background-color: $terniary-color;
    border-radius: $border-radius-medium;
    color: $secondary-color;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $medium;

    &-icon {
      @include mixins.respond(small) {
        display: none;
      }
    }

    &-title {
      display: flex;
      align-items: center;
      gap: $medium;
      color: $secondary-color;

      @include mixins.respond(small) {
        display: none;
      }
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: $very-big;
  }
}
</style>
