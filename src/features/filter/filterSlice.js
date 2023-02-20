import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stock: false,
  brands: [],
  keyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      try {
        const filter = ""
      } catch (e) {}
    },
  },
});

export const {} = filterSlice.actions;

export default filterSlice.reducer;
