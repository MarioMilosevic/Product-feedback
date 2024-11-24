<template>
  <form class="wrapper">
  <!-- <form class="wrapper" v-on:submit.prevent="mario"> -->
    <h1>{{ title }} Form</h1>
    <slot name="form" />
    <p>
      {{ haveAccount }} have an account ?
      <router-link :to="{ name: link }"> {{ link }} </router-link>
    </p>
  </form>
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
  mounted() {},
  methods: {
    mario() {
      console.log('mario')
    }
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
}
</style>
