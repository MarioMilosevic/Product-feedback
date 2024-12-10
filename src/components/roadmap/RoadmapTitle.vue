<template>
  <p :class="[selected, borderColor]">
    {{ title }}
  </p>
</template>
<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    borderColor() {
      return this.isSelected ? `${this.title}`.toLowerCase() : "";
    },
    selected() {
      return this.isSelected ? "withBorder" : "";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

p {
  text-align: center;
  padding: 1rem;
}

.withBorder {
  border-bottom-width: 0.3rem;
  border-bottom-style: solid;
}

.planned {
  border-color: $error-color;
}
.in-progress {
  border-color: $terniary-color;
}
.live {
  border-color: $forthiary-color;
}
</style>
