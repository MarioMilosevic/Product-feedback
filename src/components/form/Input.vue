<template>
  <input
    :id="name"
    :type="type"
    :class="['input', inputColor]"
    :placeholder="placeholder"
    :value="modelValue"
    @blur="$emit('blur-event')"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
    "
  />
</template>

<script lang="ts">
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "white",
    },
  },
  emits: ["update:modelValue", 'blur-event'],
  computed: {
    inputColor() {
      return `${this.color}Input`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.input {
  padding: $medium;
  border-radius: $border-radius-medium;
  width: 100%;

  @include mixins.respond(small) {
    font-size: $small-font;
  }
}

.whiteInput {
  background-color: $primary-color;
  outline-color: $terniary-color;
  border: none;

  &:focus {
    &::placeholder {
      color: $terniary-color;
    }
  }
}

.blueInput {
  background-color: $terniary-color;
  outline-color: $primary-color;
  border-color: $primary-color;
  color: $primary-color;

  &::placeholder {
    color: $primary-color;
  }
}
</style>
