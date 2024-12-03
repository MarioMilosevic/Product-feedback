<template>
  <li class="li">
    <Status status="Planned" />
    <div class="li__textContainer">
      <h3>More comprehensive reports</h3>
      <p>It would be great to see a more detailed breakdown of solutions</p>
    </div>
    <div class="li__icons">
        <Category category="Bug" />
    </div>
  </li>
</template>

<script lang="ts">
import Status from "src/components/UI/Status.vue";
import Category from "src/components/UI/Category.vue";
export default {
  components: {
    Status,
    Category,
  },
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

.li {
  background-color: $secondary-color;
  padding: 1rem;
  border-radius: $border-radius-medium;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__textContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
