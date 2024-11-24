<template>
  <AuthenticationWrapper type="Sign Up">
    <template #form>
      <AuthenticationForm display="grid">
        <template #fullName>
          <Input
            type="text"
            name="fullName"
            :content="signUpCredentials.fullName"
            placeholder="Full Name"
            @update-input="updateFullName"
          />
        </template>
        <template #userName>
          <Input
            type="text"
            name="userName"
            :content="signUpCredentials.username"
            placeholder="Username"
          />
        </template>
        <template #email>
          <Input
            type="email"
            name="email"
            :content="signUpCredentials.email"
            placeholder="Email Address"
          />
        </template>
        <template #password>
          <Input
            type="password"
            name="password"
            :content="signUpCredentials.password"
            placeholder="Password"
          />
        </template>
        <template #confirmPassword>
          <Input
            type="password"
            name="confirmPassword"
            :content="signUpCredentials.password"
            placeholder="Confirm Password"
          />
        </template>
        <template #image>
          <UploadWidget @image-event="getImageInfo"/>
        </template>
        <template #submit>
          <ActionButton color="blue" size="big" type="submit" @click.prevent="signUpNewUser">
            <h3>Sign Up</h3>
          </ActionButton>
        </template>
        <template #homepage>
          <ActionButton color="purple" size="big">
            <h3>Homepage</h3>
          </ActionButton>
        </template>
      </AuthenticationForm>
    </template>
  </AuthenticationWrapper>
</template>

<script lang="ts">
import UploadWidget from "src/cloudinary/UploadWidget.vue";
import Input from "src/components/UI/Input.vue";
import AuthenticationForm from "src/components/auth/AuthenticationForm.vue";
import AuthenticationWrapper from "src/components/auth/AuthenticationWrapper.vue";
import ActionButton from "src/components/UI/ActionButton.vue";
import { createNewUser } from "src/api/UsersApi";

export default {
  components: {
    Input,
    UploadWidget,
    AuthenticationForm,
    AuthenticationWrapper,
    ActionButton,
  },
  props: {},
  data() {
    return {
      signUpCredentials: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        image: "",
      },
    };
  },
  computed: {
    //
  },
  mounted() {
    //
  },
  methods: {
    async signUpNewUser() {
      createNewUser(this.signUpCredentials)
    },
    updateTitle(newTitle: string) {
      this.signUpCredentials.fullName = newTitle;
    },
    getImageInfo(imageUrl:string) {
      console.log("valjda sam dobio sta sam trebao", imageUrl)
      this.signUpCredentials.image = imageUrl
    }
  },
};
</script>
