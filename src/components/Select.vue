<template>
  <div class="selectContainer">
    <label :for="name" class="selectContainer__label">
      <h4><slot name="title" /></h4>
      <p class="selectContainer__paragraph"><slot name="description" /></p>
    </label>
    <select
      :name="name"
      :id="name"
      class="selectContainer__select"
      v-model="localContent"
      @change="$emit('update-select', localContent)"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { categoryOptions, statusOptions } from "src/utils/constants";

export default {
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return ["category", "status"].includes(value);
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localContent: this.content,
    };
  },
  computed: {
    options() {
      return this.name === "category" ? categoryOptions : statusOptions;
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.selectContainer {
  display: flex;
  flex-direction: column;
  background-color: $secondary-color;
  border-radius: $border-radius-medium;
  gap: 1rem;

  &__label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__select {
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
