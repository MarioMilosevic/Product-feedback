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
        <button class="singleComment-information-div-button" @click="reply">
          Reply
        </button>
      </div>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { CommentType } from "src/utils/types";
export default {
  props: {
    comment: {
      type: Object as PropType<CommentType>,
      required: true,
    },
  },
  emits: ["reply-event"],
  methods: {
    reply() {
      this.$emit("reply-event", this.comment.Users?.username);
    },
  },
};
</script>

<style lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.singleComment {
  display: flex;
  align-items: center;
  gap: $medium;
  border-bottom: 1px solid $heading-color;
  padding-bottom: $medium;
  margin-bottom: $medium;

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
    gap: $medium;
    width: 100%;

    &-div {
      display: flex;
      justify-content: space-between;

      &-name {
        display: flex;
        flex-direction: column;
        gap: $small;
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
