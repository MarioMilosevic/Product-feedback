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
        <CommentIcon
          v-if="feedback.Comments"
          :commentsCount="feedback.Comments[0].count"
          gap="small"
        />
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
  emits: ["update-like"],
  computed: {
    ...mapState(useFeedbackStore, ["user"]),
    borderColor() {
      return `${this.feedback.status.name}`.toLowerCase();
    },
    isLiked() {
      return isLikedClass(this.feedback);
    },
  },
  methods: {
    async updateRoadmapFeedback() {
      const updatedFeedback = await checkLikeValidation(this.feedback);
      this.$emit("update-like", updatedFeedback);
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.li {
  background-color: $secondary-color;
  padding: $medium $big;
  display: flex;
  flex-direction: column;
  gap: $big;
  justify-content: space-between;
  border-radius: $border-radius-medium;
  border-top-width: 0.3rem;
  border-top-style: solid;
  min-height: 20rem;

  @include mixins.respond(small) {
    min-height: 0rem;
  }

  &__category {
    align-self: start;
  }

  &__textContainer {
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: $medium;

    p {
      font-size: $medium;
    }
  }

  &__icons {
    display: flex;
    flex-direction: column;
    gap: $medium;

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
