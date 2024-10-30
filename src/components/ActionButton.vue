<template>
  <button :class="[buttonColor, buttonSize]" @click="$emit('click-event')">
    <h3>
      <slot />
    </h3>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return ["blue", "purple", "red", "grey"].includes(value);
      },
    },
    size: {
      type: String,
      required: true,
      validator(value) {
        return ["small", "medium", "big"].includes(value);
      },
    },
  },
  computed: {
    buttonColor() {
      return `button-${this.color}`;
    },
    buttonSize() {
      return this.size;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

button {
  cursor: pointer;
  border: none;
  border-radius: $border-radius-medium;
  color: $secondary-color;
}

.small {
  padding: 0.5rem 1rem;
}

.medium {
  padding: 0.75rem 1rem;
}

.big {
  padding: 1rem 2rem;
}

.button-blue {
  background-color: $terniary-color;
}

.button-blue:hover {
  background-color: $terniary-color-hover;
}

.button-purple {
  background-color: $forthiary-color;
}

.button-purple:hover {
  background-color: $forthiary-color-hover;
}

.button-red {
  background-color: $error-color;
}

.button-red:hover {
  background-color: $error-color-hover;
}

.button-grey {
  background-color: $cancel-color;
}

.button-grey:hover {
  background-color: $cancel-color-hover;
}
</style>
