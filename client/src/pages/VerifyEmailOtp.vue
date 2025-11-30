<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
      <h3>Verify Your Email</h3>
      <p class="text-muted">OTP sent to {{ email }}</p>

      <input
          v-model="otp"
          placeholder="Enter OTP"
          class="form-control mt-3"
      />

      <button class="btn btn-success w-100 mt-3" @click="verifyOtp">
        Verify OTP
      </button>

      <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "../services/api";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const otp = ref("");
const email = route.query.email;
const error = ref("");

const verifyOtp = async () => {
  try {
    await axios.post("/register/verify-otp", { email, otp: otp.value });
    router.push("/login");
  } catch {
    error.value = "Invalid OTP";
  }
};
</script>
