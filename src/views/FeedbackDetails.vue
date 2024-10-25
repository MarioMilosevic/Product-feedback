<template>
    <p>The feedback id is {{ id }}</p>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
      return {
        id: this.$route.params.id
    };
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