<template>
  <div class="wrapper">
    <FormHeader>
      <h1>Login Form</h1>
    </FormHeader>

    <AuthForm @submit.prevent="localSignInUser" class="wrapper__form">
      <template #email>
        <FormBlock>
          <Input
            type="email"
            name="email"
            v-model="loginCredentials.email"
            placeholder="Email Address"
          />
          <template #error v-if="errors.email">
            {{ errors.email }}
          </template>
        </FormBlock>
      </template>

      <template #password>
        <FormBlock>
          <Input
            type="password"
            name="password"
            v-model="loginCredentials.password"
            placeholder="Password"
          />
          <template #error v-if="errors.password">
            {{ errors.password }}
          </template>
        </FormBlock>
      </template>

      <template #actionButton>
        <ActionButton color="blue" size="big" type="submit">
          <h3>Log in</h3>
        </ActionButton>
      </template>
    </AuthForm>

    <FormGuest link-text="Sign up" @guest-event="signInAnonymously"/>
  </div>
</template>

<script lang="ts">
import ActionButton from "src/components/layout/ActionButton.vue";
import Input from "src/components/form/Input.vue";
import Label from "src/components/form/Label.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import HomepageLink from "src/components/layout/HomepageLink.vue";
import FormHeader from "src/components/form/FormHeader.vue";
import AuthForm from "src/components/form/AuthForm.vue";
import FormGuest from "src/components/form/FormGuest.vue";
import { formWatch, signInUser, signInGuest } from "src/api/UsersApi";
import { loginFormSchema } from "src/validation/loginFormSchema";
import { showToast } from "src/utils/toastify";

export default {
  name: "Login",
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
    HomepageLink,
    FormHeader,
    AuthForm,
    FormGuest,
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
        const emptyObject = formWatch(this.errors);
        if (emptyObject) {
          console.log('mario')
          this.errors = emptyObject;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.wrapper {
  padding: $big 0;
  border-radius: $border-radius-medium;
  grid-area: 2 / 3/ 3 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $very-big;
  background-color: $primary-color-hover;
  position: relative;

  @include mixins.respond(small) {
    padding: $big;
    grid-column: 2 / 8;
    grid-row: 1 / 3;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $big;
  }
}
</style>
