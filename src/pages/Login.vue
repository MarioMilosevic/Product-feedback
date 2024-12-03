<template>
  <AuthenticationWrapper type="Login">
    <template #form>
      <AuthenticationForm display="flex">
        <template #email>
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
        </template>
        <template #password>
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
        </template>
        <template #submit>
          <ActionButton color="blue" size="big" @click="localSignInUser">
            <h3>Log in</h3>
          </ActionButton>
        </template>
      </AuthenticationForm>
    </template>
  </AuthenticationWrapper>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import Input from "src/components/form/Input.vue";
import Label from "src/components/form/Label.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import { signInUser } from "src/api/UsersApi";
import { loginFormSchema } from "src/validation/loginFormSchema";
import { showToast } from "src/utils/toastify";

export default {
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
    AuthenticationForm,
    AuthenticationWrapper,
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
        this.errors = {};
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
