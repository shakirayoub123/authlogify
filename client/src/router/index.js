import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Register from "../pages/Register.vue";

import { useAuthStore } from "../store/auth";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/verify-otp",
        name: "verify-email-otp",
        component: () => import("../pages/VerifyEmailOtp.vue")
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Guard
router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.token) {
        return "/login";
    }
});

export default router;
