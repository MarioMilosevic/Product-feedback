<template>
  <div :class="['formBlock', direction, color]">
    <slot name="label" />
    <slot />
    <p class="error">
      <slot name="error" />
    </p>
  </div>
</template>
<script lang="ts">
export default {
  components: {},
  props: {
    direction: {
      type: String,
      default: "column",
    },
    color: {
      type: String,
      default: "white",
    },
  },
  computed: {},
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;


.formBlock {
  display: flex;
  background-color: $secondary-color;
  gap: 1rem;
  position: relative;
  border-radius: $border-radius-medium;
}

.error {
  position: absolute;
  bottom: -1.25rem;
  left: 0%;
  color: $error-color;
  font-size: 0.8rem;
}

.column {
  flex-direction: column;
}

.row {
  flex-direction: row;
  align-items: center;
}

.white {
  background-color: $secondary-color;
}

.blue {
  background-color: $terniary-color;
}
</style>
