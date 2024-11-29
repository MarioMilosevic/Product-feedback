import { createPinia } from "pinia";
import { createApp } from "vue";
import "src/main.css";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";
// import { createWebHistory, createRouter } from "vue-router";
// import { routes } from "./router";

// function resolveRouteComponent(route) {
//   return route.value
//     ? route.value.matched[0].components.default
//     : route.matched[0].components.default;
// }

// // function init() {
// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes,
// });
// router.isReady().then(() => {
//   const currentRoute = resolveRouteComponent(router.currentRoute);
//   console.log(currentRoute);
//   currentRoute.fetchData();
// });
// }
// init();

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount("#app");
