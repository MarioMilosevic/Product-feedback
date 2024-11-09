<template>
  <select
    :name="name"
    :id="name"
    :class="['select', color]"
    v-model="localContent"
    @change="$emit('update-select', localContent)"
  >
    <option v-for="(option, index) in options" :key="index" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useFeedbackStore } from 'src/stores/FeedbackStore';


export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type:String,
      required:true
    }
  },
  data() {
    return {
      localContent: this.content,
      feedbackStore:useFeedbackStore()
    };
  },
  computed: {
    ...mapState(useFeedbackStore, ['statusOptions', 'categories', 'getStatusOptions', 'getCategories']),
    options() {
      return this.name === "category" ? this.getCategories : this.getStatusOptions;
    },
  },
  methods: {
  },
  mounted() {
    console.log(this.statusOptions)
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/_variables.scss";
.select {
  padding: 1rem;
  border-radius: $border-radius-medium;
  border: none;
  outline-color: $terniary-color;
}

.blue {
  background-color: $terniary-color;
}

.white {
  background-color: $primary-color;
}
</style>
