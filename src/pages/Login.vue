<template>
  <AuthenticationWrapper type="Login">
    <template #form>
      <AuthenticationForm display="flex">
        <template #email>
          <Input
            type="text"
            name="email"
            :content="loginCredentials.email"
            placeholder="Email Address"
          />
        </template>
        <template #password>
          <Input
            type="text"
            name="password"
            :content="loginCredentials.password"
            placeholder="Password"
          />
        </template>
        <template #submit>
          <ActionButton color="blue" size="big">
            <h3>Login</h3>
          </ActionButton>
        </template>
        <template #homepage>
          <ActionButton color="purple" size="big">
            <h3>Homepage</h3>
          </ActionButton>
        </template>
      </AuthenticationForm>
    </template>
  </AuthenticationWrapper>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/UI/FormBlock.vue";
import Input from "src/components/UI/Input.vue";
import Label from "src/components/UI/Label.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";

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
  &__buttons {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
}
</style>
