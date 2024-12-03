<template>
  <div class="status">
    <p>{{ status }}</p>
    <h4 v-if="count">{{ count }}</h4>
    <span :class="spanColor"></span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: false,
    },
  },
  computed: {
    spanColor() {
      return `${this.status.toLowerCase()}`
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/scss/_variables.scss";

.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-left: 1rem;

  span {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 9999px;
  }

  .planned {
    background-color: $error-color;
  }
  .in-progress {
    background-color: $terniary-color;
  }

  .live {
    background-color: $forthiary-color;
  }

  .suggestion {
    background-color: $cancel-color;
  }
}
</style>
