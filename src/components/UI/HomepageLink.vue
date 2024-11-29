<template>
  <router-link :to="{ name: 'Home' }" :class="['link', positionClass]">
    <span> Back </span>
    <Icon size="small">
      <ArrowDown />
    </Icon>
  </router-link>
</template>

<script lang="ts">
import ArrowDown from "src/icons/ArrowDown.vue";
import Icon from "src/components/UI/Icon.vue";
export default {
  components: {
    ArrowDown,
    Icon,
  },
  props: {
    position: {
      type: String,
      default: "static",
    },
  },
  computed: {
    positionClass() {
      return this.position;
    },
  },
  mounted() {
    console.log(this.position);
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.link {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  &:hover {
    border-bottom: 1px solid $cancel-color;
    padding-bottom: 0.1rem;
  }

  &.absolute {
    position: absolute;
    top: 8%;
    left: 5%;
  }
}
</style>
