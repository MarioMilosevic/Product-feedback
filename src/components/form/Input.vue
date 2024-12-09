<template>
  <input
    :id="name"
    :type="type"
    class="input"
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
  },
  emits: ["update-input"],
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
  padding: $medium-gap;
  background-color: $primary-color;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;
  width: 100%;

    @include mixins.respond(small) {
    font-size: $small-font;
  }

  &:focus::placeholder {
    color: $terniary-color;
  }
}
</style>
