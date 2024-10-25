import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import FeedbackDetails from "../views/FeedbackDetails.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/details/:id',
    name: "FeedbackDetails",
    component: FeedbackDetails,
    props:true
  },
  {
    path: '/:catchAll(.*)',
    name: "NotFound",
    component:NotFound
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  linkActiveClass:'textDecoration:none'
});

export default router;
