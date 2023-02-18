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
      console.log('your log output inside stor',productID)
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
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.totalPrice;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            color: productID.color,
            colorCode: productID.colorCode,
            price: productID.price,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPrice;
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
          state.totalAmount += productID.totalAmount;
          state.totalPrice = productID.totalPrice;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            color: productID.color,
            colorCode: productID.colorCode,
            price: productID.price,
            amount: productID.amount,
            stock:productID.stockAmount,
            totalPrice: productID.totalPrice,
          });
          state.totalAmount += productID.amount;
          state.totalPrice = productID.totalPrice;
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
        } else {
          exist.amount--;
          exist.totalPrice -= productID.price;
          state.totalAmount--;
          state.totalPrice -= productID.price;
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
        }
      } catch (e) {}
    },
  },
});

export const { addToCart, removeFromCart, increaseCart, decreaseFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
