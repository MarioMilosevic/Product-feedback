<template>
  <form>
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
  </form>
</template>
<script lang="ts">
import Input from "../UI/Input.vue";

export default {
  components: {
    Input,
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
<style></style>
