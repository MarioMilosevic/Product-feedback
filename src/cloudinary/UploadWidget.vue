<template>
  <FileButton @click.prevent="openUploadWidget">Upload Image</FileButton>
</template>

<script lang="ts">
import FileButton from "src/components/UI/FileButton.vue";
import Input from "src/components/form/Input.vue";
import { cloud_name } from "src/config/cloudinaryClient";

interface CloudinaryError {
  message?: string;
  http_code?: number;
  [key: string]: any;
}

interface CloudinaryResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
  };
}

export default {
  components: {
    FileButton,
    Input,
  },
  props: {},
  emits: ["image-event"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    openUploadWidget() {
      const widget = cloudinary.createUploadWidget(
        {
          cloudName: cloud_name,
          uploadPreset: "upload_widget",
        },
        (error: CloudinaryError, result: CloudinaryResult) => {
          if (!error && result && result.event === "success") {
            this.$emit("image-event", result.info.secure_url);
          }
        }
      );
      widget.open();
    },
  },
};
</script>
<style></style>
