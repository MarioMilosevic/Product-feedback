<template>
    <textarea
      name="comment"
      id="comment"
      ref="textarea"
      v-model="localContent"
      :maxlength="maxCharacters"
      @input="$emit('update-textarea', localContent)"
    >
    </textarea>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    maxCharacters: {
      type: Number,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  emits: ["update-textarea"],
  data() {
    return {
      localContent: this.content,
    };
  },
  computed: {
    remainingCharacters() {
      return this.maxCharacters
        ? this.maxCharacters - this.content.length
        : Infinity;
    },
  },
  methods: {
    focusTextarea() {
      (this.$refs.textarea as HTMLTextAreaElement).focus()
    }
  },
  watch: {
    content(newContent) {
      this.localContent = newContent
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";
  textarea {
    width: 100%;
    min-height: 6.25rem;
    padding: 1rem;
    border-radius: $border-radius-medium;
    outline-color: $terniary-color;
    line-height: 1rem;
  }
</style>
