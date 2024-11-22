<template>
  <div class="wrapper">
    <h1>Login Form</h1>
    <div class="wrapper__title">
        <ActionButton color="blue" size="medium">
          <h2>Login</h2>
        </ActionButton>
        <ActionButton color="grey" size="medium">
          <h2>Sign Up</h2>
        </ActionButton>
    </div>
    <FormBlock>
      <Label name="email">
        <template #title>
          Email Address
        </template>
      </Label>
      <Input type="text" name="email" :content="loginCredentials.email"/>
    </FormBlock>
    <FormBlock>
      <Label name="email">
        <template #title>
          Email Address
        </template>
      </Label>
      <Input type="text" name="email" :content="loginCredentials.email"/>
    </FormBlock>
    <FormBlock>
      <Label name="email">
        <template #title>
          Email Address
        </template>
      </Label>
      <Input type="text" name="email" :content="loginCredentials.email"/>
    </FormBlock>
    <FormBlock>
      <Label name="email">
        <template #title>
          Email Address
        </template>
      </Label>
      <Input type="text" name="email" :content="loginCredentials.email"/>
    </FormBlock>
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
    Label
  },
  props: {},
  data() {
    return {
      loginCredentials: {
        email: "",
        password: "",
        fullName: "",
        userImage:""
      }
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
  border: 1px solid black;
  grid-area: 2 / 2/ 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: $primary-color-hover;

  &__title {
    border: 1px solid black;
    display: flex;
    align-items: center;
  }
}
</style>
