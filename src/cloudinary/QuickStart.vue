<template>
  <UploadWidget />
  <!-- <img width="400" id="uploadedimage" src="" /> -->
</template>

<script lang="ts">
import { cloudName } from 'src/config/cloudinaryClient';
import { Cloudinary } from '@cloudinary/url-gen/index';
import UploadWidget from './UploadWidget.vue';
const cld = new Cloudinary({
  cloud: {
    cloudName:cloudName
  }
})
export default {
  name: "QuickStart",
  components: {
    UploadWidget: UploadWidget,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>