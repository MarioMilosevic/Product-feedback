<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <h1>Edit Feedback</h1>
      <Icon class="overlay__modal-icon" width="30px" height="30px">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </Icon>
      <form action="">
        <h5></h5>
        <Input type="text" name="title">
          <template v-slot:title> FeedbackTitle </template>
          <template v-slot:description>
            Add a short, descriptive headline
          </template>
        </Input>
        <Select name="category">
          <template v-slot:title> Category </template>
          <template v-slot:description>
            Choose a category for your feedback
          </template>
        </Select>
        <Select name="status">
          <template v-slot:title> Update Status </template>
          <template v-slot:description> Change feature state </template>
        </Select>
      </form>
    </div>
  </div>
</template>
<script>
import Input from "src/components/Input.vue";
import Select from "src/components/Select.vue";
import Icon from "src/components/Icon.vue";

export default {
  name: "Modal",
  components: {
    Input,
    Select,
    Icon,
  },
  props: {
    isModalOpen: {
      type: Boolean,
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
    console.log(this.isModalOpen);
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";

.overlay {
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  opacity: 1;

  &__modal {
    border-radius: $border-radius-big;
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background-color: $secondary-color;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 1rem;

    &-icon {
      position: absolute;
      top: 5%;
      right: 5%;
      cursor: pointer;
    }
  }
}
</style>
