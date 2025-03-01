<template>
  <div :class="['comment', gapSize]">
    <Icon>
      <Chat />
    </Icon>
    <span class="comment-length">{{ commentsCount }}</span>
  </div>
</template>

<script lang="ts">
import Icon from "src/components/layout/Icon.vue";
import Chat from "src/icons/Chat.vue";

export default {
  name:"CommentIcon",
  components: {
    Icon,
    Chat,
  },
  props: {
    commentsCount: {
      type: Number,
      required: true,
    },
    gap: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    gapSize() {
      return `${this.gap}`;
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

.comment {
  display: flex;
  gap: $medium;
  align-items: center;

  @include mixins.respond(small) {
    grid-column: 3/4;
  }

  &-length {
    font-weight: 600;
    font-size: $medium;
  }
}

.small {
  gap: $small;
}

.medium {
  gap: $medium;
}
</style>
