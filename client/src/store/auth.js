import { defineStore } from "pinia";
import axios from "../services/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
    }),

    actions: {
        async login(email, password) {
            const res = await axios.post("/auth/login", { email, password });

            this.token = res.data.token;
            this.user = res.data.user;  // contains name + email
            console.log('user', this.user)
            // save full user in localStorage
            localStorage.setItem("token", this.token);
            localStorage.setItem("user", JSON.stringify(this.user));
        },

        logout() {
            this.token = null;
            this.user = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});
