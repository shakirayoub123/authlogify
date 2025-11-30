<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 400px">
      <h3 class="text-center mb-4">Login</h3>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter email"
              required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter password"
              required
          />
        </div>

        <button class="btn btn-primary w-100">Login</button>
      </form>

      <p v-if="error" class="text-danger mt-3">{{ error }}</p>

      <p class="text-center mt-3">
        Don’t have an account?
        <router-link to="/register" class="text-primary fw-bold">
          Register here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    email.value = "";
    password.value = "";
    router.push("/dashboard");
  } catch (err) {
    error.value = "Invalid email or password";
  }
};
</script>
