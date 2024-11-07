<template>
  <div class="formBlock">
    <slot name="label"/>
    <slot></slot>
  </div>
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

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.formBlock {
  display: flex;
  flex-direction: column;
  background-color: $secondary-color;
  gap: 1rem;
}
</style>
