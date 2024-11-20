<template>
  <nav>
    <ActionButton size="big" color="purple" @click="goToLoginPage">Log In</ActionButton>
  </nav>
</template>

<script lang="ts">
import ActionButton from "src/components/UI/ActionButton.vue";
export default {
  components: {
    ActionButton,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    goToLoginPage() {
      this.$router.push("/login")
    }
    //
  },
};
</script>

<style lang="scss" scoped>
nav {
  grid-column: span 4;
  display: flex;
  justify-content: flex-end;
}
</style>
