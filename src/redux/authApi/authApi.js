import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    /* ------> auth api <------*/
    login: builder.mutation({
      query: (data) => ({
        url: "/api/customer/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/customer/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: "/api/customer/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
