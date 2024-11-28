<template>
  <nav class="nav">
    <ActionButton color="grey" size="medium" @click="goBack" v-if="backButton">
      <Icon>
        <LeftArrow />
      </Icon>
      <span>Go Back</span>
    </ActionButton>
    <template v-if="getUser.id">
      <figure class="nav__figure">
        <img :src="getUser.image" :alt="getUser.image" />
      </figure>
      <div class="nav__button">
        <ActionButton size="big" color="purple" @click="localSignOutUser">
          Sign Out
        </ActionButton>
      </div>
    </template>
    <template v-else>
      <div class="nav__button">
        <ActionButton size="big" color="blue" @click="goToLoginPage"
          >Log In</ActionButton
        >
      </div>
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
import { deleteUser } from "src/api/UsersApi";
import LeftArrow from "src/icons/LeftArrow.vue";
import Icon from "./Icon.vue";
export default {
  components: {
    ActionButton,
    LeftArrow,
    Icon,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(useFeedbackStore, ["getUser"]),
    backButton() {
      return this.$route.meta.backAllowed;
    },
  },
  async created() {
    const user = await retrieveUser();
    console.log(user);
    if (user.id) {
      this.setUser(user);
    }
  },
  mounted() {},
  methods: {
    ...mapActions(useFeedbackStore, ["setUser"]),
    goBack() {
      this.$router.push("/home");
    },
    goToLoginPage() {
      this.$router.push("/login");
    },
    goToSignUpPage() {
      this.$router.push("/sign-up");
    },
    async localSignOutUser() {
      if (this.getUser.is_anonymous) {
        console.log("treba da izbrise");
        await deleteUser(this.getUser);
      } else {
        console.log("treba da izloguje");
        // await signOutUser();
        // this.setUser({} as UserType);
        // showToast("User signed out");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.nav {
  grid-column: span 8;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.5rem;

  &__button {
    grid-column: 8 / 9;
    & > * {
      width: 100%;
    }
  }

  &__figure {
    width: 3.125rem;
    height: 3.125rem;
    grid-column: 7 / 8;
    display: flex;
    justify-self: flex-end;

    img {
      width: 100%;
      height: 100%;
      border-radius: $border-radius-full;
      object-fit: cover;
    }
  }
}
</style>
