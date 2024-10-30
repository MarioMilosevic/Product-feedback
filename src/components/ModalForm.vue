<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <Icon class="overlay__modal-headerIcon">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </Icon>
      <h1>Edit Feedback</h1>
      <Icon
        class="overlay__modal-icon"
        width="30px"
        height="30px"
        @click="$emit('close-modal')"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </Icon>

      <form class="overlay__modal-form">
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
        <h4>Feedback Detail</h4>
        <p class="overlay__modal-form__para">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <Textarea />
        <div class="overlay__modal-form-buttonContainer">
          <ActionButton color="red" size="medium"> Delete </ActionButton>
          <div class="overlay__modal-form-buttonContainer-div">
            <ActionButton color="grey" size="medium"> Cancel </ActionButton>
            <ActionButton color="purple" size="medium">
              Save Changes
            </ActionButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Input from "src/components/Input.vue";
import Select from "src/components/Select.vue";
import Icon from "src/components/Icon.vue";
import Textarea from "src/components/Textarea.vue";
import ActionButton from "src/components/ActionButton.vue";

export default {
  name: "Modal",
  components: {
    Input,
    Select,
    Icon,
    Textarea,
    ActionButton,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-modal"],
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
    max-width: 600px;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: $secondary-color;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-form {
      background-color: $secondary-color;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &__para {
        font-size: 12px;
      }

      &-buttonContainer {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;

        &-div {
          display: flex;
          gap: 1rem;
        }
      }
    }

    &-headerIcon {
      position: absolute;
      top: -3%;
      left: 15%;
      width: 50px;
      height: 50px;
    }

    &-icon {
      position: absolute;
      top: 5%;
      right: 5%;
      cursor: pointer;
    }
  }
}
</style>
