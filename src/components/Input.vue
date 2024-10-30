<template>
  <div class="inputContainer">
    <label :for="name" class="inputContainer__label">
      <h4><slot name="title" /></h4>
      <p class="inputContainer__paragraph"><slot name="description" /></p>
    </label>
    <input
      :type="name"
      class="inputContainer__input"
      v-model="localContent"
      @input="$emit('update-input', localContent)"
    />
  </div>
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
  gap: 1rem;

  &__label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__input {
    padding: 1rem;
    background-color: $primary-color;
    border-radius: $border-radius-medium;
    border: none;
    outline-color: $terniary-color;
  }

  &__paragraph {
    font-size: 12px;
  }
}
</style>
