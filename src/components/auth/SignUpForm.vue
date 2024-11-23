<template>
  <form>
    <Input
      type="text"
      name="email"
      :content="signUpCredentials.fullName"
      placeholder="Full Name"
    />
    <Input
      type="text"
      name="email"
      :content="signUpCredentials.username"
      placeholder="Username"
    />
    <Input
      type="text"
      name="email"
      :content="signUpCredentials.email"
      placeholder="Email Address"
    />
    <Input
      type="text"
      name="email"
      :content="signUpCredentials.password"
      placeholder="Password"
    />
    <Input
      type="text"
      name="email"
      :content="signUpCredentials.password"
      placeholder="Confirm Password"
    />
    <UploadWidget />
  </form>
</template>
<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "../UI/Input.vue";

export default {
  components: {
    Input,
    UploadWidget,
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

<style></style>
