<template>
  <div v-if="isModalOpen" class="overlay">
    <div class="overlay__modal">
      <Icon class="overlay__modal-headerIcon">
        <path
          v-if="feedback"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </Icon>

      <h1>{{ title }}</h1>
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

      <form class="overlay__modal-form" @submit.prevent="handleSubmit">
        <Input
          type="text"
          name="title"
          :content="singleFeedback.title"
          @update-input="updateTitle"
        >
          <template v-slot:title> FeedbackTitle </template>
          <template v-slot:description>
            Add a short, descriptive headline
          </template>
        </Input>
        <span v-if="errors.title" class="error">{{ errors.title }}</span>

        <Select
          name="category"
          :content="singleFeedback.category"
          @update-select="updateCategory"
        >
          <template v-slot:title> Category </template>
          <template v-slot:description>
            Choose a category for your feedback
          </template>
        </Select>
        <span v-if="errors.category" class="error">{{ errors.category }}</span>

        <Select
          v-if="feedback"
          name="status"
          :content="singleFeedback.status"
          @update-select="updateStatus"
        >
          <template v-slot:title> Update Status </template>
          <template v-slot:description> Change feature state </template>
        </Select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>

        <div class="overlay__modal-form-text">
          <h4>Feedback Detail</h4>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
        </div>
        <Textarea
          :content="singleFeedback.description"
          @update-textarea="updateTextarea"
        />
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
              @click.prevent="$emit('close-modal')"
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
import Input from "src/components/Input.vue";
import Select from "src/components/Select.vue";
import Icon from "src/components/Icon.vue";
import Textarea from "src/components/Textarea.vue";
import ActionButton from "src/components/ActionButton.vue";
import { modalFormSchema } from "src/validation/modalFormSchema";
import { FeedbackType } from "src/types/types.ts";
import { PropType } from "vue";
import { emptyFeedback } from "src/utils/constants";
import { addFeedback, deleteFeedback } from "src/api/FeedbacksApi";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { mapActions } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
    feedback: {
      type: Object as PropType<FeedbackType>,
      default: null,
    },
  },
  emits: ["close-modal"],
  data() {
    return {
      singleFeedback:
        (this.feedback as FeedbackType) || (emptyFeedback as FeedbackType),
      errors: {} as Record<string, string>,
    };
  },
  computed: {
    title() {
      return this.feedback ? "Edit Feedback" : "Create New Feedback";
    },
  },
  mounted() {
    //
  },
  methods: {
    ...mapActions(useFeedbackStore, [
      "addFeedbackToStore",
      "deleteFeedbackFromStore",
    ]),
    updateTitle(newTitle: string) {
      this.singleFeedback.title = newTitle;
    },
    updateCategory(newCategory: string) {
      this.singleFeedback.category = newCategory;
    },
    updateStatus(newStatus: string) {
      this.singleFeedback.status = newStatus;
    },
    updateTextarea(newText: string) {
      this.singleFeedback.description = newText;
    },
    async handleSubmit() {
      const validation = modalFormSchema.safeParse(this.singleFeedback);
      if (validation.success) {
        try {
          const data = await addFeedback(this.singleFeedback);
          const newFeedback = { ...data, Comments: [] };
          if (newFeedback.id) {
            this.$emit("close-modal");
            this.addFeedbackToStore(newFeedback);
            this.singleFeedback = emptyFeedback as FeedbackType;
            toast.success("New Feedback added !", {
               position: toast.POSITION.TOP_CENTER,
            });
          }
        } catch (error) {
          console.error("Error adding feedback", error);
          toast.error("Error adding feedback", {
            position:toast.POSITION.TOP_CENTER
          });
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
        this.$router.push("/");
      }
    },
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

        p {
          font-size: 12px;
        }
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
