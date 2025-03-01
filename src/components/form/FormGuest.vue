<template>
  <div class="links">
    <p>
      {{ accountText }} have an account?
      <router-link :to="{ name: linkText }" class="links-link">
        {{ linkText }}
      </router-link>
    </p>
    <p v-if="linkText === 'Sign up'">
      Or,
      <span class="links-link" @click="$emit('guest-event')"> log in as guest </span>
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
  emits:['guest-event'],
  computed: {
    accountText() {
      return this.linkText === "Login" ? "Already" : "Don't";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

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
