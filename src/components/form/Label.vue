<template>
  <label :for="name" class="label">
    <h4>
      <slot name="title" />
    </h4>
    <p v-if="$slots.description" class="label__paragraph">
      <slot name="description" />
    </p>
  </label>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;


.label {
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    color: $secondary-color;
  }

  &__paragraph {
    font-size: 12px;
  }
}
</style>
