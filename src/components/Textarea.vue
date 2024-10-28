<template>
  <form class="-form">
    <textarea
      name="comment"
      id="comment"
      class="form__textarea"
      v-model="content"
    >
    <div>
      <p>{{ maxCharachters }} characters left</p>
      
    </div>
    </textarea>

  </form>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      content: "",
      maxCharachters:225
    };
  },
  computed: {
    //
  },
  mounted() {
    console.log(this.content);
    //
  },
  methods: {
    //
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.form {
  width: 100%;
  &__textarea {
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    border-radius: $border-radius-medium;
    outline-color: $terniary-color;
  }
}
</style>
