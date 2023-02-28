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
    getCategoryWiseProducts: builder.query({
      query: (cat) => `/product/${cat}`,
    }),
    getCategoryAndSubWiseProducts: builder.query({
      query: ({cat,sub_cat,page}) => `/product/${cat}/${sub_cat}?page=${page}&per_page=8`,
    }),
    getSubWiseProducts: builder.query({
      query: (sub_cat) => `/category/${sub_cat}`,
    }),
    getAttributesOfProducts: builder.query({
      query: (sub_cat) => `category-fabric/${sub_cat}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetParticularProductsQuery,
  useGetHomePageProductsQuery,useGetCampignListsQuery,useGetParticularCampignListsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,useGetAttributesOfProductsQuery
} = productApi;
