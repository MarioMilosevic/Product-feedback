<template>
  <input
    :id="name"
    :type="type"
    class="input"
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
@import "src/scss/_variables.scss";

.input {
  padding: 1rem;
  background-color: $primary-color;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;
}
</style>
