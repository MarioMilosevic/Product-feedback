<template>
  <aside :class="['aside', isVisible]">
    <Icon size="big">
      <Close />
    </Icon>
    <slot name="categories" />
    <slot name="roadmap" />
  </aside>
</template>
<script lang="ts">
import Close from "src/icons/Close.vue";
import Icon from "src/components/UI/Icon.vue";

export default {
  components: {
    Icon,
    Close,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    isVisible() {
      return this.isSidebarOpen ? "visible" : "hidden";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.aside {
  border: 1px solid black;
  /* width: 50%; */
  position: absolute;
  top: 0%;
  right: 0%;
  transition: all 300ms;
  flex-direction: column;
  display: none;

  @include mixins.respond(small) {
    display: flex;
  }
}

.visible {
  transform: translateX(0%);
  visibility: visible;
}

.hidden {
  transform: translateX(100%);
  visibility: hidden;
}
</style>
