<template>
  <button :class="buttonClass" @click="$emit('click-event')">
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
        return ["blue", "purple"].includes(value);
      },
    },
  },
  computed: {
    buttonClass() {
      return {
        "button-blue": this.color === "blue",
        "button-purple": this.color === "purple",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

button {
  cursor: pointer;
  padding: 1rem 2rem;
  border: none;
  border-radius: $border-radius-medium;
  color: $secondary-color;
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
</style>
