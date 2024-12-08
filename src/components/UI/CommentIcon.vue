<template>
  <div :class="['comment', gapSize]">
    <Icon>
      <Chat />
    </Icon>
    <span class="comment-length">{{ commentsCount }}</span>
  </div>
</template>

<script lang="ts">
import Icon from "src/components/UI/Icon.vue";
import Chat from "src/icons/Chat.vue";

export default {
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
@use "src/scss/_variables.scss" as *;


.comment {
  display: flex;
  gap: $medium-gap;
  align-items: center;

  &-length {
    font-weight: 600;
    font-size: $medium-gap;
  }
}

.small {
  gap: $small-gap;
}

.medium {
  gap: $medium-gap;
}
</style>
