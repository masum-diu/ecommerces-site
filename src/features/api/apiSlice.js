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
    getProducts1: builder.query({
      query: () => "/home-pagedata",
    }),
    getParticularProducts: builder.query({
      query: (id) => `/product?no_paginate=yes&by_product=${id}`,
    }),
  }),
});

export const { useGetProductsQuery,useGetParticularProductsQuery,useGetProducts1Query } = productApi;
