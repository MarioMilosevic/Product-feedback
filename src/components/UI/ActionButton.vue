<template>
  <button :class="[size, color, 'button']" :type="type">
    <slot />
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
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.button {
  cursor: pointer;
  border: none;
  border-radius: $border-radius-medium;
  color: $secondary-color;
  font-weight: 500;
  font-size: $medium-gap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $medium-gap;
  transition: all 0.3s;
}

.small {
  padding: $small-gap $medium-gap;
}

.medium {
  padding: 0.75rem $medium-gap;
}

.big {
  padding: $medium-gap $very-big-gap;
}

.blue {
  background-color: $terniary-color;

  &:hover {
    background-color: $terniary-color-hover;
  }
}

.purple {
  background-color: $forthiary-color;

  &:hover {
    background-color: $forthiary-color-hover;
  }
}

.red {
  background-color: $error-color;

  &:hover {
    background-color: $error-color-hover;
  }
}

.grey {
  background-color: $cancel-color;

  &:hover {
    background-color: $cancel-color-hover;
  }
}

.white {
  background-color: $primary-color-hover;
  color: $cancel-color-hover;
  border: 1px solid $cancel-color-hover;
}
</style>
