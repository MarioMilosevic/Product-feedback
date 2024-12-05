<template>
  <nav class="nav" v-if="loading === false">
    <HomepageLink v-if="backButton" />

    <template v-if="user.id">
      <h3 v-if="!backButton" class="nav__heading">
        Welcome back: {{ userFirstName }}
      </h3>
      <figure class="nav__figure">
        <img :src="user.image" :alt="user.image" />
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
import HomepageLink from "src/components/UI/HomepageLink.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import LeftArrow from "src/icons/LeftArrow.vue";
import Icon from "src/components/UI/Icon.vue";
import { retrieveUser, signOutUser } from "src/api/UsersApi";
import { mapState, mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { showToast } from "src/utils/toastify";
import { deleteUser } from "src/api/UsersApi";
import { UserType } from "src/utils/types";
import { notLoggedInUser } from "src/utils/constants";

export default {
  components: {
    ActionButton,
    LeftArrow,
    Icon,
    HomepageLink,
  },
  computed: {
    ...mapState(useFeedbackStore, ["user", "loading"]),
    backButton() {
      return this.$route.meta.backAllowed;
    },
    userFirstName() {
      const fullName = this.user.fullName;
      const firstName = fullName.split(" ")[0];
      return firstName;
    },
  },
  async created() {
    this.setLoading(true);
    const user = await retrieveUser();
    console.log("trenutni user na stvaranju prije setUser", user);
    if (user.id) {
      this.setUser(user);
      this.setLoading(false);
    }
  },
  methods: {
    ...mapActions(useFeedbackStore, ["setUser", "setLoading"]),
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
      if (this.user.is_anonymous) {
        await deleteUser(this.user);
      } else {
        await signOutUser();
        showToast("User signed out");
      }
      this.setUser(notLoggedInUser as UserType);
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

  &__heading {
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;
  }

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
