import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGuestCheckout: false,
};

export const checkoutSlice = createSlice({
  name: "checkoutState",
  initialState,
  reducers: {
    changeIsCheckout: (state, action) => {
      try {
        state.isGuestCheckout = action.payload;
      } catch (e) {
        return e;
      }
    },
  },
});

export const { changeIsCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
