<template>
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
  </AuthenticationForm>
</template>
<script lang="ts">
import Input from "src/components/UI/Input.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";

export default {
  components: {
    Input,
    AuthenticationForm,
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