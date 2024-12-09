<template>
  <button :class="['likeButton', likeClass, displayClass]">
    <Icon class="likeButton-caret" size="small">
      <Caret />
    </Icon>
    <span class="likeButton-number">
      {{ likes }}
    </span>
  </button>
</template>

<script lang="ts">
import Icon from "src/components/UI/Icon.vue";
import Caret from "src/icons/Caret.vue";

export default {
  components: {
    Icon,
    Caret,
  },
  props: {
    likes: {
      type: Number,
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayClass() {
      return `${this.direction}`;
    },
    likeClass() {
      return this.isLiked ? "liked" : "notLiked";
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;


.likeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $small;
  border-radius: $border-radius-medium;
  border: none;
  padding: $small;
  cursor: pointer;

   @include mixins.respond(small) {
    grid-column: 1/2;
    }


  &:active {
    transform: scale(1.1);
    transition-duration: 100ms;
  }

  &-caret {
    color: $terniary-color;
  }

  &-number {
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.liked {
  background-color: $primary-color-hover;
}

.notLiked {
  background-color: $primary-color;
  &:hover {
    background-color: $primary-color-hover;
  }
}

.column {
  flex-direction: column;
}

.row {
  flex-direction: row;
}
</style>
