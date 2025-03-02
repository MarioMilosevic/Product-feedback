<template>
  <select
    :name="name"
    :id="name"
    :class="['select', color]"
    :value="modelValue"
    @blur="$emit('blur-event')"
     @change="
      $emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)
    "
  >
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  name: "Select",
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue", 'blur-event'],
};
</script>

<style lang="scss" scoped>
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.select {
  padding: $medium;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;
}

.blue {
  background-color: $terniary-color;
  color: $primary-color;
  font-size: $medium;
  font-weight: 600;
  cursor: pointer;
  
  @include mixins.respond(small) {
    padding: 0rem;
    font-size: $small-font;
  }
}

.white {
  background-color: $primary-color;
}
</style>
