import { createRouter, createWebHistory } from "vue-router";
import authStore from "../store/auth";
import Home from "../view/home.vue";
import Navbarv from '../components/Navbarv.vue';
import ChatBot from '../components/ChatBot.vue';
import Projects from "./Projects.vue";
import SuperAdmin from "../components/Dasboard/SuperAdmin.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/projects",
    name: "projects",
    components: {
      default: Projects,
      navbar: Navbarv,
      chatbot: ChatBot
    }
  },
  {
    path: "/super-admin",
    name: "super-admin",
    component: SuperAdmin,
    
    meta: { requiresAuth: true, requiresSuperAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // Check authentication status on route change
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to home if not authenticated
    console.log('Access denied: Not authenticated');
    next('/');
  } else if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin()) {
    // Redirect to home if not super admin
    console.log('Access denied: Not super admin');
    next('/');
  } else {
    next();
  }
});

export default router;
