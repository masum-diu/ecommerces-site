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
            product.id === productID &&
            product.size === productID.size &&
            product.color === product.color
        );

        if (exist) {
          exist.amount++;
          exist.totalPrice+=productID.price;
          state.totalAmount++;
          state.totalPrice+=productID.price;

        }else{
          state.cart.push({
            id:productID.id,
            price:productID.price,
            size:productID.size,
            color:productID.color,
            amount:1,
            totalPrice:productID.price,
            name:productID.name,

          })
          state.totalAmount++;
          state.totalPrice += productID.price;
        }
      } catch (e) {
        return e;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
