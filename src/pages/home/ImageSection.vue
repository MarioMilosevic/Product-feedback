<template>
  <section class="section">
    <h3>Feedback Board</h3>
    <Icon class="section__icon" size="big" @click="$emit('sidebar-event')">
      <Hamburger />
    </Icon>
  </section>
</template>

<script @lang="ts">
import Icon from "src/components/layout/Icon.vue";
import Hamburger from "src/icons/Hamburger.vue";

export default {
  name:"ImageSection",
  components: {
    Icon,
    Hamburger,
  },
  emits:['sidebar-event']
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins" as mixins;

.section {
  width: 100%;
  height: $feedbackHeight;
  border-radius: $border-radius-big;
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @include mixins.respond(small) {
    height: 5rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 $medium;
  }
  @include mixins.respond(medium) {
    height: 100%;
  }

  h3 {
    color: $primary-color;
  }

  &__icon {
    display: none;
    position: absolute;
    top: 0%;
    right: 0%;

    @include mixins.respond(small) {
      display: block;
          position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    z-index: 2;
    color: $secondary-color;
    }
  }
}
</style>
