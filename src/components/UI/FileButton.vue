<template>
  <button>
    <slot />
  </button>
</template>
<script lang="ts">
export default {
  components: {},
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

<style scoped lang="scss">
@import "src/scss/_variables.scss";

button {
  padding: 1rem;
  border-radius: $border-radius-medium;
  background-color: $primary-color;
  border: none;
  text-align: left;
  cursor: pointer;
  color: $image-button-color;
  font-weight: 400;
}
</style>
