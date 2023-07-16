import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.aranya.com.bd/api",
    // baseUrl: "https://apiaranya.jumriz.com/public/api",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getCategoryAndSubCatList: builder.query({
      query: () => "/category-list",
    }),
    getProducts: builder.query({
      query: () => `/product`,
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
    getAttributesList: builder.query({
      query: (cat) => `/attribute-list/${cat}`,
    }),
    getAttributesOfProducts: builder.query({
      query: (sub_cat) => `category-fabric/${sub_cat}`,
    }),
    getColorWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, colorSelected, page }) =>
        `product/${cat}/${sub_cat}?attrname=colour&attrid=${colorSelected}&page=${page}&per_page=16`,
    }),
    getColorWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, colorSelected, page }) =>
        `product/${cat}?attrname=colour&attrid=${colorSelected}&page=${page}&per_page=16`,
    }),
    getFabricWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, fabricID, page }) =>
        `product/${cat}/${sub_cat}?attrname=fabric&attrid=${fabricID}&page=${page}&per_page=16`,
    }),
    getFabricWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, fabricID, page }) =>
        `product/${cat}?attrname=fabric&attrid=${fabricID}&page=${page}&per_page=16`,
    }),
    getPriceWiseFilteredProducts: builder.query({
      query: ({ cat, sub_cat, up, low, page }) =>
        `/product/${cat}/${sub_cat}?range=${low}-${up}&page=${page}&per_page=16`,
      debounce: {
        // Use throttle to limit the rate at which the query function is called
        wait: 60000,
        leading: true,
        trailing: true,
      },
    }),
    getPriceWiseFilteredProductsWithOutSub: builder.query({
      query: ({ cat, up, low, page }) =>
        `/product/${cat}?range=${low}-${up}&page=${page}&per_page=16`,
      throttle: {
        // Use throttle to limit the rate at which the query function is called
        wait: 500,
        leading: true,
        trailing: true,
      },
    }),
    getShippingCharge: builder.query({
      query: () => `/shipping-charge`,
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
      providesTags: ["Orders"],
    }),
    cancelOrder: builder.mutation({
      query: ({ order_id, token }) => ({
        url: `/order/cancel`,
        method: "POST",
        body: {
          order_id: order_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    postRefundOrder: builder.mutation({
      query: ({ item_id, order_id, token }) => ({
        url: `order-item-cliam-refund`,
        method: "POST",
        body: {
          item_id: item_id,
          order_id: order_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    getMatchedWithProduct: builder.query({
      query: ({ category, sub_catcategory }) => ({
        url: `/product/${category}/${sub_catcategory}?no_paginate=yes&take_some=4`,
        method: "GET",
      }),
    }),
    postUserOrder: builder.mutation({
      query: ({
        data,
        cart,
        totalPrice,
        totalPriceOrg,
        totalPriceWithTax,
        totalPriceWithTaxOrg,
        finalPriceOfOrder,
        currentConversionRate,
        selectedCurrency,
        totalAmount,
        isSameAddressChecked,
        isGuestCheckout,
        backUri,
        token,
      }) => ({
        url: `/order`,
        method: "POST",
        body: {
          data: data,
          cart: cart,
          backUri,
          totalPrice: totalPrice,
          totalPriceOrg:totalPriceOrg,
          totalPriceWithTax: totalPriceWithTax,
          totalPriceWithTaxOrg: totalPriceWithTaxOrg,
          finalPrice: finalPriceOfOrder,
          currentConversionRate: currentConversionRate,
          selectedCurrency: selectedCurrency,
          totalAmount: totalAmount,
          isSameAddress: isSameAddressChecked,
          isGuestCheckout: isGuestCheckout,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    postGuestOrder: builder.mutation({
      query: ({
        data,
        cart,
        totalPrice,
        totalPriceWithTax,
        totalPriceOrg,
        totalPriceWithTaxOrg,
        finalPriceOfOrder,
        currentConversionRate,
        selectedCurrency,
        totalAmount,
        isSameAddressChecked,
        isGuestCheckout,
        backUri,
        token,
      }) => ({
        url: `/guest-order`,
        method: "POST",
        body: {
          data: data,
          cart: cart,
          backUri: backUri,
          totalPrice: totalPrice,
          totalPriceWithTax: totalPriceWithTax,
          totalPriceOrg: totalPriceOrg,
          totalPriceWithTaxOrg: totalPriceWithTaxOrg,
          finalPrice: finalPriceOfOrder,
          currentConversionRate: currentConversionRate,
          selectedCurrency: selectedCurrency,
          totalAmount: totalAmount,
          isSameAddress: isSameAddressChecked,
          isGuestCheckout: isGuestCheckout,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    postAdditionalInfo: builder.mutation({
      query: ({ data, token }) => ({
        url: `/profile-update`,
        method: "POST",
        body: {
          full_name: data.full_name,
          address: data.address,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          occupation: data.occupation,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
    passwordResetRequest: builder.mutation({
      query: ({ password, token }) => ({
        url: `/user-reset-password`,
        method: "POST",
        body: {
          password: password,
          token: token,
        },
      }),
    }),
    socialUserCreation: builder.mutation({
      query: ({ email, name }) => ({
        url: `/social/login`,
        method: "POST",
        body: {
          email: email,
          name: name,
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    }),
  }),
});

export const {
  useGetCategoryAndSubCatListQuery,
  useGetProductsQuery,
  useGetParticularProductsQuery,
  useGetHomePageProductsQuery,
  useGetCampignListsQuery,
  useGetSearchResultQuery,
  useGetParticularCampignListsQuery,
  useGetCategoryAndSubWiseProductsQuery,
  useGetCategoryWiseProductsQuery,
  useGetSubWiseProductsQuery,
  useGetAttributesListQuery,
  useGetAttributesOfProductsQuery,
  useGetColorWiseFilteredProductsQuery,
  useGetColorWiseFilteredProductsWithOutSubQuery,
  useGetPriceWiseFilteredProductsQuery,
  useLazyGetPriceWiseFilteredProductsQuery,
  useGetPriceWiseFilteredProductsWithOutSubQuery,
  useGetFabricWiseFilteredProductsQuery,
  useGetFabricWiseFilteredProductsWithOutSubQuery,
  useLazyGetCategoryAndSubWiseProductsQuery,
  useGetShippingChargeQuery,
  useGetOrderDetailsQuery,
  useCancelOrderMutation,
  usePostRefundOrderMutation,
  useGetMatchedWithProductQuery,
  usePostUserOrderMutation,
  usePostGuestOrderMutation,
  usePostAdditionalInfoMutation,
  usePasswordResetRequestMutation,
  useSocialUserCreationMutation,
} = productApi;
