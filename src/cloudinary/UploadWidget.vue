<script lang="ts">
import { AdvancedImage } from '@cloudinary/vue';
import { Cloudinary } from '@cloudinary/url-gen';

// Import required actions.
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { cloudName } from 'src/config/cloudinaryClient';

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName:"dyogkyl2u",
  },
});



// Instantiate a CloudinaryImage object for the image with the public ID, 'front_face'.
// const myImg = cld.image('front_face');

// // Apply the transformation.
// myImg
//   .effect(sepia());  // Apply a sepia effect.

export default {
  components: {
    AdvancedImage,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Render the image in a Vue.js component. -->
<template>
  <div>
  </div>
</template>