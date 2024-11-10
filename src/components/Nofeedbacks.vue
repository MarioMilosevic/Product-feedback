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
    <ActionButton color="purple" size="medium" @click="$emit('open-modal')"
      >Add Feedback</ActionButton
    >
  </section>
</template>

<script lang="ts">
import Icon from "src/components/Icon.vue";
import ActionButton from "src/components/ActionButton.vue";
import Inspector from "src/icons/Inspector.vue";

export default {
  components: {
    Icon,
    ActionButton,
    Inspector,
  },
  props: {},
  emits: ["open-modal"],
  data() {
    return {};
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
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
