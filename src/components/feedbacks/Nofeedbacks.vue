<template>
  <section class="section">
    <Icon
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 131 137"
      class="section__icon"
    >
      <Inspector />
    </Icon>
    <h1>There is no feedback yet.</h1>

    <p class="section__paragraph">
      Got a suggestion? Found a bug that needs to be squashed?
      <br />
      We love hearing about new ideas to improve our app.
    </p>
    <ActionButton color="purple" size="medium" @click="openModal"
      >Add Feedback</ActionButton
    >
  </section>
</template>

<script lang="ts">
import Icon from "src/components/UI/Icon.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import Inspector from "src/icons/Inspector.vue";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { showToast } from "src/utils/toastify";

export default {
  components: {
    Icon,
    ActionButton,
    Inspector,
  },
  emits: ["open-modal"],
  computed: {
    ...mapState(useFeedbackStore, ["getUser"]),
  },
  methods: {
    openModal() {
      if (!this.getUser.is_anonymous) {
        this.$emit("open-modal");
      } else {
        showToast("You must create an account first", "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";
.section {
  background-color: $secondary-color;
  border-radius: $border-radius-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  height: 500px;

  &__paragraph {
    text-align: center;
    display: flex;
    line-height: 25px;
  }

  &__icon {
    width: 136px;
    height: 130px;
  }
}
</style>
