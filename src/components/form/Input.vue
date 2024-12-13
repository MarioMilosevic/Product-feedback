<template>
  <input
    :id="name"
    :type="type"
    :class="['input', inputColor]"
    :placeholder="placeholder"
    v-model="localContent"
    @input="$emit('update-input', localContent)"
  />
</template>

<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    content: {
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
  emits: ["update-input"],
  computed: {
    inputColor() {
      return `${this.color}Input`;
    },
  },
  data() {
    return {
      localContent: this.content,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

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
