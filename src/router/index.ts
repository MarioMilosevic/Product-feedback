import { createRouter, createWebHistory } from "vue-router";
import FeedbackDetails from "src/views/FeedbackDetails.vue";
import NotFound from "../views/NotFound.vue";
import Home from "src/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/details/:id",
    name: "FeedbackDetails",
    component: FeedbackDetails,
    props: true,
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
