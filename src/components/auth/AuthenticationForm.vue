<template>
  <div :class="divClass">
    <slot name="fullName" />
    <slot name="username" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword" />
    <slot name="image" />
    <div :class="buttonClass">
      <slot name="submit" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    display: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    divClass() {
      return `${this.display}`;
    },
    buttonClass() {
      return `${this.display}__button`;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__button {
    width: 100%;
    display: flex;

    & > * {
      width: 100%;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  &__button {
    grid-column: span 2;
    display: flex;
    justify-content: center;

    & > * {
      width: 50%;
    }
  }
}
</style>
