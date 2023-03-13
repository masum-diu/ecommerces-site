import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://165.22.247.151/apiaranya/public/api",
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
      query: ({ cat, page }) => `/product/${cat}?page=${page}&per_page=9`,
    }),
    getCategoryAndSubWiseProducts: builder.query({
      query: ({ cat, sub_cat, page }) =>
        `/product/${cat}/${sub_cat}?page=${page}&per_page=9`,
    }),
    getSubWiseProducts: builder.query({
      query: (sub_cat) => `/category/${sub_cat}`,
    }),
    getAttributesOfProducts: builder.query({
      query: (sub_cat) => `category-fabric/${sub_cat}`,
    }),
    getColorWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, colorSelected }) =>
        `product/${cat}/${sub_cat}?attrname=colour&attrid=${colorSelected}`,
    }),
    getColorWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, colorSelected }) =>
        `product/${cat}?attrname=colour&attrid=${colorSelected}`,
    }),
    getFabricWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, fabricID }) =>
        `product/${cat}/${sub_cat}?attrname=fabric&attrid=${fabricID}`,
    }),
    getFabricWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, fabricID }) =>
        `product/${cat}?attrname=fabric&attrid=${fabricID}`,
    }),
    getPriceWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, up, low }) =>
        `/product/${cat}/${sub_cat}?range=${low}-${up}`,
    }),
    getPriceWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, up, low }) => `/product/${cat}?range=${low}-${up}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetParticularProductsQuery,
  useGetHomePageProductsQuery,
  useGetCampignListsQuery,
  useGetParticularCampignListsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,
  useGetAttributesOfProductsQuery,
  useGetColorWiseFilteredProductsQuery,
  useGetColorWiseFilteredProductsWithOutSubQuery,
  useGetPriceWiseFilteredProductsQuery,
  useGetPriceWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsQuery,
  useGetFabricWiseFilteredProductsWithOutSubQuery,
  useLazyGetCategoryAndSubWiseProductsQuery,
} = productApi;
