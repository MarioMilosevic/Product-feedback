<template>
  <button :class="[size, color, 'button']" :type="type">
    <slot />
  </button>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  name:"ActionButton",
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
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.button {
  cursor: pointer;
  border: none;
  border-radius: $border-radius-medium;
  color: $secondary-color;
  font-size: $medium;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $medium;
  transition: all 0.3s;

    @include mixins.respond(small) {
    font-size: $small-font;
  }

}

.small {
  padding: $small $medium;
}

.medium {
  padding: $medium-small $medium;
}

.big {
  padding: $medium $very-big;
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
