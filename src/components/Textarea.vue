<template>
  <form class="form">
    <textarea
      name="comment"
      id="comment"
      class="form__textarea"
      v-model="localContent"
      :maxlength="maxCharacters || null"
      @input="$emit('update-content', localContent)"
    >
    </textarea>
  </form>
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
      required: false,
      default: "",
    },
  },
  emits: ["update-content"],
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

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__textarea {
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    border-radius: $border-radius-medium;
    outline-color: $terniary-color;
    line-height: 15px;
  }

  &__characters {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
