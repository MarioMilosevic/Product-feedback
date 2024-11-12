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
            <Input
              name="title"
              type="text"
              :content="singleFeedback.title"
              @update-input="updateTitle"
            />
          </template>
        </FormBlock>
        <span v-if="errors.title" class="error">{{ errors.title }}</span>

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
              @update-select="updateCategory"
              :content="singleFeedback.category.name"
            >
            </Select>
          </template>
        </FormBlock>
        <span v-if="errors.category" class="error">{{ errors.category }}</span>

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
              @update-select="updateStatus"
              :content="singleFeedback.status.name"
            >
              <template #title> Category </template>
              <template #description>
                Choose a category for your feedback
              </template>
            </Select>
          </template>
        </FormBlock>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>

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
              :content="singleFeedback.description"
              @update-textarea="updateTextarea"
            />
          </template>
        </FormBlock>
        <span v-if="errors.description" class="error">{{
          errors.description
        }}</span>

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
import Select from "src/components/Select.vue";
import Icon from "src/components/Icon.vue";
import Textarea from "src/components/Textarea.vue";
import ActionButton from "src/components/ActionButton.vue";
import Label from "src/components/Label.vue";
import FormBlock from "src/components/FormBlock.vue";
import Input from "src/components/Input.vue";
import { modalFormSchema } from "src/validation/modalFormSchema";
import { FeedbackType } from "src/types/types.ts";
import { PropType } from "vue";
import { emptyFeedback } from "src/utils/constants";
import { addFeedback, deleteFeedback, editFeedback } from "src/api/FeedbacksApi";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions, mapState } from "pinia";
import { showToast } from "src/utils/toastify";
import Add from "src/icons/Add.vue";
import Edit from "src/icons/Edit.vue";
import Close from "src/icons/Close.vue";

export default {
  name: "Modal",
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
      type: Object as PropType<FeedbackType>,
      default: null,
    },
  },
  emits: ["close-modal"],
  data() {
    return {
      singleFeedback: this.feedback || { ...emptyFeedback },
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
      return this.feedback ? this.submitEditFeedback : this.submitNewFeedback
    }
  },
  mounted() {
    console.log(this.feedback)
    console.log(this.getStatusNames)
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "addFeedbackToStore",
      "deleteFeedbackFromStore",
    ]),
    resetFeedback() {
      this.singleFeedback = {...emptyFeedback} as FeedbackType;
    },
    updateTitle(newTitle: string) {
      this.singleFeedback.title = newTitle;
    },
    updateCategory(newCategory: string) {
      this.singleFeedback.category.name = newCategory;
    },
    updateStatus(newStatus: string) {
      this.singleFeedback.status.name = newStatus;
    },
    updateTextarea(newText: string) {
      this.singleFeedback.description = newText;
    },
    async submitNewFeedback() {
      const validation = modalFormSchema.safeParse(this.singleFeedback);
      if (validation.success) {
        try {
          const data = await addFeedback(this.singleFeedback);
          if (data && data.id) {
            this.$emit("close-modal");
            this.addFeedbackToStore(data);
            this.resetFeedback();
            this.singleFeedback = emptyFeedback as FeedbackType;
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
      console.log('edit feedback')
      // const data = await editFeedback(this.feedback.id, this.singleFeedback)
    }
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
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-form {
      background-color: $secondary-color;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1.3rem;

      &-text {
        display: flex;
        flex-direction: column;
        gap: 4px;

        /* p {
          font-size: 12px;
        } */
      }

      &__paragraph {
        font-size: 12px;
      }

      &-buttonContainer {
        margin-top: 1rem;
        display: flex;

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

.visible {
  justify-content: space-between;
}

.notVisible {
  justify-content: flex-end;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
