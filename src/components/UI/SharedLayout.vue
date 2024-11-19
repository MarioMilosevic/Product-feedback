<template>
  <nav>
    Mario
    <!-- <LoadingSpinner /> -->
  </nav>
</template>
<script lang="ts">
import LoadingSpinner from "./LoadingSpinner.vue";
export default {
  components: { LoadingSpinner },
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
    //
  },
};
</script>

<style lang="scss">
nav {
  border: 1px solid black;
  grid-column: span 4;
}
</style>
