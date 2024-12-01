<template>
  <div class="singleComment">
    <figure class="singleComment-figure">
      <img :src="comment.Users.image" :alt="comment.Users.image" />
    </figure>
    <div class="singleComment-information">
      <div class="singleComment-information-div">
        <div class="singleComment-information-div-name">
          <h4>{{ comment.Users.fullName }}</h4>
          <h5>{{ comment.Users.username }}</h5>
        </div>
        <button class="singleComment-information-div-button" @click="reply">Reply</button>
      </div>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { CommentType } from "../../types/types";
export default {
  components: {},
  props: {
    comment: {
      type: Object as PropType<CommentType>,
      required: true,
    },
  },
  emits:['reply-event'],
  data() {
    return {};
  },
  methods: {
    reply() {
      console.log(this.comment.Users?.username)
      this.$emit('reply-event', this.comment.Users?.username)
    }
  },
  mounted() {
    console.log(this.comment)
  }
};
</script>

<style lang="scss">
@import "src/scss/variables";

.singleComment {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid black;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &-figure {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      object-fit: cover;
    }
  }

  &-information {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    &-div {
      display: flex;
      justify-content: space-between;

      &-name {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      &-button {
        border: none;
        background-color: $secondary-color;
        cursor: pointer;
        color: $terniary-color;
        font-weight: 600;
      }
    }
  }
}
</style>
