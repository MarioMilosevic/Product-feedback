<template>
  <div class="wrapper">
    <h1>{{ title }} Form</h1>
    <div class="wrapper__title">
      <ActionButton
        :color="loginButtonColor"
        size="medium"
        @click="toggleLogin"
      >
        <h3>Login</h3>
      </ActionButton>
      <ActionButton
        :color="signUpButtonColor"
        size="medium"
        @click="toggleSignUp"
      >
        <h3>Sign Up</h3>
      </ActionButton>
    </div>
    <LoginForm v-if="hasAccount" />
    <SignUpForm v-else />
    <ActionButton color="blue" size="big">
      <h3>{{ submitButton }}</h3>
    </ActionButton>
  </div>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/UI/FormBlock.vue";
import Input from "src/components/UI/Input.vue";
import Label from "src/components/UI/Label.vue";
import LoginForm from "src/components/auth/LoginForm.vue";
import SignUpForm from "src/components/auth/SignUpForm.vue";

export default {
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
    UploadWidget,
    LoginForm,
    SignUpForm,
  },
  props: {},
  data() {
    return {
      hasAccount: true,
    };
  },
  computed: {
    title() {
      return this.hasAccount ? "Login" : "Sign Up";
    },
    loginButtonColor() {
      return this.hasAccount ? "blue" : "white";
    },
    signUpButtonColor() {
      return !this.hasAccount ? "blue" : "white";
    },
    submitButton() {
      return this.hasAccount ? "Login" : "Sign Up";
    },
    //
  },
  mounted() {
    //
  },
  methods: {
    toggleSignUp() {
      this.hasAccount = false;
    },
    toggleLogin() {
      this.hasAccount = true;
    },
    //
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

  &__form {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

    &-div {
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      /* flex-wrap: wrap; */
      justify-content: center;
    }
  }
}
</style>
