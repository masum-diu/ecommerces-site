import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalPriceWithTax: 0,
  totalPriceOrg: 0,
  totalPriceWithTaxOrg: 0,
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
            product.id === productID.id && product.size === productID.size
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice += productID.totalPrice;
          exist.totalPriceWithTax += productID.totalPriceWithTax;
          exist.vatAmountParticularProduct +=
            productID.vatAmountParticularProduct;
          exist.totalPriceOrg += productID.totalPriceOrg;
          exist.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg +=
            productID.vatAmountParticularProductOrg;
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            design_code: productID.design_code,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            colors: productID.colors,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            priceOrg: productID.priceOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            taxAmount: productID.taxAmount,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
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
            product.id === productID.id && product.size === productID.size
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice = productID.totalPrice;
          exist.totalPriceWithTax = productID.totalPriceWithTax;
          exist.vatAmountParticularProduct =
            productID.vatAmountParticularProduct;
          state.totalAmount += 1;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
          exist.totalPriceOrg = productID.totalPriceOrg;
          exist.totalPriceWithTaxOrg = productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg =
            productID.vatAmountParticularProductOrg;
          // state.totalAmount += 1;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            colors: productID.colors,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            priceOrg: productID.priceOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            taxAmount: productID.taxAmount,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
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
            product.id === productID.id && product.size === productID.size
        );

        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id || product.size !== productID.size
          );
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
        } else {
          exist.amount--;
          exist.totalPrice -= productID.price;
          exist.vatAmountParticularProduct -=
            productID.vatAmountParticularProduct / productID.amount;
          exist.totalPriceWithTax -= productID.priceWithTax;
          exist.totalPriceOrg -= productID.priceOrg;
          exist.vatAmountParticularProductOrg -=
            productID.vatAmountParticularProductOrg / productID.amount;
          exist.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
        }
      } catch (e) {}
    },
    removeFromCart: (state, action) => {
      const productID = action.payload;

      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id && product.size === productID.size
        );

        if (exist.amount >= 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id || product.size !== productID.size
          );
          state.totalAmount -= productID.amount;
          state.totalPrice -= productID.totalPrice;
          state.totalPriceWithTax -= productID.totalPriceWithTax;
          state.totalPriceOrg -= productID.totalPriceOrg;
          state.totalPriceWithTaxOrg -= productID.totalPriceWithTaxOrg;
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
