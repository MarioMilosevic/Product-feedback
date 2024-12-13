<template>
  <nav :class="['navigation', propClass]">
    <div class="navigation__wrapper" v-if="name === 'home'">
      <Icon class="navigation__wrapper-lightbulb">
        <Lightbulb />
      </Icon>
      <h3>{{ getFeedbacksLength }} Suggestions</h3>
      <FormBlock direction="row" color="blue">
        <Label name="sort">
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
    </div>
    <template v-else>
      <FormBlock direction="row">
        <template #label>
          <Label name="search">
            <template #title>
              <h1>Roadmap</h1>
            </template>
          </Label>
        </template>
        <template #default>
          <Input
            :content="searchValue"
            name="search"
            color="blue"
            placeholder="Search feedbacks..."
          />
        </template>
      </FormBlock>
    </template>
    <ActionButton color="purple" size="medium" @click="openModal">
      Add Feedback
    </ActionButton>
  </nav>
</template>

<script lang="ts">
import Select from "src/components/form/Select.vue";
import Label from "src/components/form/Label.vue";
import Icon from "src/components/UI/Icon.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import Lightbulb from "src/icons/Lightbulb.vue";
import Input from "src/components/form/Input.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import { navSortOptions } from "src/utils/constants";
import { fetchFeedbacks } from "src/api/FeedbacksApi";
import { showToast } from "src/utils/toastify";

export default {
  components: {
    Icon,
    ActionButton,
    Select,
    Label,
    FormBlock,
    Lightbulb,
    Input,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["open-modal"],
  data() {
    return {
      navSortOptions,
      searchValue: "",
    };
  },
  computed: {
    propClass() {
      return `${this.name}Nav`;
    },
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "getFeedbacksLength",
      "filterOptions",
      "user",
      "currentPage",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "setFeedbacks",
      "setSort",
      "setFilterId",
      "setCurrentPage",
    ]),

    async updateSelect(value: string) {
      this.setSort(value);
      this.setCurrentPage(1);
      const data = await fetchFeedbacks(this.filterOptions, this.currentPage);
      if (data) {
        this.setFeedbacks(data);
        this.setCurrentPage(this.currentPage + 1);
      }
    },
    openModal() {
      if (!this.user.is_anonymous) {
        this.$emit("open-modal");
      } else {
        showToast("You must create an account first", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.navigation {
  background-color: $terniary-color;
  border-radius: $border-radius-medium;
  color: $secondary-color;
  flex-direction: row;
  display: flex;
  justify-content: space-between;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: $medium;

    &-lightbulb {
      @include mixins.respond(small) {
        display: none;
      }
    }

    h3 {
      color: $secondary-color;
      @include mixins.respond(small) {
        display: none;
      }
    }
  }

  h1 {
    color: $secondary-color;
  }
}

.homeNav {
  justify-content: space-between;
  padding: $medium;
}

.roadmapNav {
  padding: $big;
  align-items: center;
  grid-column: 1/4;
}
</style>
