<template>
  <div class="wrapper">
    <FormHeader>
      <h1>Sign Up Form</h1>
    </FormHeader>

    <AuthForm @submit.prevent="signUpNewUser" class="wrapper__form">
      <template #fullName>
        <FormBlock>
          <Input
            type="text"
            name="fullName"
            v-model="signUpCredentials.fullName"
            placeholder="Full Name"
          />
          <template #error v-if="errors.fullName">
            {{ errors.fullName }}
          </template>
        </FormBlock>
      </template>
      <template #username>
        <FormBlock>
          <Input
            type="text"
            name="username"
            v-model="signUpCredentials.username"
            placeholder="Username"
          />
          <template #error v-if="errors.username">
            {{ errors.username }}
          </template>
        </FormBlock>
      </template>

      <template #email>
        <FormBlock>
          <Input
            type="email"
            name="email"
            v-model="signUpCredentials.email"
            placeholder="Email Address"
          />
          <template #error v-if="errors.email">
            {{ errors.email }}
          </template>
        </FormBlock>
      </template>
      <template #password>
        <FormBlock>
          <Input
            type="password"
            name="password"
            v-model="signUpCredentials.password"
            placeholder="Password"
          />
          <template #error v-if="errors.password">
            {{ errors.password }}
          </template>
        </FormBlock>
      </template>
      <template #confirmPassword>
        <FormBlock>
          <Input
            type="password"
            name="confirmPassword"
            v-model="signUpCredentials.confirmPassword"
            placeholder="Confirm Password"
          />
          <template #error v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </template>
        </FormBlock>
      </template>

      <template #imageUpload>
        <FormBlock>
          <UploadWidget @image-event="updateImage" />
          <template #error v-if="errors.image">
            {{ errors.confirmPassword }}
          </template>
        </FormBlock>
      </template>

      <template #actionButton>
        <ActionButton color="blue" size="big" type="submit">
          <h3>Sign Up</h3>
        </ActionButton>
      </template>
      <template #cancelButton>
        <ActionButton color="purple" size="big" @click="goToHomepage">
          <h3>Homepage</h3>
        </ActionButton>
      </template>
    </AuthForm>
    <FormGuest linkText="Login" />
  </div>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "src/components/form/Input.vue";
import ActionButton from "src/components/layout/ActionButton.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import HomepageLink from "src/components/layout/HomepageLink.vue";
import AuthForm from "src/components/form/AuthForm.vue";
import FormHeader from "src/components/form/FormHeader.vue";
import { createNewUser, formWatch } from "src/api/UsersApi";
import { showToast } from "src/utils/toastify";
import { signUpFormSchema } from "src/validation/signUpFormSchema";
import FormGuest from "src/components/form/FormGuest.vue";

export default {
  name: "SignUp",
  components: {
    Input,
    UploadWidget,
    ActionButton,
    FormBlock,
    HomepageLink,
    AuthForm,
    FormHeader,
    FormGuest,
  },
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
        const emptyObject = formWatch(this.errors);
        if (emptyObject) {
          this.errors = emptyObject;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/_variables.scss" as *;
@use "src/scss/_mixins.scss" as mixins;

.wrapper {
  padding: $big 0;
  border-radius: $border-radius-medium;
  grid-area: 2 / 3/ 3 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $very-big;
  background-color: $primary-color-hover;
  position: relative;

  @include mixins.respond(small) {
    padding: $big;
    grid-column: 1 / 9;
    grid-row: 1 / 3;
  }

  h1 {
    @include mixins.respond(small) {
      font-size: $medium;
    }
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $big;
  }
}
</style>
