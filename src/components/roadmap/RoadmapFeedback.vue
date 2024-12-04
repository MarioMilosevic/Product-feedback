<template>
  <li :class="['li', borderColor]">
    <Status :status="feedback.status.name" />
    <div class="li__textContainer">
      <h3>{{ feedback.title }}</h3>
      <p>{{ feedback.description }}</p>
    </div>
    <div class="li__icons">
      <Category :category="feedback.category.name" class="li__icons-category" />
      <div class="li__icons-buttons">
        <LikeButton direction="row" :isLiked="false" :likes="feedback.likes" />
        <CommentIcon :commentsCount="feedback.Comments[0].count" gap="small" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Status from "src/components/UI/Status.vue";
import Category from "src/components/UI/Category.vue";
import LikeButton from "src/components/UI/LikeButton.vue";
import CommentIcon from "src/components/UI/CommentIcon.vue";
import { PropType } from "vue";
import { FeedbackType } from "src/utils/types";

export default {
  components: {
    Status,
    Category,
    LikeButton,
    CommentIcon,
  },
  props: {
    feedback: {
      type: Object as PropType<FeedbackType>,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    borderColor() {
      return `${this.feedback.status.name}`.toLowerCase();
    },
    //
  },
  mounted() {
    console.log(this.feedback);
    //
  },
  methods: {
    //
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.li {
  background-color: $secondary-color;
  padding: 1rem 1.5rem;
  border-radius: $border-radius-medium;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top-width: 0.3rem;
  border-top-style: solid;

  &__category {
    align-self: start;
  }

  &__textContainer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-size: 1rem;
    }
  }

  &__icons {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-category {
      align-self: start;
    }

    &-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.planned {
  border-color: $error-color;
}
.in-progress {
  border-color: $terniary-color;
}
.live {
  border-color: $forthiary-color;
}
</style>
