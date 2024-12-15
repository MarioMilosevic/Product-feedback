<template>
  <div class="loading">
    <LoadingSpinner :style="{ margin: '0 auto' }" v-if="isObserving" />
    <Footer v-else />
  </div>
</template>
<script lang="ts">
import Footer from "src/components/UI/Footer.vue";
import LoadingSpinner from "src/components/UI/LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
    Footer,
  },
  props: {
    isObserving: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_mixins" as mixins;
@use "src/scss/_variables" as *;

.loading {
  display: flex;
  flex-direction: column;
  gap: $very-big;
}
</style>
