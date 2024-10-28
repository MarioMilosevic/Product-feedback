<template>
  <form class="form">
    <textarea
      name="comment"
      id="comment"
      class="form__textarea"
      v-model="content"
      :maxlength="maxCharachters"
    >
    </textarea>
    <div class="form__characters">
      <p>{{ remainingCharacters }} characters left</p>
      <ActionButton color="purple">
        <h4>Post Comment</h4>
      </ActionButton>
    </div>
  </form>
</template>
<script>
import ActionButton from "./ActionButton.vue";

export default {
  components: { ActionButton },
  props: {},
  data() {
    return {
      content: "",
      maxCharachters: 225,
    };
  },
  computed: {
    remainingCharacters() {
      return this.maxCharachters - this.content.length
    }
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
