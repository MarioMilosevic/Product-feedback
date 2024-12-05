<template>
  <div class="wrapper">
    <h1>{{ title }} Form</h1>
    <HomepageLink position="absolute"/>
 
    <slot name="form" />

    <div class="wrapper__links">
      <p>
        {{ haveAccount }} have an account ?

        <router-link :to="{ name: link }" class="wrapper__links-link">
          {{ link }}
        </router-link>
      </p>
      <p v-if="type === 'Login'">
        Or,
        <span class="wrapper__links-link" @click="signInAnonymously">
          log in as guest
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import Icon from "src/components/UI/Icon.vue";
import { signInGuest } from "src/api/UsersApi";
import { mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import ArrowDown from "src/icons/ArrowDown.vue";
import HomepageLink from "src/components/UI/HomepageLink.vue";

export default {
  components: {
    ActionButton,
    Icon,
    ArrowDown,
    HomepageLink
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
    ...mapActions(useFeedbackStore, ["setUser"]),
    async signInAnonymously() {
      const guestUser = await signInGuest();
      if (guestUser) {
        this.$router.push("/home");
      }
    },
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
  position: relative;

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
