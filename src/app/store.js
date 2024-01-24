import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import { productApi } from "../features/api/apiSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "./persistStore";
import wishListSlice from "../features/wishlist/wishListSlice";
import checkoutSlice from "../features/checkout/checkoutSlice";

let ENV = "development";
// let ENV = "production";
const reducers = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  cart: cartSlice,
  wishList: wishListSlice,
  checkoutSlice: checkoutSlice,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["productApi"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(productApi.middleware),
  devTools: ENV === "production" ? false : true,
});
