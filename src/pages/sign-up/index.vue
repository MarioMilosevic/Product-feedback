<template>
  <div class="wrapper">
    <FormHeader>
      <h1>Sign Up Form</h1>
    </FormHeader>

    <AuthForm @submit.prevent="submitHandler" class="wrapper__form">
      <template #inputs>
        <RenderlessComponent>
          <template v-for="input in inputs" :key="input.id" #[input.name]>
            <FormBlock>
              <Input
                @blur-event="blurHandler(input.name as SignupFields)"
                v-bind="input"
                v-model="signUpCredentials[input.name as keyof typeof signUpCredentials]"
              />
              <template #error>
                {{ errors[input.name as SignupFields] }}
              </template>
            </FormBlock>
          </template>
        </RenderlessComponent>
      </template>
      <template #imageUpload>
        <FormBlock>
          <UploadWidget @image-event="updateImage" />
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
import FormGuest from "src/components/form/FormGuest.vue";
import RenderlessComponent from "src/components/form/RenderlessComponent.vue";
import { createNewUser } from "src/api/UsersApi";
import { showToast } from "src/utils/toastify";
import { reactive } from "vue";
import { signUpInputs } from "src/utils/constants";
import {
  getErrors,
  getFieldError,
  SignupFieldErorrs,
  SignupFields,
  SignupTouchedFields,
  ConfirmSchema,
} from "src/validation/signUpFormSchema";

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
    RenderlessComponent,
  },
  data() {
    return {
      signUpCredentials: reactive({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      }),
      errors: reactive<SignupFieldErorrs>({}),
      touchedFields: reactive<SignupTouchedFields>({}),
      inputs: signUpInputs,
    };
  },
  methods: {
    blurHandler(property: SignupFields) {
      const message = getFieldError(property, this.signUpCredentials[property]);
      this.errors[property] = message;
      this.touchedFields[property] = true;
    },
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
    async submitHandler() {
      try {
        const { error } = ConfirmSchema.safeParse(this.signUpCredentials);
        if (error) {
          Object.entries(getErrors(error)).forEach(([key, value]) => {
            this.errors[key as SignupFields] = value;
          });
        } else {
          await createNewUser(this.signUpCredentials);
          this.$router.push("/login");
          setTimeout(() => {
            showToast("Account created successfully");
          }, 1000);
        }
      } catch (error) {
        console.error("Unexpected error occured", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "src/scss/abstracts/_variables" as *;
@use "src/scss/abstracts/_mixins" as mixins;

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
