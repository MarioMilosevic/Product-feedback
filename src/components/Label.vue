<template>
  <label :for="name"></label>
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
label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
