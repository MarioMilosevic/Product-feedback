<template>
  <nav class="nav" v-if="loading === false">
    <HomepageLink v-if="backButton" />
    <template v-if="user.id">
      <h3 v-if="!backButton" class="nav__heading">
        Welcome back: {{ userFirstName }}
      </h3>
      <div class="nav__buttons">
        <figure class="nav__buttons-figure">
          <img :src="user.image" :alt="user.image" />
        </figure>
        <div class="nav__button">
          <ActionButton size="big" color="purple" @click="localSignOutUser">
            Sign Out
          </ActionButton>
        </div>
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
import HomepageLink from "src/components/layout/HomepageLink.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import Icon from "src/components/layout/Icon.vue";
import { signOutUser } from "src/api/UsersApi";
import { mapState, mapActions } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { showToast } from "src/utils/toastify";
import { deleteUser } from "src/api/UsersApi";
import { UserType } from "src/utils/types";
import { notLoggedInUser } from "src/utils/constants";

export default {
  name:"SharedLayout",
  components: {
    ActionButton,
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
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.nav {
  grid-column: span 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $big;

  @include mixins.respond(small) {
    grid-column: span 9;
    padding: 0 $medium;
  }

  &__buttons {
    display: flex;
    gap: $medium;

    &-figure {
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

  &__heading {
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;

    @include mixins.respond(small) {
      font-size: $small-font;
    }
  }

  &__button {
    margin-left: auto;
    & > * {
      width: 100%;
    }
  }
}
</style>
