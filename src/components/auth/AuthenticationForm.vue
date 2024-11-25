<template>
  <div :class="divClass">
    <slot name="fullName" />
    <slot name="username" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword" />
    <slot name="image" />
    <div class="buttons">
      <slot name="submit" />
      <slot name="homepage" />
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
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.buttons {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
