<template>
  <SharedLayout v-if="hasSharedLayout" />
  <RouterView />
</template>

<script lang="ts">
import SharedLayout from "src/components/layout/SharedLayout.vue";
export default {
  components: {
    SharedLayout,
  },
  computed: {
    hasSharedLayout() {
      return !this.$route.meta.isCredentialsForm;
    },
  },
};
</script>
