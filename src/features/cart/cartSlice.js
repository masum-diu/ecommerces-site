import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalProductWeight: 0,
  totalPrice: 0,
  totalPriceOrg: 0,
  totalPriceWithTax: 0,
  totalPriceWithTaxOrg: 0,
  totalFragileCharge: 0,
  totalFragileChargeOrg: 0,
  totalPriceWithoutFragileCharge: 0,
  totalPriceWithoutFragileChargeOrg: 0,
  totalPrice_after_discount: 0,
  totalPriceOrg_after_discount: 0,
  totalPriceWithTax_after_discount: 0,
  totalPriceWithTaxOrg_after_discount: 0,
  totalPriceWithoutFragileCharge_after_discount: 0,
  totalPriceWithoutFragileChargeOrg_after_discount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productID = action.payload;

      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist) {
          // setting data in cart for original price
          exist.amount += productID.totalAmount;
          exist.totalPrice += productID.totalPriceOrg;
          exist.totalPriceOrg += productID.totalPriceOrg;
          exist.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          exist.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProduct +=
            productID.vatAmountParticularProductOrg;
          exist.vatAmountParticularProductOrg +=
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileChargeOrg;
          exist.totalFragileCharge += productID.totalFragileChargeOrg;
          exist.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;

          // setting data in cart for discount price
          exist.totalPrice_after_discount +=
            productID.totalPriceOrg_after_discount;
          exist.totalPriceOrg_after_discount +=
            productID.totalPriceOrg_after_discount;
          exist.totalPriceWithoutFragileCharge_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          exist.totalPriceWithoutFragileChargeOrg_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          exist.totalPriceWithTax_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          exist.totalPriceWithTaxOrg_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          exist.vatAmountParticularProduct_after_discount +=
            productID.vatAmountParticularProductOrg_after_discount;
          exist.vatAmountParticularProductOrg_after_discount +=
            productID.vatAmountParticularProductOrg_after_discount;

          // setting data in cart for original price
          state.totalAmount += productID.totalAmount;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPrice += productID.totalPriceOrg;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;

          // Setting state data for discount price
          state.totalPrice_after_discount +=
            productID.totalPriceOrg_after_discount;
          state.totalPriceOrg_after_discount +=
            productID.totalPriceOrg_after_discount;
          state.totalPriceWithTax_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
        } else {
          state.cart.push({
            id: productID.id,
            amount: productID.amount,
            stock: productID.stockAmount,
            productWeight: productID.productWeight,
            image: productID.image,
            name: productID.name,
            design_code: productID.design_code,
            text: productID.text,
            size: productID.size,
            isFragile: productID.isFragile,
            size_id: productID.size_id,
            colors: productID.colors,
            color_id: productID.color_id,
            color_name: productID.color_name,
            selectedCurrency: productID.selectedCurrency,
            taxAmount: productID.taxAmount,
            price: productID.priceOrg,
            priceOrg: productID.priceOrg,
            discount: productID.discount,
            discountType: productID.discountType,
            priceWithTax: productID.priceWithTaxOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProduct: productID.vatAmountParticularProductOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            totalPrice: productID.totalPriceOrg,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTax: productID.totalPriceWithTaxOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            totalFragileCharge: productID.totalFragileChargeOrg,
            totalFragileChargeOrg: productID.totalFragileChargeOrg,
            priceWithoutFragile: productID.priceWithoutFragileOrg,
            priceWithoutFragileOrg: productID.priceWithoutFragileOrg,
            totalPriceWithoutFragileCharge:
              productID.totalPriceWithoutFragileChargeOrg,
            totalPriceWithoutFragileChargeOrg:
              productID.totalPriceWithoutFragileChargeOrg,
            fragileCharge: productID.fragileChargeOrg,
            fragileChargeOrg: productID.fragileChargeOrg,
            totalProductWeight: productID.totalProductWeight,

            // setting cart data for discount price
            price_after_discount: productID.priceOrg_after_discount,
            priceOrg_after_discount: productID.priceOrg_after_discount,
            priceWithTax_after_discount:
              productID.priceWithTaxOrg_after_discount,
            priceWithTaxOrg_after_discount:
              productID.priceWithTaxOrg_after_discount,
            vatAmountParticularProduct_after_discount:
              productID.vatAmountParticularProductOrg_after_discount,
            vatAmountParticularProductOrg_after_discount:
              productID.vatAmountParticularProductOrg_after_discount,
            totalPrice_after_discount: productID.totalPriceOrg_after_discount,
            totalPriceOrg_after_discount:
              productID.totalPriceOrg_after_discount,
            totalPriceWithTax_after_discount:
              productID.totalPriceWithTaxOrg_after_discount,
            totalPriceWithTaxOrg_after_discount:
              productID.totalPriceWithTaxOrg_after_discount,
            priceWithoutFragile_after_discount:
              productID.priceWithoutFragileOrg_after_discount,
            priceWithoutFragileOrg_after_discount:
              productID.priceWithoutFragileOrg_after_discount,
            totalPriceWithoutFragileCharge_after_discount:
              productID.totalPriceWithoutFragileChargeOrg_after_discount,
            totalPriceWithoutFragileChargeOrg_after_discount:
              productID.totalPriceWithoutFragileChargeOrg_after_discount,
          });
          state.totalAmount += productID.amount;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPrice += productID.totalPriceOrg;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;

          // setting sate data for discount price
          state.totalPrice_after_discount +=
            productID.totalPriceOrg_after_discount;
          state.totalPriceOrg_after_discount +=
            productID.totalPriceOrg_after_discount;
          state.totalPriceWithTax_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount +=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount +=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
        }
      } catch (e) {
        return e;
      }
    },
    increaseCart: (state, action) => {
      // state.cart.push(action.payload);
      const productID = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );
        // console.log("my", product.id, product.size_id, product.color_id);
        // console.log("my", productID.id, productID.size_id, productID.color_id);
        if (exist) {
          exist.amount += productID.totalAmount;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;
          exist.totalPrice = productID.totalPriceOrg;
          exist.totalPriceOrg = productID.totalPriceOrg;
          exist.totalPriceWithoutFragileCharge =
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithoutFragileChargeOrg =
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTax = productID.totalPriceWithTaxOrg;
          exist.totalPriceWithTaxOrg = productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProduct =
            productID.vatAmountParticularProductOrg;
          exist.vatAmountParticularProductOrg =
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileChargeOrg;
          exist.totalFragileCharge += productID.totalFragileChargeOrg;
          exist.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          exist.priceWithoutFragile = productID.priceWithoutFragileOrg;
          exist.priceWithoutFragileOrg = productID.priceWithoutFragileOrg;

          // increasing cart data for discount price
          exist.totalPrice_after_discount =
            productID.totalPriceOrg_after_discount;
          exist.totalPriceOrg_after_discount =
            productID.totalPriceOrg_after_discount;
          exist.totalPriceWithoutFragileCharge_after_discount =
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          exist.totalPriceWithoutFragileChargeOrg_after_discount =
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          exist.totalPriceWithTax_after_discount =
            productID.totalPriceWithTaxOrg_after_discount;
          exist.totalPriceWithTaxOrg_after_discount =
            productID.totalPriceWithTaxOrg_after_discount;
          exist.vatAmountParticularProduct_after_discount =
            productID.vatAmountParticularProductOrg_after_discount;
          exist.vatAmountParticularProductOrg_after_discount =
            productID.vatAmountParticularProductOrg_after_discount;

          state.totalAmount += 1;
          state.totalPrice += productID.priceOrg;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTax += productID.priceWithTaxOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.priceWithoutFragileOrg;

          // setting state data for discount price
          state.totalPrice_after_discount += productID.priceOrg_after_discount;
          state.totalPriceOrg_after_discount +=
            productID.priceOrg_after_discount;
          state.totalPriceWithTax_after_discount +=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount +=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount +=
            productID.priceWithoutFragileOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount +=
            productID.priceWithoutFragileOrg_after_discount;
        } else {
          state.cart.push({
            id: productID.id,
            amount: productID.amount,
            stock: productID.stockAmount,
            productWeight: productID.productWeight,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            colors: productID.colors,
            color_id: productID.color_id,
            color_name: productID.color_name,
            selectedCurrency: productID.selectedCurrency,
            taxAmount: productID.taxAmount,
            fragileCharge: productID.fragileCharge,
            totalFragileCharge: productID.totalFragileCharge,
            fragileChargeOrg: productID.fragileChargeOrg,
            totalProductWeight: productID.totalProductWeight,
            totalFragileChargeOrg: productID.totalFragileChargeOrg,
            price: productID.price,
            priceOrg: productID.priceOrg,
            priceWithTax: productID.priceWithTax,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            totalPrice: productID.totalPrice,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTax: productID.totalPriceWithTax,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            priceWithoutFragile: productID.priceWithoutFragile,
            priceWithoutFragileOrg: productID.priceWithoutFragileOrg,
            totalPriceWithoutFragileChargeOrg:
              productID.totalPriceWithoutFragileChargeOrg,
            totalPriceWithoutFragileCharge:
              productID.totalPriceWithoutFragileCharge,

            // Setting cart data for discount price
            price_after_discount: productID.price_after_discount,
            priceOrg_after_discount: productID.priceOrg_after_discount,
            priceWithTax_after_discount: productID.priceWithTax_after_discount,
            priceWithTaxOrg_after_discount:
              productID.priceWithTaxOrg_after_discount,
            vatAmountParticularProduct_after_discount:
              productID.vatAmountParticularProduct_after_discount,
            vatAmountParticularProductOrg_after_discount:
              productID.vatAmountParticularProductOrg_after_discount,
            totalPrice_after_discount: productID.totalPrice_after_discount,
            totalPriceOrg_after_discount:
              productID.totalPriceOrg_after_discount,
            totalPriceWithTax_after_discount:
              productID.totalPriceWithTax_after_discount,
            totalPriceWithTaxOrg_after_discount:
              productID.totalPriceWithTaxOrg_after_discount,
            priceWithoutFragile_after_discount:
              productID.priceWithoutFragile_after_discount,
            priceWithoutFragileOrg_after_discount:
              productID.priceWithoutFragileOrg_after_discount,
            totalPriceWithoutFragileChargeOrg_after_discount:
              productID.totalPriceWithoutFragileChargeOrg_after_discount,
            totalPriceWithoutFragileCharge_after_discount:
              productID.totalPriceWithoutFragileCharge_after_discount,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.priceOrg;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTax += productID.priceWithTaxOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.priceWithoutFragileOrg;

          // setting state data for discount price
          state.totalPrice_after_discount += productID.priceOrg_after_discount;
          state.totalPriceOrg_after_discount +=
            productID.priceOrg_after_discount;
          state.totalPriceWithTax_after_discount +=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount +=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount +=
            productID.priceWithoutFragileOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount +=
            productID.priceWithoutFragileOrg_after_discount;
        }
      } catch (e) {
        return e;
      }
    },
    decreaseFromCart: (state, action) => {
      const productID = action.payload;

      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id !== productID.id ||
              product.size !== productID.size ||
              product.size_id !== productID.size_id ||
              product.color_id !== productID.color_id
          );
          state.totalAmount--;
          state.totalPrice -= productID.priceOrg;
          state.totalPriceWithTax -= productID.priceWithTaxOrg;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalFragileCharge -= productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg -= productID.totalFragileChargeOrg;
          state.totalProductWeight -= productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge -=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg -=
            productID.priceWithoutFragileOrg;

          // setting state data for discount price
          state.totalPrice_after_discount -= productID.priceOrg_after_discount;
          state.totalPriceOrg_after_discount -=
            productID.priceOrg_after_discount;
          state.totalPriceWithTax_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
        } else {
          exist.amount--;
          exist.totalFragileCharge -= productID.fragileChargeOrg;
          exist.totalFragileChargeOrg -= productID.fragileChargeOrg;
          exist.totalProductWeight -= productID.productWeight;
          exist.totalPrice -= productID.priceOrg;
          exist.totalPriceOrg -= productID.priceOrg;
          exist.totalPriceWithoutFragileCharge -=
            productID.priceWithoutFragileOrg;
          exist.totalPriceWithoutFragileChargeOrg -=
            productID.priceWithoutFragileOrg;
          exist.totalPriceWithTax -= productID.priceWithTaxOrg;
          exist.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          exist.vatAmountParticularProduct -=
            productID.vatAmountParticularProductOrg / productID.amount;
          exist.vatAmountParticularProductOrg -=
            productID.vatAmountParticularProductOrg / productID.amount;

          // setting cart data for discount price
          exist.totalPrice_after_discount -= productID.priceOrg_after_discount;
          exist.totalPriceOrg_after_discount -=
            productID.priceOrg_after_discount;
          exist.totalPriceWithoutFragileCharge_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
          exist.totalPriceWithoutFragileChargeOrg_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
          exist.totalPriceWithTax_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          exist.totalPriceWithTaxOrg_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          exist.vatAmountParticularProduct_after_discount -=
            productID.vatAmountParticularProductOrg_after_discount /
            productID.amount;
          exist.vatAmountParticularProductOrg_after_discount -=
            productID.vatAmountParticularProductOrg_after_discount /
            productID.amount;

          state.totalAmount--;
          state.totalFragileCharge -= productID.fragileChargeOrg;
          state.totalFragileChargeOrg -= productID.fragileChargeOrg;
          state.totalProductWeight -= productID.productWeight;
          state.totalPrice -= productID.priceOrg;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTax -= productID.priceWithTaxOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalPriceWithoutFragileCharge -=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg -=
            productID.priceWithoutFragileOrg;

          // setting state data for discount price
          state.totalPrice_after_discount -= productID.priceOrg_after_discount;
          state.totalPriceOrg_after_discount -=
            productID.priceOrg_after_discount;
          state.totalPriceWithTax_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount -=
            productID.priceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount -=
            productID.priceWithoutFragileOrg_after_discount;
        }
      } catch (e) {}
    },
    removeFromCart: (state, action) => {
      const productID = action.payload;

      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist.amount >= 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id !== productID.id ||
              product.size !== productID.size ||
              product.size_id !== productID.size_id ||
              product.color_id !== productID.color_id
          );
          state.totalAmount -= productID.amount;
          state.totalFragileCharge -= productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg -= productID.totalFragileChargeOrg;
          state.totalProductWeight -= productID.totalProductWeight;
          state.totalPrice -= productID.totalPriceOrg;
          state.totalPriceWithTax -= productID.totalPriceWithTaxOrg;
          state.totalPriceOrg -= productID.totalPriceOrg;
          state.totalPriceWithTaxOrg -= productID.totalPriceWithTaxOrg;
          state.totalPriceWithoutFragileCharge -=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg -=
            productID.totalPriceWithoutFragileChargeOrg;

          // setting state data for discount price
          state.totalPrice_after_discount -=
            productID.totalPriceOrg_after_discount;
          state.totalPriceWithTax_after_discount -=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceOrg_after_discount -=
            productID.totalPriceOrg_after_discount;
          state.totalPriceWithTaxOrg_after_discount -=
            productID.totalPriceWithTaxOrg_after_discount;
          state.totalPriceWithoutFragileCharge_after_discount -=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
          state.totalPriceWithoutFragileChargeOrg_after_discount -=
            productID.totalPriceWithoutFragileChargeOrg_after_discount;
        }
      } catch (e) {}
    },
    clearCart: (state, action) => {
      const productID = action.payload;

      try {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.totalPriceWithTax = 0;
        state.totalPriceOrg = 0;
        state.totalPriceWithTaxOrg = 0;
        state.totalFragileCharge = 0;
        state.totalFragileChargeOrg = 0;
        state.totalProductWeight = 0;
        state.totalPriceWithoutFragileCharge = 0;
        state.totalPriceWithoutFragileChargeOrg = 0;
        state.totalPrice_after_discount = 0;
        state.totalPriceOrg_after_discount = 0;
        state.totalPriceWithTax_after_discount = 0;
        state.totalPriceWithTaxOrg_after_discount = 0;
        state.totalPriceWithoutFragileCharge_after_discount = 0;
        state.totalPriceWithoutFragileChargeOrg_after_discount = 0;
      } catch (e) {}
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCart,
  decreaseFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
