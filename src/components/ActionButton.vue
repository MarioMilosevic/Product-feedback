    <!-- @click="$emit('click-event')" -->

<template>
  <button
    :class="[buttonColor, buttonSize]"
    :type="type"
  >
    <h3>
      <slot />
    </h3>
  </button>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset" | undefined>,
      default: "button",
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

  &:hover {
    background-color: $terniary-color-hover;
  }
}

.button-purple {
  background-color: $forthiary-color;

  &:hover {
    background-color: $forthiary-color-hover;
  }
}

.button-red {
  background-color: $error-color;

  &:hover {
    background-color: $error-color-hover;
  }
}

.button-grey {
  background-color: $cancel-color;

  &:hover {
    background-color: $cancel-color-hover;
  }
}
</style>
