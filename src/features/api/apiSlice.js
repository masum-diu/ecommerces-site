import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://apiaranya.jumriz.com/public/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
    }),
    getParticularProducts: builder.query({
      query: (id) => `/product-by/${id}`,
    }),
    getHomePageProducts: builder.query({
      query: () => `/home-pagedata`,
    }),
    getCampignLists: builder.query({
      query: () => "/all-campaign?status",
    }),
    getParticularCampignLists: builder.query({
      query: (id) => `product?no_paginate=y&camp_id=${id}`,
    }),
  }),
});

export const { useGetProductsQuery,useGetParticularProductsQuery,useGetHomePageProductsQuery,useGetCampignListsQuery,useGetParticularCampignListsQuery } = productApi;
