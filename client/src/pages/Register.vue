<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 420px">
      <h3 class="text-center mb-4">Create Account</h3>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Enter name"
              required
          />
        </div>

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

        <button class="btn btn-success w-100">Create Account</button>
      </form>

      <p v-if="error" class="text-danger mt-3">{{ error }}</p>

      <p class="text-center mt-3">
        Already have an account?
        <router-link to="/login" class="text-primary fw-bold">
          Login here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../services/api";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

const error = ref("");

const handleRegister = async () => {
  try {
    await axios.post("/register/send-otp", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push({
      name: "verify-email-otp",
      query: { email: email.value }
    });
  } catch (err) {
    error.value = err.response?.data?.error || "OTP sending failed";
  }
};

</script>
