<template>
  <div class="inputContainer">
    <label :for="name">
      <slot />
    </label>
    <input :type="name" />
  </div>
</template>
<script>
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
  },
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

.inputContainer {
  display: flex;
  flex-direction: column;
  background-color: $secondary-color;
  padding: 1rem;
  gap: 1rem;

  input {
    padding: 1rem;
    background-color: $primary-color;
    border-radius: $border-radius-medium;
    border: none;
    outline-color: $terniary-color;
  }
}
</style>
