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
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
});
