<template>
  <AuthenticationWrapper type="Sign Up">
    <template #form>
      <AuthenticationForm display="grid">
        <template #fullName>
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
        </template>
        <template #username>
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
        </template>
        <template #email>
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
        </template>
        <template #password>
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
        </template>
        <template #confirmPassword>
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
        </template>
        <template #image>
          <FormBlock>
            <UploadWidget @image-event="updateImage" />
            <template #error v-if="errors.image">
              {{ errors.confirmPassword }}
            </template>
          </FormBlock>
        </template>
        <template #submit>
          <ActionButton
            color="blue"
            size="big"
            type="submit"
            @click.prevent="signUpNewUser"
          >
            <h3>Sign Up</h3>
          </ActionButton>
        </template>
        <template #homepage>
          <ActionButton color="purple" size="big" @click="goToHomepage">
            <h3>Homepage</h3>
          </ActionButton>
        </template>
      </AuthenticationForm>
    </template>
  </AuthenticationWrapper>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "src/components/form/Input.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import { createNewUser } from "src/api/UsersApi";
import { signUpFormSchema } from "src/validation/signUpFormSchema";
import FormBlock from "src/components/form/FormBlock.vue";

export default {
  components: {
    Input,
    UploadWidget,
    AuthenticationForm,
    AuthenticationWrapper,
    ActionButton,
    FormBlock,
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
  computed: {},
  mounted() {},
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
      console.log("valjda sam dobio sta sam trebao", imageUrl);
      this.signUpCredentials.image = imageUrl;
    },
    async signUpNewUser() {
      createNewUser(this.signUpCredentials)
        // const validation = signUpFormSchema.safeParse(this.signUpCredentials);
        // if (validation.sucess) {
        //   console.log(validation);
        //   createNewUser(this.signUpCredentials);
        // } else {
        //   this.errors = validation.error.errors.reduce((acc, err) => {
        //     const key = err.path.length > 0 ? err.path[0] : "";
        //     acc[key] = err.message;
        //     return acc;
        //   }, {} as Record<string, string>);
        // }
      // } catch (error) {
      //   console.error("Unexpected error occured", error);
      // }
    },
  },
};
</script>
