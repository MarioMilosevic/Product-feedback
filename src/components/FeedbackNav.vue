<template>
  <nav class="navigation">
    <div class="navigation__parentDiv">
      <Icon>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </Icon>
      <h3>{{ feedbacksLength }} Suggestions</h3>

      <div class="navigation__parentDiv__childDiv">
        <label for="suggestions">Sort by:</label>
        <select
          name="suggestions"
          id="suggestions"
          class="navigation__parentDiv__childDiv-select"
          v-model="selected"
          @change="sortFeedbacks"
        >
          <option value="mostLikes">Most Likes</option>
          <option value="leastLikes">Least Likes</option>
          <option value="mostComments">Most Comments</option>
          <option value="leastComments">Least Comments</option>
        </select>
      </div>
    </div>
    <ActionButton color="purple" size="big" @click="$emit('open-modal')">
      Add Feedback
    </ActionButton>
  </nav>
</template>

<script lang="ts">
import { useFeedbackStore } from "src/stores/FeedbackStore";
import Icon from "src/components/Icon.vue";
import ActionButton from "src/components/ActionButton.vue";

export default {
  components: {
    Icon,
    ActionButton,
  },
  props: {},
  emits: ["open-modal"],
  data() {
    return {
      feedbackStore: useFeedbackStore(),
      selected: "mostLikes",
    };
  },
  computed: {
    feedbacksLength() {
      return this.feedbackStore.feedbacks.length;
    },
  },
  mounted() {
    //
  },
  methods: {
    sortFeedbacks() {
      console.log('promjena')
    }
    //
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
