import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalPriceWithTax: 0,
  totalPriceOrg: 0,
  totalPriceWithTaxOrg: 0,
  totalFragileCharge: 0,
  totalProductWeight: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productID = action.payload;
      
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productID.id &&
            product.size === productID.size &&
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice += productID.totalPrice;
          exist.totalPriceWithTax += productID.totalPriceWithTax;
          exist.vatAmountParticularProduct +=
            productID.vatAmountParticularProduct;
          exist.totalPriceOrg += productID.totalPriceOrg;
          exist.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg +=
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileCharge;
          exist.totalFragileCharge += productID.totalFragileCharge;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;
          state.totalAmount += productID.totalAmount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalProductWeight += productID.totalProductWeight;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            design_code: productID.design_code,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            colors: productID.colors,
            color_id: productID.color_id,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            priceOrg: productID.priceOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            taxAmount: productID.taxAmount,
            fragileCharge: productID.fragileCharge,
            totalFragileCharge: productID.totalFragileCharge,
            productWeight: productID.productWeight,
            totalProductWeight: productID.totalProductWeight,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.totalPrice;
          state.totalPriceWithTax += productID.totalPriceWithTax;
          state.totalPriceOrg += productID.totalPriceOrg;
          state.totalPriceWithTaxOrg += productID.totalPriceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalProductWeight += productID.totalProductWeight;
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
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );
        // console.log("my", product.id, product.size_id, product.color_id);
        // console.log("my", productID.id, productID.size_id, productID.color_id);
        if (exist) {
          exist.amount += productID.totalAmount;
          exist.totalPrice = productID.totalPrice;
          exist.totalPriceWithTax = productID.totalPriceWithTax;
          exist.vatAmountParticularProduct =
            productID.vatAmountParticularProduct;
          exist.totalPriceOrg = productID.totalPriceOrg;
          exist.totalPriceWithTaxOrg = productID.totalPriceWithTaxOrg;
          exist.vatAmountParticularProductOrg =
            productID.vatAmountParticularProductOrg;
          exist.fragileCharge = productID.fragileCharge;
          exist.totalFragileCharge += productID.totalFragileCharge;
          exist.productWeight = productID.productWeight;
          exist.totalProductWeight += productID.totalProductWeight;
          state.totalAmount += 1;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalProductWeight += productID.totalProductWeight;
        } else {
          state.cart.push({
            id: productID.id,
            image: productID.image,
            name: productID.name,
            text: productID.text,
            size: productID.size,
            size_id: productID.size_id,
            colors: productID.colors,
            color_id: productID.color_id,
            price: productID.price,
            priceWithTax: productID.priceWithTax,
            vatAmountParticularProduct: productID.vatAmountParticularProduct,
            priceOrg: productID.priceOrg,
            priceWithTaxOrg: productID.priceWithTaxOrg,
            vatAmountParticularProductOrg:
              productID.vatAmountParticularProductOrg,
            amount: productID.amount,
            stock: productID.stockAmount,
            totalPrice: productID.totalPrice,
            totalPriceWithTax: productID.totalPriceWithTax,
            totalPriceOrg: productID.totalPriceOrg,
            totalPriceWithTaxOrg: productID.totalPriceWithTaxOrg,
            taxAmount: productID.taxAmount,
            fragileCharge: productID.fragileCharge,
            totalFragileCharge: productID.totalFragileCharge,
            productWeight: productID.productWeight,
            totalProductWeight: productID.totalProductWeight,
          });
          state.totalAmount += productID.amount;
          state.totalPrice += productID.price;
          state.totalPriceWithTax += productID.priceWithTax;
          state.totalPriceOrg += productID.priceOrg;
          state.totalPriceWithTaxOrg += productID.priceWithTaxOrg;
          state.totalFragileCharge += productID.totalFragileCharge;
          state.totalProductWeight += productID.totalProductWeight;
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
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id ||
              product.size !== productID.size ||
              product.size_id !== productID.size_id ||
              product.color_id !== productID.color_id
          );
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalFragileCharge -= productID.totalFragileCharge;
          state.totalProductWeight -= productID.totalProductWeight;
        } else {
          exist.amount--;
          exist.totalPrice -= productID.price;
          exist.vatAmountParticularProduct -=
            productID.vatAmountParticularProduct / productID.amount;
          exist.totalPriceWithTax -= productID.priceWithTax;
          exist.totalPriceOrg -= productID.priceOrg;
          exist.vatAmountParticularProductOrg -=
            productID.vatAmountParticularProductOrg / productID.amount;
          exist.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          exist.totalFragileCharge -= productID.fragileCharge;
          exist.totalProductWeight -= productID.productWeight;
          state.totalAmount--;
          state.totalPrice -= productID.price;
          state.totalPriceWithTax -= productID.priceWithTax;
          state.totalPriceOrg -= productID.priceOrg;
          state.totalPriceWithTaxOrg -= productID.priceWithTaxOrg;
          state.totalFragileCharge -= productID.fragileCharge;
          state.totalProductWeight -= productID.productWeight;
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
            product.size_id === productID.size_id &&
            product.color_id === productID.color_id
        );

        if (exist.amount >= 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id != productID.id || product.size !== productID.size
          );
          state.totalAmount -= productID.amount;
          state.totalPrice -= productID.totalPrice;
          state.totalPriceWithTax -= productID.totalPriceWithTax;
          state.totalPriceOrg -= productID.totalPriceOrg;
          state.totalPriceWithTaxOrg -= productID.totalPriceWithTaxOrg;
          state.totalFragileCharge -= productID.totalFragileCharge;
          state.totalProductWeight -= productID.totalProductWeight;
        }
      } catch (e) {}
    },
    clearCart: (state, action) => {
      const productID = action.payload;

      try {
        state.cart = [];
        state.totalAmount = 0;
        state.totalPrice = 0;
        state.totalPriceWithTax = 0;
        state.totalPriceOrg = 0;
        state.totalPriceWithTaxOrg = 0;
        state.totalFragileCharge = 0;
        state.totalProductWeight = 0;
      } catch (e) {}
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCart,
  decreaseFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
