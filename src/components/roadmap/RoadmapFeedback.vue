<template>
  <li :class="['li', borderColor]">
    <Status :status="feedback.status.name" />
    <router-link
      :to="{ name: 'FeedbackDetails', params: { id: feedback.id } }"
      class="li__textContainer"
    >
      <h3>{{ feedback.title }}</h3>
      <p>{{ feedback.description }}</p>
    </router-link>
    <div class="li__icons">
      <Category :category="feedback.category.name" class="li__icons-category" />
      <div class="li__icons-buttons">
        <LikeButton
          direction="row"
          :isLiked="isLiked"
          :likes="feedback.likes"
          @click="updateRoadmapFeedback"
        />
        <CommentIcon v-if="feedback.Comments" :commentsCount="feedback.Comments[0].count" gap="small" />
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Status from "src/components/UI/Status.vue";
import Category from "src/components/UI/Category.vue";
import LikeButton from "src/components/UI/LikeButton.vue";
import CommentIcon from "src/components/UI/CommentIcon.vue";
import { checkLikeValidation, isLikedClass } from "src/api/FeedbacksApi";
import { PropType } from "vue";
import { FeedbackType } from "src/utils/types";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";

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
  emits:['update-like'],
  data() {
    return {};
  },
  computed: {
    ...mapState(useFeedbackStore, ["user"]),
    borderColor() {
      return `${this.feedback.status.name}`.toLowerCase();
    },
    isLiked() {
      return isLikedClass(this.feedback)
    }
  },
  mounted() {
    // console.log(this.feedback);
  },
  methods: {
    async updateRoadmapFeedback() {
      const updatedFeedback = await checkLikeValidation(this.feedback)
      this.$emit("update-like", updatedFeedback);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.li {
  background-color: $secondary-color;
  padding: $medium-gap $big-gap;
  border-radius: $border-radius-medium;
  display: flex;
  flex-direction: column;
  gap: $big-gap;
  border-top-width: 0.3rem;
  border-top-style: solid;

  &__category {
    align-self: start;
  }

  &__textContainer {
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: $medium-gap;

    p {
      font-size: $medium-gap;
    }
  }

  &__icons {
    display: flex;
    flex-direction: column;
    gap: $medium-gap;

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
