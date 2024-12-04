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
.comment {
  display: flex;
  gap: 1rem;
  align-items: center;

  &-length {
    font-weight: 600;
    font-size: 1rem;
  }
}

.small {
  gap: 0.5rem;
}

.medium {
  gap: 1rem;
}
</style>
