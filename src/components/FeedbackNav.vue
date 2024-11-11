<template>
  <nav class="navigation">
    <div class="navigation__parentDiv">
      <Icon>
        <Lightbulb />
      </Icon>
      <h3>{{ getFeedbacksLength }} Suggestions</h3>
      <div class="navigation__parentDiv__childDiv">
        <FormBlock direction="row" color="blue">
          <Label for="suggestions" name="sort">
            <template #title>Sort By:</template>
          </Label>
          <Select
            color="blue"
            name="sort"
            :options="navSortOptions"
            :content="getSort"
            @update-select="updateSelect"
          ></Select>
        </FormBlock>
      </div>
    </div>
    <ActionButton color="purple" size="small" @click="$emit('open-modal')">
      Add Feedback
    </ActionButton>
  </nav>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import Select from "src/components/Select.vue";
import Label from "src/components/Label.vue";
import { navSortOptions } from "src/utils/constants";
import Icon from "src/components/Icon.vue";
import ActionButton from "src/components/ActionButton.vue";
import FormBlock from "src/components/FormBlock.vue";
import Lightbulb from "src/icons/Lightbulb.vue";
import { fetchFeedbacks } from "src/api/FeedbacksApi";

export default {
  components: {
    Icon,
    ActionButton,
    Select,
    Label,
    FormBlock,
    Lightbulb,
  },
  props: {},
  emits: ["open-modal"],
  data() {
    return {
      navSortOptions,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "feedbacks",
      "getFeedbacksLength",
      "getSort",
      "getFilterId",
    ]),
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setFeedbacks", "setSort", "setFilterId"]),

    async updateSelect(value: string) {
      this.setSort(value);
      const data = await fetchFeedbacks(this.getFilterId, value);
      if (data) {
        this.setFeedbacks(data);
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.navigation {
  background-color: $terniary-color;
  padding: 16px 32px;
  border-radius: $border-radius-medium;
  color: $secondary-color;
  display: flex;
  justify-content: space-between;

  &__parentDiv {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__childDiv {
      &-select {
        background-color: $terniary-color;
        color: $secondary-color;
        padding: 8px 4px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
}
</style>
