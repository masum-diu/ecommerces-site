import { createSlice } from "@reduxjs/toolkit";

const carts = typeof window !== 'undefined' ? localStorage.getItem('cart') !== null ?JSON.parse(localStorage.getItem("cart")):[]:null
const totalAmount = typeof window !== 'undefined' ? localStorage.getItem('totalAmount') !== null ?JSON.parse(localStorage.getItem("totalAmount")):0:null
const totalPrice = typeof window !== 'undefined' ? localStorage.getItem('totalPrice') !== null ?JSON.parse(localStorage.getItem("totalPrice")):0:null

const initialState = {
  cart: carts,
  amount: 0,
  totalAmount: totalAmount,
  totalPrice: totalPrice,
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
            size_id:productID.size_id,
            color: productID.color,
            color_id:productID.color_id,
            colorCode: productID.colorCode,
            price: productID.price,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPrice;
          localStorage.setItem("cart",JSON.stringify(state.cart.map((cart)=>cart)))
          localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount))
          localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice))
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
          state.totalAmount += 1;
          state.totalPrice += productID.price;
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
          state.totalPrice += productID.price;
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
