<template>
  <select
    :name="name"
    :id="name"
    :class="['select', color]"
    v-model="localContent"
    @change="$emit('update-select', localContent)"
    >
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  emits: ["update-select"],
  data() {
    return {
      localContent: this.content,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
.select {
  padding: 1rem;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;
}

.blue {
  background-color: $terniary-color;
  color: $primary-color;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.white {
  background-color: $primary-color;
}
</style>
