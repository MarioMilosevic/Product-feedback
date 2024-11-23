<template>
   <button>
    <slot/>
   </button>
</template>
<script lang='ts'>
export default {
  components: {},
  props: {},
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

<style scoped lang="scss">
@import "src/scss/_variables.scss";

label {
padding: 1rem;
border-radius: $border-radius-medium;
background-color: $primary-color;
border: none;

  outline-color: $terniary-color;

  &:focus::placeholder {
    color: $terniary-color;
  }
}

</style>