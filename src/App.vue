<template>
  <SharedLayout v-if="hasSharedLayout" />
  <RouterView />
</template>

<script lang="ts">
import SharedLayout from "src/components/UI/SharedLayout.vue";
import Home from "src/pages/Home.vue";

export default {
  components: {
    SharedLayout,
    Home,
  },
  computed: {
    hasSharedLayout() {
      return !this.$route.meta.isCredentialsForm;
    },
  },
};
</script>

<!-- 
1. u sharedLayout treba da vidi da li postoji auth token
ako postoji, da feca usera i prikaze sliku i sign out
ako ne postoji da prikaze sign up i login

2. DA PROVJERIM OCE LI MI TREBATI OVO UOPSTE U PINIA-I
-->