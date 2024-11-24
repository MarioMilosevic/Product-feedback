<template>
  <div class="wrapper">
    <h1>{{ title }} Form</h1>
    <slot name="form" />
    <div class="wrapper__buttons">
      <ActionButton color="blue" size="big">
        <h3>Login</h3>
      </ActionButton>

      <p>
        {{ haveAccount }} have an account ?
        <router-link :to="{ name: link }"> {{ link }} </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";

export default {
  components: {
    ActionButton,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    title() {
      return `${this.type}`;
    },
    haveAccount() {
      return this.type === "Login" ? "Don't" : "Already";
    },
    link() {
      return this.type === "Login" ? "Sign up" : "Login";
    },
  },
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.wrapper {
  padding: 1.5rem 0;
  border-radius: 10px;
  grid-area: 2 / 3/ 3 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: $primary-color-hover;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__buttons {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
}
</style>
