import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    /* ------> food api <------*/
    createMember: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ data:", data);
        return {
          url: "/members/v1/add-member",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Post"],
    }),
    updateMember: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ data:", data);
        const { _id, ...updatedData } = data || {};
        return {
          url: `/members/v1/update/${_id}`,
          method: ["PUT"],
          body: updatedData,
        };
      },
    }),
    getAllFoods: builder.query({
      query: () => "/api/customer/all/items",
      providesTags: ["Post"],
    }),

    getSearchFood: builder.query({
      query: (param) => `/api/customer/all/items?search=${param}`,
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetAllFoodsQuery, useGetSearchFoodQuery } = apiSlice;
