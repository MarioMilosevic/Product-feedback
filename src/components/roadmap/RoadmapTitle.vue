<template>
  <h3 :class="[selected, borderColor]">
    {{ status.name }}
  </h3>
</template>
<script lang="ts">
import { StatusType } from "src/utils/types";
import { PropType } from "vue";

export default {
  props: {
    status: {
      type: Object as PropType<StatusType>,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    borderColor() {
      return this.isSelected ? `${this.status.name}`.toLowerCase() : "";
    },
    selected() {
      return this.isSelected ? "withBorder" : "";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

h3 {
  text-align: center;
  padding: $medium;
  transition: all;
  transition-duration: 100ms;
  margin-bottom: $big;
  cursor: pointer;
  font-weight: 400;
  color: #444;

    @include mixins.respond(small) {
    font-size: $small-font;
  }

  &:active {
    background-color: $primary-color-hover;
  }
}

.withBorder {
  border-bottom-width: 0.3rem;
  border-bottom-style: solid;
}

.planned {
  border-color: $error-color;
}
.in-progress {
  border-color: $terniary-color;
}
.live {
  border-color: $forthiary-color;
}
</style>
