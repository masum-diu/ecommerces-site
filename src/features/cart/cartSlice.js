import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalPriceWithTax: 0,
  totalPriceOrg: 0,
  totalPriceWithTaxOrg: 0,
  totalFragileCharge: 0,
  totalFragileChargeOrg: 0,
  totalProductWeight: 0,
  totalPriceWithoutFragileCharge: 0,
  totalPriceWithoutFragileChargeOrg: 0,
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
          exist.amount += productID.totalAmount;
          exist.totalPrice += productID.totalPriceOrg;
          exist.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProduct +=
            productID.vatAmountParticularProductOrg;
          exist.totalPriceOrg += productID.totalPriceOrg;
          exist.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg +=
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileChargeOrg;
          exist.totalFragileCharge += productID.totalFragileChargeOrg;
          exist.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.totalPriceOrg;
          state.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;
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
            size_id: productID.size_id,
            colors: productID.colors,
            color_id: productID.color_id,
            color_name: productID.color_name,
            selectedCurrency: productID.selectedCurrency,
            price: productID.priceOrg,
            priceWithoutFragile: productID.priceWithoutFragileOrg,
            priceWithTax: productID.priceWithTaxOrg,
            vatAmountParticularProduct: productID.vatAmountParticularProductOrg,
            totalPrice: productID.totalPriceOrg,
            totalPriceWithoutFragileCharge:
              productID.totalPriceWithoutFragileChargeOrg,
            totalPriceWithTax: productID.totalPriceWithTaxOrg,
            taxAmount: productID.taxAmount,
            fragileCharge: productID.fragileChargeOrg,
            totalFragileCharge: productID.totalFragileChargeOrg,
            totalFragileChargeOrg: productID.totalFragileChargeOrg,
            priceOrg: productID.priceOrg,
            priceWithoutFragileOrg: productID.priceWithoutFragileOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithoutFragileChargeOrg:
              productID.totalPriceWithoutFragileChargeOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            fragileChargeOrg: productID.fragileChargeOrg,
            totalProductWeight: productID.totalProductWeight,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPriceOrg;
          state.totalPriceWithTax += productID.totalPriceWithTaxOrg;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.totalPriceWithoutFragileChargeOrg;
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
          exist.totalPrice = productID.totalPriceOrg;
          exist.totalPriceWithoutFragileCharge =
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTax = productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProduct =
            productID.vatAmountParticularProductOrg;
          exist.totalPriceOrg = productID.totalPriceOrg;
          exist.totalPriceWithoutFragileChargeOrg =
            productID.totalPriceWithoutFragileChargeOrg;
          exist.totalPriceWithTaxOrg = productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg =
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileChargeOrg;
          exist.totalFragileCharge += productID.totalFragileChargeOrg;
          exist.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;
          exist.priceWithoutFragile = productID.priceWithoutFragileOrg;
          exist.priceWithoutFragileOrg = productID.priceWithoutFragileOrg;
          state.totalAmount += 1;
          state.totalPrice += productID.priceOrg;
          state.totalPriceWithTax += productID.priceWithTaxOrg;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.priceWithoutFragileOrg;
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
            price: productID.price,
            priceWithoutFragile: productID.priceWithoutFragile,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            totalPrice: productID.totalPrice,
            totalPriceWithoutFragileCharge:
              productID.totalPriceWithoutFragileCharge,
            totalPriceWithTax: productID.totalPriceWithTax,
            taxAmount: productID.taxAmount,
            fragileCharge: productID.fragileCharge,
            totalFragileCharge: productID.totalFragileCharge,
            totalFragileChargeOrg: productID.totalFragileChargeOrg,
            priceOrg: productID.priceOrg,
            priceWithoutFragileOrg: productID.priceWithoutFragileOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithoutFragileChargeOrg:
              productID.totalPriceWithoutFragileChargeOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            fragileChargeOrg: productID.fragileChargeOrg,
            totalProductWeight: productID.totalProductWeight,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.priceOrg;
          state.totalPriceWithTax += productID.priceWithTaxOrg;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalFragileChargeOrg += productID.totalFragileChargeOrg;
          state.totalProductWeight += productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge +=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg +=
            productID.priceWithoutFragileOrg;
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
              product.id != productID.id ||
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
        } else {
          exist.amount--;
          exist.totalPrice -= productID.priceOrg;
          exist.totalPriceOrg -= productID.priceOrg;
          exist.vatAmountParticularProduct -=
            productID.vatAmountParticularProductOrg / productID.amount;
          exist.totalPriceWithTax -= productID.priceWithTaxOrg;
          // exist.totalPriceOrg -= productID.priceOrg;
          exist.totalPriceWithoutFragileCharge -=
            productID.priceWithoutFragileOrg;
          exist.totalPriceWithoutFragileChargeOrg -=
            productID.priceWithoutFragileOrg;
          exist.vatAmountParticularProductOrg -=
            productID.vatAmountParticularProductOrg / productID.amount;
          exist.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          exist.totalFragileCharge -= productID.fragileChargeOrg;
          exist.totalFragileChargeOrg -= productID.fragileChargeOrg;
          exist.totalProductWeight -= productID.productWeight;
          state.totalAmount--;
          state.totalPrice -= productID.priceOrg;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTax -= productID.priceWithTaxOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalFragileCharge -= productID.fragileChargeOrg;
          state.totalFragileChargeOrg -= productID.fragileChargeOrg;
          state.totalProductWeight -= productID.productWeight;
          state.totalPriceWithoutFragileCharge -=
            productID.priceWithoutFragileOrg;
          state.totalPriceWithoutFragileChargeOrg -=
            productID.priceWithoutFragileOrg;
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
              product.id != productID.id || product.size !== productID.size
          );
          state.totalAmount -= productID.amount;
          state.totalPrice -= productID.totalPriceOrg;
          state.totalPriceWithTax -= productID.totalPriceWithTaxOrg;
          state.totalPriceOrg -= productID.totalPriceOrg;
          state.totalPriceWithTaxOrg -= productID.totalPriceWithTaxOrg;
          state.totalFragileCharge -= productID.totalFragileChargeOrg;
          state.totalFragileChargeOrg -= productID.totalFragileChargeOrg;
          state.totalProductWeight -= productID.totalProductWeight;
          state.totalPriceWithoutFragileCharge -=
            productID.totalPriceWithoutFragileChargeOrg;
          state.totalPriceWithoutFragileChargeOrg -=
            productID.totalPriceWithoutFragileChargeOrg;
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
