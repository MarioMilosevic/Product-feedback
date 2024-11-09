import { createRouter, createWebHistory } from "vue-router";
import FeedbackDetails from "src/views/FeedbackDetails.vue";
import NotFound from "src/views/NotFound.vue";
import Home from "src/views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/All",
  },
  {
    path: "/:category",
    name: "Home",
    component: Home,
    // props:true
  },
  {
    path: "/details/:id",
    name: "FeedbackDetails",
    component: FeedbackDetails,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  linkActiveClass: "textDecoration:none",
});

export default router;
