"use client";

import axiosInstance from "@/utils/axiosInstance";

// Define proper types for request payloads
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface CartItemData {
  item_id: string | number;
  quantity: number;
}

interface CheckoutData {
  delivery_method: string;
  delivery_address: string;
  payment_method: string;
  total_amount: number;
}

export const requestForRegister = (data: RegisterData) =>
  axiosInstance.post("/api/customer/register", data);

export const requestForLogin = (data: LoginData) =>
  axiosInstance.post("/api/customer/login", data);

export const addToCartItem = (data: CartItemData) =>
  axiosInstance.post("/api/customer/cart/add", data);

export const requestForLogout = (data) =>
  axiosInstance.post("/api/customer/logout", data);

export const requestForCheckout = (data: CheckoutData) =>
  axiosInstance.post("/api/customer/checkout", data);

export const getOrdersData = () => axiosInstance.get("/api/customer/orders");

export const getAllFoodsData = () =>
  axiosInstance.get("/api/customer/all/items");

export const updateQuantityForAuthUser = (
  data: { quantity: number },
  cartItemId: string | number
) => axiosInstance.post(`/api/customer/cart/update/${cartItemId}`, data);

export const removeItemFromCart = (cartItemId: number | string) =>
  axiosInstance.delete(`/api/customer/cart/${cartItemId}`);
