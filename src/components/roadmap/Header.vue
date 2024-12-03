<template>
  <header>
    <h1>
      <slot name="title" />
    </h1>
    <slot name="button" />
  </header>
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

header {
  background-color: $terniary-color;
  padding: 1.5rem;
  border-radius: $border-radius-big;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1/4;

  h1 {
    color: $primary-color;
  }
}
</style>
