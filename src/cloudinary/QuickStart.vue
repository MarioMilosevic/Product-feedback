<template>
  <div>
    <AdvancedImage :cld-img="myImg"/>
  </div>
</template>

<script lang="ts">
import { Cloudinary } from "@cloudinary/url-gen";
import { cloud_name } from "src/config/cloudinaryClient";
import { AdvancedImage } from "@cloudinary/vue";
import { fill } from "@cloudinary/url-gen/actions/resize";


// Create a Cloudinary instance and set your cloud name.
export const cld = new Cloudinary({
  cloud: {
    cloudName: cloud_name,
  },
});

const myImg = cld.image("docs/models");
myImg.resize(fill().width(250).height(250));
console.log(myImg.toURL())

export default {
  components: {
    AdvancedImage,
  },
  data() {
    return {
      myImg,
    };
  },
};
</script>
