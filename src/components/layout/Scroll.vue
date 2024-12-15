<template>
  <slot name="loadingRef" />
  <div class="ref">
    <LoadingSpinner
      :style="{ margin: '0 auto', gridColumn: '2/3' }"
      v-if="isObserving"
    />
    <Footer v-else />
  </div>
</template>
<script lang="ts">
import Footer from "src/components/layout/Footer.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";

export default {
  name:"Scroll",
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

.ref {
  grid-column: 2/3;
  display: flex;
  justify-content: center;
}
</style>
