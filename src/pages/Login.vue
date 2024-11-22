<template>
  <div class="wrapper">
    <h1>{{ title }} Form</h1>
    <div class="wrapper__title">
      <ActionButton color="blue" size="medium" @click="toggleLogin">
        <h3>Login</h3>
      </ActionButton>
      <ActionButton color="white" size="medium" @click="toggleSignUp">
        <h3>Sign Up</h3>
      </ActionButton>
    </div>
    <Input
      v-if="!hasAccount"
      type="text"
      name="email"
      :content="loginCredentials.name"
      placeholder="Name"
    />
    <Input
      v-if="!hasAccount"
      type="text"
      name="email"
      :content="loginCredentials.lastName"
      placeholder="Last Name"
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
        name: "",
        lastName: "",
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
      this.hasAccount = false
    },
    toggleLogin() {
      this.hasAccount = true
    },
    //
  },
};
</script>
<style scoped lang="scss">
@import "src/scss/_variables.scss";

.wrapper {
  padding: 1.5rem;
  border-radius: 10px;
  grid-area: 2 / 2/ 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: $primary-color-hover;

  &__title {
    display: flex;
    align-items: center;
    overflow: hidden;
  }
}
</style>
