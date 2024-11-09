<template>
  <Sidebar />
  <Main />
</template>

<script lang="ts">
import Sidebar from "src/components/Sidebar.vue";
import Main from "src/components/Main.vue";

export default {
  components: {
    Sidebar,
    Main,
  },
  props: {
    // category: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    // console.log(this.category);
  },
};
</script>