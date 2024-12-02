import { createRouter, createWebHistory } from "vue-router";
import FeedbackDetails from "src/pages/FeedbackDetails.vue";
import NotFound from "src/pages/NotFound.vue";
import Home from "src/pages/Home.vue";
import Login from "src/pages/Login.vue";
import SignUp from "src/pages/SignUp.vue";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { retrieveUser } from "src/api/UsersApi";

export const routes = [
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
    meta: { backAllowed: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isCredentialsForm: true },
  },
  {
    path: "/sign-up",
    name: "Sign up",
    component: SignUp,
    meta: { isCredentialsForm: true },
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

router.beforeEach(async (to) => {
  const feedbackStore = useFeedbackStore();
  if (!feedbackStore.user.id) {
    await retrieveUser();
  }
  const isAuthenticated = feedbackStore.user.id;
  if (isAuthenticated && (to.path === "/login" || to.path === "/sign-up")) {
    return { name: "Home" };
  }
});

export default router;
