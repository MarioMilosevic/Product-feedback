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
  components: {},
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


.input {
  padding: 1rem;
  background-color: $primary-color;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;

  &:focus::placeholder {
    color: $terniary-color;
  }
}
</style>
