<template>
  <label :for="name" :class="['label', textSize, labelTextColor]">
    <h4 :class="labelTextColor">
      <slot name="title" />
    </h4>
    <p v-if="$slots.description" class="label__paragraph">
      <slot name="description" />
    </p>
  </label>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
    textColor: {
      type: String,
      default: "black",
    },
  },
  computed: {
    textSize() {
      return `${this.size}Label`;
    },
    labelTextColor() {
      return `${this.textColor}Label`;
    },
  },
  mounted() {
    console.log(this.textColor);
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.label {
  display: flex;
  flex-direction: column;
  gap: $small;

  h4 {
    @include mixins.respond(small) {
      font-size: $small-font;
    }
  }

  &__paragraph {
    font-size: $medium-small;
  }
}

.blackLabel {
  color: #444;
}

.whiteLabel {
  color: $secondary-color;
}
</style>
