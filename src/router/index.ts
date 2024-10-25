import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import FeedbackDetails from "../views/FeedbackDetails.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/details/:id',
    name: "FeedbackDetails",
    component:FeedbackDetails
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
