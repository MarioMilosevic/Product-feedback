<template>
  <h3>The page you requested couldn't be found</h3>
  <ActionButton color="purple" size="big" class="button" @click="goBack"
    >Go Back</ActionButton
  >
</template>
<script lang="ts">
import ActionButton from "src/components/layout/ActionButton.vue";

export default {
  name:"NotFound",
  components: {
    ActionButton,
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
h3 {
  grid-area: 1/1/3/4;
  align-self: center;
}
</style>
