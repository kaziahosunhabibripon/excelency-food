"use client";
import axios from "axios";
import { getAccessToken } from "./appHelpers";
import { store } from "@/redux/store";

// Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: getAccessToken(),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}` || getAccessToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle unauthorized access
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting...");
        // Optionally, trigger logout or refresh token logic here
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
