<template>
  <SharedLayout />
  <RouterView />
</template>

<script lang="ts">
import SharedLayout from "src/components/SharedLayout.vue";
export default {
  components: {
    SharedLayout,
  },
};
</script>
