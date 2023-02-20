import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import { productApi } from "../features/api/apiSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import filterSlice from "../features/filter/filterSlice";
import wishListSlice from "../features/wishlist/wishListSlice";

const reducers = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  cart: cartSlice,
  filter: filterSlice,
  wishList: wishListSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
