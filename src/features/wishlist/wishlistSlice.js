import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  amount: 0,
  totalAmount: 0,
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      // state.cart.push(action.payload);
      const productID = action.payload;
      // console.log("your log output inside stor", productID);
      try {
        const exist = state.wishList.find(
          (product) => product.id === productID.id
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          state.totalAmount += productID.totalAmount;
        } else {
          state.wishList.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            color: productID.color,
            price: productID.price,
            amount: productID.amount,
            stock: productID.stock,
            totalAmount: productID.totalAmount,
          });
          state.totalAmount += productID.amount;
        }
      } catch (e) {
        return e;
      }
    },
    removeFromWishList: (state, action) => {
      const productID = action.payload;
      console.log('your sdfsdfsdfst',state.totalAmount)

      try {
        const exist = state.wishList.find(
          (product) => product.id === productID.id
        );
        // console.log("your log output", exist);
        if (exist.totalAmount >= 1) {
          state.wishList = state.wishList.filter(
            (product) => product.id != productID.id
          );
          state.totalAmount -= productID.amount;
        }
      } catch (e) {}
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;

/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  amount: 0,
  totalAmount: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  addToWishList: (state, action) => {
    const productID = action.payload;
    console.log("your log output inside stor", productID);
    try {
      const exist = state.wishList.find((product) => product.id === productID.id);

      if (exist) {
        exist.amount += productID.totalAmount;
        state.totalAmount += productID.totalAmount;
      } else {
        state.wishList.push({
          id: productID.id,
          image: productID.image,
          name: productID.name,
          text: productID.text,
          size: productID.size,
          color: productID.color,
          price: productID.price,
          amount: productID.amount,
          stock: productID.stockAmount,
          totalAmount: productID.totalAmount,
        });
        state.totalAmount += productID.amount;
      }
    } catch (e) {
      return e;
    }
  },
  removeFromWishList: (state, action) => {
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
      }
    } catch (e) {}
  },
});
export const { addToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
 */
