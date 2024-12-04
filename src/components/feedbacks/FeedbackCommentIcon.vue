<template>
  <div class="comment">
    <Icon class="size-24" fill="#f0f9ff" size="medium">
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
</style>
