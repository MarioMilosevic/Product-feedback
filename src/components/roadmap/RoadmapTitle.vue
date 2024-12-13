<template>
  <p :class="[selected, borderColor]">
    {{ status.name }}
    ({{ count }})
  </p>
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
    count: {
      type: Number,
      default: 0,
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
  mounted() {
    console.log(this.status);
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

p {
  text-align: center;
  padding: $medium;
  transition: all;
  transition-duration: 100ms;
  margin-bottom: $medium;

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
