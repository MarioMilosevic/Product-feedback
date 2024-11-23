<template>
  <form :class="formClass">
    <slot name="fullName" />
    <slot name="userName" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword" />
    <slot name="image" />
  </form>
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
    formClass() {
      return `${this.display}`;
    },
  },
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
