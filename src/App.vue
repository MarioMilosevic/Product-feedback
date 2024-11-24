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
