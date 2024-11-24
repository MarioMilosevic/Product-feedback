<template>
  <AuthenticationWrapper type="Sign Up">
    <template #form>
    <AuthenticationForm display="grid">
      <template #fullName>
        <Input
          type="text"
          name="fullName"
          :content="signUpCredentials.fullName"
          placeholder="Full Name"
        />
      </template>
      <template #userName>
        <Input
          type="text"
          name="userName"
          :content="signUpCredentials.username"
          placeholder="Username"
        />
      </template>
      <template #email>
        <Input
          type="text"
          name="email"
          :content="signUpCredentials.email"
          placeholder="Email Address"
        />
      </template>
      <template #password>
        <Input
          type="text"
          name="password"
          :content="signUpCredentials.password"
          placeholder="Password"
        />
      </template>
      <template #confirmPassword>
        <Input
          type="text"
          name="confirmPassword"
          :content="signUpCredentials.password"
          placeholder="Confirm Password"
        />
      </template>
      <template #image>
        <UploadWidget />
      </template>
    </AuthenticationForm>
    </template>

  </AuthenticationWrapper>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "src/components/UI/Input.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";

export default {
  components: {
    Input,
    UploadWidget,
    AuthenticationForm,
    AuthenticationWrapper,
  },
  props: {},
  data() {
    return {
      signUpCredentials: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        image: "",
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
