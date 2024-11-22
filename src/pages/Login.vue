<template>
  <div class="wrapper">
    <h1>{{ title }} Form</h1>
    <div class="wrapper__title">
      <ActionButton
        :color="hasAccount ? 'blue' : 'white'"
        size="medium"
        @click="toggleLogin"
      >
        <h3>Login</h3>
      </ActionButton>
      <ActionButton
        :color="!hasAccount ? 'blue' : 'white'"
        size="medium"
        @click="toggleSignUp"
      >
        <h3>Sign Up</h3>
      </ActionButton>
    </div>

    <Input
      v-if="!hasAccount"
      type="text"
      name="email"
      :content="loginCredentials.fullName"
      placeholder="Full Name"
    />
    <Input
      v-if="!hasAccount"
      type="text"
      name="email"
      :content="loginCredentials.username"
      placeholder="Username"
    />
    <Input
      type="text"
      name="email"
      :content="loginCredentials.email"
      placeholder="Email Address"
    />
    <Input
      type="text"
      name="email"
      :content="loginCredentials.password"
      placeholder="Password"
    />
    <Input
      v-if="!hasAccount"
      type="text"
      name="email"
      :content="loginCredentials.password"
      placeholder="Confirm Password"
    />
    <div>
      <ActionButton color="blue" size="big">
        <h3>Sign Up</h3>
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/UI/FormBlock.vue";
import Input from "src/components/UI/Input.vue";
import Label from "src/components/UI/Label.vue";
export default {
  components: {
    ActionButton,
    FormBlock,
    Input,
    Label,
  },
  props: {},
  data() {
    return {
      loginCredentials: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        userImage: "",
      },
      hasAccount: true,
    };
  },
  computed: {
    title() {
      return this.hasAccount ? "Login" : "Sign Up";
    },
    // isSelected ? blue : white
    buttonColor() {
      return this.hasAccount ? "blue" : "white";
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
  gap: 1rem;
  background-color: $primary-color-hover;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
