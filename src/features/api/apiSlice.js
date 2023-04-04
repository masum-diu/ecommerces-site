import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://backend.aranya.com.bd/api",
    baseUrl: "https://apiaranya.jumriz.com/public/api",
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
    getSearchResult: builder.query({
      query: (keyWord) => `/product?no_paginate=yes&keyword=${keyWord}`,
    }),
    getCampignLists: builder.query({
      query: () => "/all-campaign?status",
    }),
    getParticularCampignLists: builder.query({
      query: (id) => `product?no_paginate=y&camp_id=${id}`,
    }),
    getCategoryWiseProducts: builder.query({
      query: ({ cat, page }) => `/product/${cat}?page=${page}&per_page=16`,
    }),
    getCategoryAndSubWiseProducts: builder.query({
      query: ({ cat, sub_cat, page }) =>
        `/product/${cat}/${sub_cat}?page=${page}&per_page=16`,
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
      debounce: {
        // Use throttle to limit the rate at which the query function is called
        wait: 60000,
        leading: true,
        trailing: true,
      },
    }),
    getPriceWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, up, low }) => `/product/${cat}?range=${low}-${up}`,
      throttle: {
        // Use throttle to limit the rate at which the query function is called
        wait: 500,
        leading: true,
        trailing: true,
      },
    }),
    getOrderDetails: builder.query({
      query: (token) => ({
        url: `/order`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetParticularProductsQuery,
  useGetHomePageProductsQuery,
  useGetCampignListsQuery,
  useGetSearchResultQuery,
  useGetParticularCampignListsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,
  useGetAttributesOfProductsQuery,
  useGetColorWiseFilteredProductsQuery,
  useGetColorWiseFilteredProductsWithOutSubQuery,
  useGetPriceWiseFilteredProductsQuery,
  useLazyGetPriceWiseFilteredProductsQuery,
  useGetPriceWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsQuery,
  useGetFabricWiseFilteredProductsWithOutSubQuery,
  useLazyGetCategoryAndSubWiseProductsQuery,
  useGetOrderDetailsQuery,
} = productApi;
