import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
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
            product.color === productID.color
        );

        if (exist) {
          exist.amount++;
          exist.totalPrice += productID.price;
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.price;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            color: productID.color,
            price: productID.price,
            amount: 1,
            totalPrice: productID.price,
          });
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.price;
        }
      } catch (e) {
        return e;
      }
    },
    removeFromCart: (state, action) => {
      const productID = action.payload;

      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.color === product.color
        );

        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id ||
              product.size !== productID.size ||
              product.color !== productID.color
          );
          state.totalAmount--;
          state.totalPrice -= productID.price;
        } else {
          exist.amount--;
          exist.totalPrice -= productID.price;
          state.totalAmount--;
          state.totalPrice;
        }
      } catch (e) {}
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
