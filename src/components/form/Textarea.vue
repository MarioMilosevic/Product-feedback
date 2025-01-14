<template>
  <textarea
    name="comment"
    id="comment"
    ref="textarea"
    :value="modelValue"
    :maxlength="maxCharacters"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)
    "
  >
  </textarea>
</template>

<script lang="ts">
export default {
  name: "Textarea",
  props: {
    maxCharacters: {
      type: Number,
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      localContent: this.content,
    };
  },
  computed: {
    remainingCharacters() {
      return this.maxCharacters
        ? this.maxCharacters - this.modelValue.length
        : Infinity;
    },
  },
  methods: {
    focusTextarea() {
      (this.$refs.textarea as HTMLTextAreaElement).focus();
    },
  },
  watch: {
    content(newContent) {
      this.localContent = newContent;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/scss/_variables.scss" as *;

textarea {
  width: 100%;
  min-height: $edit-delete;
  padding: $medium;
  border-radius: $border-radius-medium;
  outline-color: $terniary-color;
  line-height: $medium;
}
</style>
