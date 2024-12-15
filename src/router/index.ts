import { createRouter, createWebHistory } from "vue-router";
import { useFeedbackStore } from "src/stores/FeedbackStore";
import { retrieveUser } from "src/api/UsersApi";
import FeedbackDetails from "src/pages/feedbacks/index.vue";
import NotFound from "src/pages/not-found/index.vue";
import Home from "src/pages/home/index.vue";
import Login from "src/pages/login/index.vue";
import SignUp from "src/pages/sign-up/index.vue";
import Roadmap from "src/pages/roadmap/index.vue";

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
    path: "/roadmap",
    name: "Roadmap",
    component: Roadmap,
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
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const feedbackStore = useFeedbackStore();
  if (!feedbackStore.user.id) {
    feedbackStore.setLoading(true)
    const user = await retrieveUser();
    feedbackStore.setUser(user)
    feedbackStore.setLoading(false)
  }
  const isAuthenticated = feedbackStore.user.id;
  if (isAuthenticated && (to.path === "/login" || to.path === "/sign-up")) {
    return { name: "Home" };
  }
});

export default router;
