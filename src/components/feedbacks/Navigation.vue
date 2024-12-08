<template>
  <nav :class="['navigation', propClass]">
    <div class="navigation__wrapper" v-if="name === 'home'">
      <Icon>
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
          :content="sort"
          @update-select="updateSelect"
        ></Select>
      </FormBlock>
    </div>
    <h1 v-else>Roadmap</h1>
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
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import { navSortOptions } from "src/utils/constants";
import { fetchFilteredFeedbacks } from "src/api/FeedbacksApi";
import { showToast } from "src/utils/toastify";

export default {
  components: {
    Icon,
    ActionButton,
    Select,
    Label,
    FormBlock,
    Lightbulb,
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
    };
  },
  computed: {
    propClass() {
      return `${this.name}Nav`;
    },
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "getFeedbacksLength",
      "sort",
      "filterId",
      "user",
    ]),
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setSort", "setFilterId"]),
    async updateSelect(value: string) {
      this.setSort(value);
      const data = await fetchFilteredFeedbacks(this.filterId, value);
      if (data) {
        this.setFeedbacks(data);
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
    gap: 1rem;

    h3 {
      color: $secondary-color;
    }
  }

  h1 {
    color: $secondary-color;
  }
}

.homeNav {
  justify-content: space-between;
  padding: 1rem 2rem;
}

.roadmapNav {
  padding: $big-gap;
  align-items: center;
  grid-column: 1/4;
}
</style>
