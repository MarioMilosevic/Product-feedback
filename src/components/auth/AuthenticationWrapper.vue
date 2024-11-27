<template>
  <form class="wrapper">
    <h1>{{ title }} Form</h1>
    <router-link :to="{ name: 'Home' }" class="wrapper__back">
      <Icon>
        <LeftArrow />
      </Icon>
      <p>Home</p>
    </router-link>
    <slot name="form" />
    <div class="wrapper__links">
      <p>
        {{ haveAccount }} have an account ?
        <router-link :to="{ name: link }" class="wrapper__links-link"> {{ link }} </router-link>
      </p>
        <p v-if="type==='Login'">
          Or,
          <span class="wrapper__links-link">
            log in as
            guest 
          </span>
        </p>
    </div>
  </form>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import Icon from "src/components/UI/Icon.vue";
import LeftArrow from "src/icons/LeftArrow.vue";

export default {
  components: {
    ActionButton,
    Icon,
    LeftArrow,
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
  methods: {},
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
  position: relative;

  &__back {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 8%;
    left: 5%;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.2rem;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &-link {
      color: $terniary-color;
      text-decoration: none;
      cursor: pointer;
    
      &:hover {
        color: $terniary-color-hover;
      }

    }
  }
}
</style>
