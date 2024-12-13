<template>
  <label :for="name" :class="['label', textSize]">
    <h4>
      <slot name="title" />
    </h4>
    <p v-if="$slots.description" class="label__paragraph">
      <slot name="description" />
    </p>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    textSize() {
      return `${this.size}Label`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.label {
  display: flex;
  flex-direction: column;
  gap: $small;

  h4 {
    @include mixins.respond(small) {
      font-size: $small-font;
    }
  }

  &__paragraph {
    font-size: $medium-small;
  }
}
</style>
