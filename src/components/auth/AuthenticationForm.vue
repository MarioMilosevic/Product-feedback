<!-- <template>
  <form :class="divClass" @submit.prevent @submit-event.prevent="handleSubmit">
    <slot name="fullName" />
    <slot name="username" />
    <slot name="email" />
    <slot name="password" />
    <slot name="confirmPassword" />
    <slot name="image" />
    <div :class="buttonClass">
      <slot name="submit" />
    </div>
  </form>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    display: {
      type: String,
      required: true,
    },
  },
  emits:['submit-event'],
  data() {
    return {};
  },
  computed: {
    divClass() {
      return `${this.display}`;
    },
    buttonClass() {
      return `${this.display}__button`;
    },
  },
  mounted() {},
  methods: {
    handleSubmit(payload) {
      console.log(payload)
      console.log('radi')
    }
  },
};
</script>

<style scoped lang="scss">
.flex {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__button {
    width: 100%;
    display: flex;

    & > * {
      width: 100%;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  &__button {
    grid-column: span 2;
    display: flex;
    justify-content: center;

    & > * {
      width: 50%;
    }
  }
}
</style> -->
