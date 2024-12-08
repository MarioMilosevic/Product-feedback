<template>
  <div class="wrapper">
    <h1>Sign Up Form</h1>
    <HomepageLink position="absolute" />
    <form @submit.prevent="signUpNewUser" class="wrapper__form">
      <FormBlock>
        <Input
          type="text"
          name="fullName"
          :content="signUpCredentials.fullName"
          placeholder="Full Name"
          @update-input="updateFullName"
        />
        <template #error v-if="errors.fullName">
          {{ errors.fullName }}
        </template>
      </FormBlock>
      <FormBlock>
        <Input
          type="text"
          name="username"
          :content="signUpCredentials.username"
          placeholder="Username"
          @update-input="updateUsername"
        />
        <template #error v-if="errors.username">
          {{ errors.username }}
        </template>
      </FormBlock>
      <FormBlock>
        <Input
          type="email"
          name="email"
          :content="signUpCredentials.email"
          placeholder="Email Address"
          @update-input="updateEmail"
        />
        <template #error v-if="errors.email">
          {{ errors.email }}
        </template>
      </FormBlock>
      <FormBlock>
        <Input
          type="password"
          name="password"
          :content="signUpCredentials.password"
          placeholder="Password"
          @update-input="updatePassword"
        />
        <template #error v-if="errors.password">
          {{ errors.password }}
        </template>
      </FormBlock>
      <FormBlock>
        <Input
          type="password"
          name="confirmPassword"
          :content="signUpCredentials.confirmPassword"
          placeholder="Confirm Password"
          @update-input="updateConfirmPassword"
        />
        <template #error v-if="errors.confirmPassword">
          {{ errors.confirmPassword }}
        </template>
      </FormBlock>
      <FormBlock>
        <UploadWidget @image-event="updateImage" />
        <template #error v-if="errors.image">
          {{ errors.confirmPassword }}
        </template>
      </FormBlock>
      <ActionButton color="blue" size="big" type="submit">
        <h3>Sign Up</h3>
      </ActionButton>
      <ActionButton color="purple" size="big" @click="goToHomepage">
        <h3>Homepage</h3>
      </ActionButton>
    </form>
    <div class="wrapper__links">
      <p>
        Already have an account ?
        <router-link :to="{ name: 'Login' }" class="wrapper__links-link">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "src/components/form/Input.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import { createNewUser, formWatch } from "src/api/UsersApi";
import { showToast } from "src/utils/toastify";
import { signUpFormSchema } from "src/validation/signUpFormSchema";
import HomepageLink from "src/components/UI/HomepageLink.vue";

export default {
  components: {
    Input,
    UploadWidget,
    ActionButton,
    FormBlock,
    HomepageLink,
  },
  props: {},
  data() {
    return {
      signUpCredentials: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      },
      errors: {} as Record<string, string>,
    };
  },
  methods: {
    goToHomepage() {
      this.$router.push("/home");
    },
    updateFullName(fullName: string) {
      this.signUpCredentials.fullName = fullName;
    },
    updateUsername(username: string) {
      this.signUpCredentials.username = username;
    },
    updateEmail(email: string) {
      this.signUpCredentials.email = email;
    },
    updatePassword(password: string) {
      this.signUpCredentials.password = password;
    },
    updateConfirmPassword(confirmPassword: string) {
      this.signUpCredentials.confirmPassword = confirmPassword;
    },
    updateImage(imageUrl: string) {
      this.signUpCredentials.image = imageUrl;
    },
    async signUpNewUser() {
      try {
        const validation = signUpFormSchema.safeParse(this.signUpCredentials);
        if (validation.success) {
          await createNewUser(this.signUpCredentials);
          this.$router.push("/login");
          setTimeout(() => {
            showToast("Account created successfully");
          }, 1000);
        } else {
          this.errors = validation.error.errors.reduce((acc, err) => {
            const key = err.path.length > 0 ? err.path[0] : "";
            acc[key] = err.message;
            return acc;
          }, {} as Record<string, string>);
        }
      } catch (error) {
        console.error("Unexpected error occured", error);
      }
    },
  },
  watch: {
    signUpCredentials: {
      deep: true,
      handler() {
        formWatch(this.errors);
      },
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;

.wrapper {
  padding: $big-gap 0;
  border-radius: 10px;
  grid-area: 2 / 3/ 3 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $very-big-gap;
  background-color: $primary-color-hover;
  position: relative;

  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $small-gap;

    &-link {
      color: $terniary-color;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: $terniary-color-hover;
      }
    }
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $big-gap;

    &__button {
      grid-column: span 2;
      display: flex;
      justify-content: center;

      & > * {
        width: 50%;
      }
    }

    h3 {
      color: $secondary-color;
    }
  }
}
</style>
