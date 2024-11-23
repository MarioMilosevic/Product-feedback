<template>
  <form submit.prevent>
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

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
