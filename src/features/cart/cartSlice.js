import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalPriceWithTax: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.cart.push(action.payload);
      const productID = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.color === productID.color &&
            product.colorCode === productID.colorCode
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice += productID.totalPrice;
          exist.totalPriceWithTax += productID.totalPriceWithTax;
          exist.vatAmountParticularProduct +=
            productID.vatAmountParticularProduct;
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            color: productID.color,
            color_id: productID.color_id,
            colorCode: productID.colorCode,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            taxAmount: productID.taxAmount,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
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
            product.color === productID.color
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice = productID.totalPrice;
          exist.totalPriceWithTax = productID.totalPriceWithTax;
          exist.vatAmountParticularProduct= productID.vatAmountParticularProduct,
          state.totalAmount += 1;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            color: productID.color,
            color_id: productID.color_id,
            colorCode: productID.colorCode,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            taxAmount: productID.taxAmount,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
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
            product.color === productID.color &&
            product.colorCode === productID.colorCode
        );

        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id ||
              product.size !== productID.size ||
              product.color !== productID.color ||
              product.colorCode !== productID.colorCode
          );
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
        } else {
          exist.amount--;
          exist.totalPrice -= productID.price;
          exist.vatAmountParticularProduct -= productID.vatAmountParticularProduct/productID.amount;
          exist.totalPriceWithTax -= productID.priceWithTax;
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
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
            product.color === productID.color &&
            product.colorCode === productID.colorCode
        );

        if (exist.amount >= 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id ||
              product.size !== productID.size ||
              product.color !== productID.color ||
              product.colorCode !== productID.colorCode
          );
          state.totalAmount -= productID.amount;
          state.totalPrice -= productID.totalPrice;
          state.totalPriceWithTax -= productID.totalPriceWithTax;
        }
      } catch (e) {}
    },
    clearCart: (state, action) => {
      const productID = action.payload;

      try {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
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
