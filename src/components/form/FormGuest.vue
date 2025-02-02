<template>
  <div class="links">
    <p>
      {{ accountText }} have an account?
      <router-link :to="{ name: linkText }" class="wrapper__links-link">
        {{ linkText }}
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    linkText: {
      type: String,
      required: true,
    },
  },
  computed: {
    accountText() {
      return this.linkText === "Login" ? "Already" : "Don't";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $small;

  @include mixins.respond(small) {
    font-size: $small-font;
  }

  &-link {
    color: $terniary-color;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: $terniary-color-hover;
    }
  }
}
</style>
