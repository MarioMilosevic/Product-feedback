<template>
  <nav>
    <template v-if="getUser.id">
      <figure>
        <img :src="getUser.image" :alt="getUser.image" />
      </figure>
      <ActionButton size="big" color="purple" @click="localSignOutUser">
        Sign Out
      </ActionButton>
    </template>
    <template v-else>
      <ActionButton size="big" color="blue" @click="goToLoginPage"
        >Log In</ActionButton
      >
      <ActionButton size="big" color="purple" @click="goToSignUpPage"
        >Sign Up</ActionButton
      >
    </template>
  </nav>
</template>

<script lang="ts">
import { retrieveUser, signOutUser } from "src/api/UsersApi";
import { mapState, mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import ActionButton from "src/components/UI/ActionButton.vue";
import { UserType } from "src/types/types";
import { showToast } from "src/utils/toastify";
export default {
  components: {
    ActionButton,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(useFeedbackStore, ["getUser"]),
  },
  async created() {
    const user = await retrieveUser();
    this.setUser(user);
    console.log("user shared layout", user);
  },
  mounted() {
    // console.log(this.getUser);
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setUser"]),
    goToLoginPage() {
      this.$router.push("/login");
    },
    goToSignUpPage() {
      this.$router.push("/sign-up");
    },
    async localSignOutUser() {
      await signOutUser();
      this.setUser({} as UserType);
      showToast('User signed out')
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

nav {
  grid-column: span 8;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  figure {
    width: 3.125rem;
    height: 3.125rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: $border-radius-full;
      object-fit: cover;
    }
  }
}
</style>
