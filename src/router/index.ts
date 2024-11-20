import { createRouter, createWebHistory } from "vue-router";
import FeedbackDetails from "src/pages/FeedbackDetails.vue";
import NotFound from "src/pages/NotFound.vue";
import Home from "src/pages/Home.vue";
import Login from "src/pages/Login.vue"

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/details/:id",
    name: "FeedbackDetails",
    component: FeedbackDetails,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
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
