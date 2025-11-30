<template>
  <div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <a class="navbar-brand fw-bold" href="#">MyApp</a>

      <div class="ms-auto d-flex align-items-center">
        <span class="text-white me-3">
          Hello, <strong>{{ auth.user?.name }}</strong>
        </span>
        <button class="btn btn-light btn-sm" @click="logout">Logout</button>
      </div>
    </nav>

    <!-- Main content -->
    <div class="container mt-5">
      <div class="card shadow p-4">
        <h2 class="mb-3">Dashboard</h2>
        <p class="text-muted">You are logged in successfully.</p>

        <hr />

        <div>
          <h5>Your Details:</h5>
          <ul>
            <li><strong>Name:</strong> {{ auth.user?.name }}</li>
            <li><strong>Email:</strong> {{ auth.user?.email }}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>
