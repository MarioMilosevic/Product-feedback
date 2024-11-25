<template>
  <AuthenticationWrapper type="Login">
    <template #form>
      <AuthenticationForm display="flex">
        <template #email>
          <Input
            type="email"
            name="email"
            :content="loginCredentials.email"
            placeholder="Email Address"
            @update-input="updateEmail"
          />
        </template>
        <template #password>
          <Input
            type="password"
            name="password"
            :content="loginCredentials.password"
            placeholder="Password"
            @update-input="updatePassword"
          />
        </template>
        <template #submit>
          <ActionButton color="blue" size="big" @click="localSignInUser">
            <h3>Login</h3>
          </ActionButton>
        </template>
        <template #homepage>
          <ActionButton color="purple" size="big" @click="goToHomepage">
            <h3>Homepage</h3>
          </ActionButton>
        </template>
      </AuthenticationForm>
    </template>
  </AuthenticationWrapper>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import Input from "src/components/form/Input.vue";
import Label from "src/components/form/Label.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";
import { signInUser } from "src/api/UsersApi";

export default {
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
    AuthenticationForm,
    AuthenticationWrapper,
  },
  props: {},
  data() {
    return {
      loginCredentials: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    //
  },
  mounted() {
    //
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
      const user = await signInUser(
        this.loginCredentials.email,
        this.loginCredentials.password
      );
      console.log(user);
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
