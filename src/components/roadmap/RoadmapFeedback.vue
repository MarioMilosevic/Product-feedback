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
          :isLiked="false"
          :likes="feedback.likes"
          @click="updateRoadmapFeedback"
        />
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
import { toggleLike } from "src/api/FeedbacksApi";
import { PropType } from "vue";
import { FeedbackType } from "src/utils/types";
import { mapState } from "pinia";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { showToast } from "src/utils/toastify";

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
    //
  },
  mounted() {
    console.log(this.feedback);
    //
  },
  methods: {
    async updateRoadmapFeedback() {
       if (this.user.is_anonymous) {
        showToast("You must create an account first", "error");
        return;
      }
      if (!this.feedback.id || !this.user.id) {
        return;
      }
      const updatedFeedback = await toggleLike(this.feedback.id, this.user.id);
      this.$emit("update-like", updatedFeedback);
    },
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
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;

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
