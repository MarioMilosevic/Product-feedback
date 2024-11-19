<template>
  <SharedLayout />
  <RouterView />
</template>

<script lang="ts">
import SharedLayout from "src/components/UI/SharedLayout.vue";
import Home from "src/views/Home.vue";

export default {
  components: {
    SharedLayout,
    Home,
  },
};
</script>
