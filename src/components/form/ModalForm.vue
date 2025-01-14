<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <Icon class="overlay__modal-headerIcon">
        <Edit v-if="feedback" />
        <Add v-else />
      </Icon>
      <h1>{{ title }}</h1>
      <Icon
        class="overlay__modal-icon"
        size="big"
        @click="$emit('close-modal')"
      >
        <Close />
      </Icon>
      <form class="overlay__modal-form" @submit.prevent="submitHandler">
        <FormBlock>
          <template #label>
            <Label name="title">
              <template #title>Feedback Title</template>
              <template #description
                >Add a short, descriptive headline</template
              >
            </Label>
          </template>
          <template #default>
            <Input name="title" type="text" v-model="singleFeedback.title" />
          </template>
          <template #error v-if="errors.title">
            {{ errors.title }}
          </template>
        </FormBlock>

        <FormBlock>
          <template #label>
            <Label name="category">
              <template #title>Category</template>
              <template #description
                >Choose a category for your feedback</template
              >
            </Label>
          </template>
          <template #default>
            <Select
              color="white"
              name="category"
              :options="getCategoryNames"
              v-model="singleFeedback.category.name"
            >
            </Select>
          </template>
          <template #error v-if="errors.category">
            {{ errors.category }}
          </template>
        </FormBlock>
        <FormBlock v-if="feedback">
          <template #label>
            <Label name="status">
              <template #title>Update Status</template>
              <template #description>Change feature state</template>
            </Label>
          </template>
          <template #default>
            <Select
              color="white"
              name="status"
              :options="getStatusNames"
              v-model="singleFeedback.status.name"
            >
              <template #title> Category </template>
              <template #description>
                Choose a category for your feedback
              </template>
            </Select>
          </template>
          <template #error v-if="errors.status">
            {{ errors.status }}
          </template>
        </FormBlock>
        <FormBlock>
          <template #label>
            <Label name="status">
              <template #title>Feedback detail</template>
              <template #description
                >Include any specific comments on what should be improved,
                added, etc.</template
              >
            </Label>
          </template>
          <template #default>
            <Textarea
              v-model="singleFeedback.description"
            />
          </template>
          <template #error v-if="errors.description">
            {{ errors.description }}
          </template>
        </FormBlock>
        <div
          class="overlay__modal-form-buttonContainer"
          :class="[feedback ? 'visible' : 'notVisible']"
        >
          <ActionButton
            v-if="singleFeedback.id"
            color="red"
            size="medium"
            @click="deleteHandler(singleFeedback.id)"
          >
            Delete
          </ActionButton>
          <div class="overlay__modal-form-buttonContainer-div">
            <ActionButton
              color="grey"
              size="medium"
              @click="$emit('close-modal')"
            >
              Cancel
            </ActionButton>
            <ActionButton color="purple" size="medium" type="submit">
              Save Changes
            </ActionButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Select from "src/components/form/Select.vue";
import Icon from "src/components/layout/Icon.vue";
import Textarea from "src/components/form/Textarea.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import Label from "src/components/form/Label.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import Input from "src/components/form/Input.vue";
import { modalFormSchema } from "src/validation/modalFormSchema";
import { FeedbackType, SingleFeedbackType } from "src/utils/types";
import { PropType } from "vue";
import { emptyFeedback } from "src/utils/constants";
import {
  addFeedback,
  deleteFeedback,
  editFeedback,
} from "src/api/FeedbacksApi";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import { showToast } from "src/utils/toastify";
import Add from "src/icons/Add.vue";
import Edit from "src/icons/Edit.vue";
import Close from "src/icons/Close.vue";
import { formWatch } from "src/api/UsersApi";

export default {
  name: "ModalForm",
  components: {
    Select,
    Icon,
    Textarea,
    ActionButton,
    FormBlock,
    Label,
    Input,
    Add,
    Edit,
    Close,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    feedback: {
      type: Object as PropType<FeedbackType | SingleFeedbackType>,
      default: null,
    },
  },
  emits: ["close-modal", "update-feedback"],
  data() {
    return {
      singleFeedback: this.feedback
        ? { ...this.feedback }
        : { ...emptyFeedback },
      errors: {} as Record<string, string>,
    };
  },
  computed: {
    ...mapState(useFeedbackStore, [
      "categories",
      "statusOptions",
      "getStatusObjects",
      "getStatusNames",
      "getCategoryObjects",
      "getCategoryNames",
    ]),
    title() {
      return this.feedback ? "Edit Feedback" : "Create New Feedback";
    },
    submitHandler() {
      return this.feedback ? this.submitEditFeedback : this.submitNewFeedback;
    },
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "addFeedbackToStore",
      "deleteFeedbackFromStore",
      "editFeedbackFromStore",
    ]),
    resetFeedback() {
      this.singleFeedback = { ...emptyFeedback, category: { name: "" } };
    },
    updateTitle(newTitle: string) {
      this.singleFeedback.title = newTitle;
    },
    
    async submitNewFeedback() {
      const validation = modalFormSchema.safeParse(this.singleFeedback);
      if (validation.success) {
        try {
          const data = await addFeedback(this.singleFeedback as FeedbackType);
          if (data && data.id) {
            this.addFeedbackToStore(data);
            this.$emit("close-modal");
            this.resetFeedback();
            showToast("New Feedback added");
          }
        } catch (error) {
          console.error("Error adding feedback", error);
          showToast("Error adding feedback", "error");
        }
      } else {
        this.errors = validation.error.errors.reduce((acc, err) => {
          const key = err.path.length > 0 ? err.path[0] : "";
          acc[key] = err.message;
          return acc;
        }, {} as Record<string, string>);
      }
    },
    async deleteHandler(id: number) {
      if (!this.feedback || !this.feedback.id) return;
      const data = await deleteFeedback(id);
      if (data.id) {
        showToast("Deleted feedback successfully");
        this.$emit("close-modal");
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } else {
        showToast("Something went wrong, please try again", "error");
      }
    },
    async submitEditFeedback() {
      const validation = modalFormSchema.safeParse(this.singleFeedback);
      if (validation.success) {
        if (this.feedback.id) {
          const data = await editFeedback(
            this.singleFeedback as SingleFeedbackType
          );
          this.singleFeedback = data;
          this.$emit("update-feedback", data);
          this.$emit("close-modal");
          showToast("Feedback updated sucessfully");
        }
      } else {
        this.errors = validation.error.errors.reduce((acc, err) => {
          const key = err.path.length > 0 ? err.path[0] : "";
          acc[key] = err.message;
          return acc;
        }, {} as Record<string, string>);
      }
    },
  },
  watch: {
    singleFeedback: {
      deep: true,
      handler() {
        formWatch(this.errors);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.overlay {
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.6);

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
    padding: $very-big;
    display: flex;
    flex-direction: column;
    gap: $medium;

    &-form {
      background-color: $secondary-color;
      padding: $medium;
      display: flex;
      flex-direction: column;
      gap: $very-big;

      &-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      &__paragraph {
        font-size: 12px;
      }

      &-buttonContainer {
        margin-top: $medium;
        display: flex;

        &-div {
          display: flex;
          gap: $medium;
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

.visible {
  justify-content: space-between;
}

.notVisible {
  justify-content: flex-end;
}

.error {
  color: $error-color;
  font-size: $small-font;
}
</style>
