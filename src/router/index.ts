import { createRouter, createWebHistory } from "vue-router";
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
    component: () => import("src/pages/home/index.vue"),
  },
  {
    path: "/details/:id",
    name: "FeedbackDetails",
    component: () => import("src/pages/feedbacks/index.vue"),
    meta: { backAllowed: true },
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    component: () => import("src/pages/roadmap/index.vue"),
    meta: { backAllowed: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("src/pages/login/index.vue"),
    meta: { isCredentialsForm: true },
  },
  {
    path: "/sign-up",
    name: "Sign up",
    component: () => import("src/pages/sign-up/index.vue"),
    meta: { isCredentialsForm: true },
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("src/pages/not-found/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const feedbackStore = useFeedbackStore();
  if (!feedbackStore.user.id) {
    feedbackStore.setLoading(true);
    const user = await retrieveUser();
    feedbackStore.setUser(user);
    feedbackStore.setLoading(false);
  }
  const isAuthenticated = feedbackStore.user.id;
  if (isAuthenticated && (to.path === "/login" || to.path === "/sign-up")) {
    return { name: "Home" };
  }
});

export default router;
