import { createRouter, createWebHistory } from "vue-router";

// Import halaman
import Home from "../view/home.vue";
import Projects from "./Projects.vue";

const routes = [
  { 
    path: "/", 
    name: "home", 
    component: Home 
  },
  { 
    path: "/projects", 
    name: "projects", 
    component: Projects 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
