<template>
  <nav>
    <ActionButton size="big" color="blue" @click="goToLoginPage"
      >Log In</ActionButton
    >
    <ActionButton size="big" color="purple" @click="goToSignUpPage"
      >Sign Up</ActionButton
    >
  </nav>
</template>

<script lang="ts">
// import { retrieveUser } from "src/api/UsersApi";
import ActionButton from "src/components/UI/ActionButton.vue";
export default {
  components: {
    ActionButton,
  },
  props: {},
  data() {
    return {
    user:null
    };
  },
  computed: {},
 async created() {
  //  const user = await retrieveUser()
  // console.log("user shared layout",user)
  },
  mounted() {},
  methods: {
    goToLoginPage() {
      this.$router.push("/login");
    },
    goToSignUpPage() {
      this.$router.push("/sign-up");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  grid-column: span 8;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
