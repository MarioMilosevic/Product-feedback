<template>
  <section class="section">
 
    <div class="section__titleContainer">
      <h4>Planned (2)</h4>
      <p>Ideas prioritized for research</p>
    </div>



   </section>
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

.section {
  border: 1px solid black;
  

  &__titleContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      color: $cancel-color;
    }
  }
  
  
}
</style>