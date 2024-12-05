<template>
  <div class="wrapper">
    <h1>Login Form</h1>
    <HomepageLink position="absolute" />
    <form @submit.prevent="localSignInUser" class="wrapper__form">
      <FormBlock>
        <Input
          type="email"
          name="email"
          :content="loginCredentials.email"
          placeholder="Email Address"
          @update-input="updateEmail"
        />
        <template #error v-if="errors.email">
          {{ errors.email }}
        </template>
      </FormBlock>
      <FormBlock>
        <Input
          type="password"
          name="password"
          :content="loginCredentials.password"
          placeholder="Password"
          @update-input="updatePassword"
        />
        <template #error v-if="errors.password">
          {{ errors.password }}
        </template>
      </FormBlock>

      <ActionButton color="blue" size="big" type="submit">
        <h3>Log in</h3>
      </ActionButton>
    </form>

    <div class="wrapper__links">
      <p>
        Already have an account ?

        <router-link :to="{ name: 'Sign up' }" class="wrapper__links-link">
           Sign up 
        </router-link>
      </p>
      <p>
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
import Input from "src/components/form/Input.vue";
import Label from "src/components/form/Label.vue";
// import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
// import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import { formWatch, signInUser, signInGuest } from "src/api/UsersApi";
import { loginFormSchema } from "src/validation/loginFormSchema";
import { showToast } from "src/utils/toastify";
import HomepageLink from "src/components/UI/HomepageLink.vue";

export default {
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
    // AuthenticationForm,
    // AuthenticationWrapper,
    HomepageLink,
  },
  data() {
    return {
      loginCredentials: {
        email: "",
        password: "",
      },
      errors: {} as Record<string, string>,
    };
  },
  computed: {
    // haveAccount() {
    //   return this.type === "Login" ? "Don't" : "Already";
    // },
    // link() {
    //   return this.type === "Login" ? "Sign up" : "Login";
    // },
  },
  methods: {
    goToHomepage() {
      this.$router.push("/home");
    },
    updateEmail(value: string) {
      this.loginCredentials.email = value;
    },
    updatePassword(value: string) {
      this.loginCredentials.password = value;
    },
    async signInAnonymously() {
      const guestUser = await signInGuest();
      if (guestUser) {
        this.$router.push("/home");
      }
    },
    async localSignInUser() {
      try {
        const validation = loginFormSchema.safeParse(this.loginCredentials);
        if (validation.success) {
          const user = await signInUser(
            this.loginCredentials.email,
            this.loginCredentials.password
          );
          if (user) {
            this.$router.push("/home");
          }
        } else {
          this.errors = validation.error.errors.reduce((acc, err) => {
            const key = err.path.length > 0 ? err.path[0] : "";
            acc[key] = err.message;
            return acc;
          }, {} as Record<string, string>);
        }
      } catch (error) {
        console.error("Unexpected error occured", error);
        showToast("Unexpected error occured", "error");
      }
    },
  },
  watch: {
    loginCredentials: {
      deep: true,
      handler() {
        console.log("pvojera");
        formWatch(this.errors);
      },
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

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__button {
      width: 100%;
      display: flex;

      & > * {
        width: 100%;
      }
    }

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
}
</style>
