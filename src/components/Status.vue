<template>
  <div class="status">
    <p>{{ status }}</p>
    <h3>{{ count }}</h3>
  </div>
</template>
<script lang="ts">
export default {
  components: {},
  props: {
    status: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
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
.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
