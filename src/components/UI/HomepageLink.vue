<template>
  <a @click="goBack" :class="['link', positionClass]">
    <span> Back </span>
    <span> &#x2193; </span>
  </a>
</template>

<script lang="ts">
import Icon from "src/components/UI/Icon.vue";
export default {
  components: {
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
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
  border-bottom: 1px solid $heading-color;

  &.absolute {
    position: absolute;
    top: 8%;
    left: 5%;
  }
}
</style>
