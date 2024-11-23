<template>
  <button id="upload_widget" class="cloudinary-button" @click.prevent="openUploadWidget">
    Upload files
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cloud_name } from 'src/config/cloudinaryClient';

export default defineComponent({
  name: 'CloudinaryUploader',
  methods: {
    openUploadWidget() {
      const widget = cloudinary.createUploadWidget(
        {
          cloudName: cloud_name,
          uploadPreset: 'upload_widget',
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
          }
        }
      );
      widget.open();
    },
  },
});
</script>

<style scoped>
/* Add any custom styling if needed */
</style>
