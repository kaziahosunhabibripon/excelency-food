import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    viewCart: builder.query({
      query: () => "/api/customer/cart",
      providesTags: ["Post"],
    }),

    getSingleFoodItem: builder.query({
      query: (id) => `/api/customer/single/item/${id}`,
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetSingleFoodItemQuery } = cartApi;
