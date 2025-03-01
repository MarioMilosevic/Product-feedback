<template>
  <div :class="['formBlock', direction, color]">
    <slot name="label" />
    <slot />
    <p class="error">
      <slot name="error" />
    </p>
    <Icon class="formBlock__icon" v-if="hasIcon">
      <Search />
    </Icon>
  </div>
</template>
<script lang="ts">
import Search from "src/icons/Search.vue";
import Icon from "src/components/layout/Icon.vue";

export default {
  name:'FormBlock',
  components: {
    Icon,
    Search,
  },
  props: {
    direction: {
      type: String,
      default: "column",
    },
    color: {
      type: String,
      default: "white",
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.formBlock {
  display: flex;
  background-color: $secondary-color;
  gap: $medium;
  position: relative;
  border-radius: $border-radius-medium;
  position: relative;

  @include mixins.respond(small) {
    gap: $small;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translateY(-50%);
  }
}

.error {
  position: absolute;
  bottom: -1.25rem;
  left: 0%;
  color: $error-color;
  font-size: 0.8rem;
}

.column {
  flex-direction: column;
}

.row {
  flex-direction: row;
  align-items: center;
}

.white {
  background-color: $secondary-color;
}

.blue {
  background-color: $terniary-color;
}
</style>
