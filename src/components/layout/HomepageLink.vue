<template>
  <a @click="goBack" :class="['link', positionClass]">
    <span> Back </span>
    <span> &#x2193; </span>
  </a>
</template>

<script lang="ts">
import Icon from "src/components/layout/Icon.vue";
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
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.link {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: $medium;


  @include mixins.respond(small) {
    font-size: $medium;
    font-size: $small-font;
    gap: $small;
  }

  &.absolute {
    position: absolute;
    top: 8%;
    left: 5%;

    @include mixins.respond(small) {
      position: static;
      /* top: 6%;
      left: 0%; */
    }
  }
}
</style>
