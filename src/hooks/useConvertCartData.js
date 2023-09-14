import { useCurrencyConversion } from "./useCurrencyConversion";

export function useConvertCartData() {
  const convertCartData = (cartData) => {
    const { convertPrice } = useCurrencyConversion(); // Use your custom hook here

    // Convert data inside the cart array
    const convertedCart = cartData.cart.map((item) => {
      const convertedItem = { ...item };
      convertedItem.price = convertPrice(item.price);
      convertedItem.priceWithoutFragile = convertPrice(
        item.priceWithoutFragile
      );
      convertedItem.priceWithTax = convertPrice(item.priceWithTax);
      convertedItem.vatAmountParticularProduct = convertPrice(
        item.vatAmountParticularProduct
      );
      convertedItem.totalPrice = convertPrice(item.totalPrice);
      convertedItem.totalPriceWithTax = convertPrice(item.totalPriceWithTax);
      convertedItem.taxAmount = convertPrice(item.taxAmount);
      convertedItem.fragileCharge = convertPrice(item.fragileCharge);
      convertedItem.totalFragileCharge = convertPrice(item.totalFragileCharge);
      convertedItem.totalPriceWithoutFragileCharge = convertPrice(
        item.totalPriceWithoutFragileCharge
      );
      return convertedItem;
    });

    // Convert data outside the cart array
    const convertedTotalFragileCharge = convertPrice(
      cartData.totalFragileCharge
    );
    const convertedTotalPrice = convertPrice(cartData.totalPrice);
    const convertedTotalPriceWithTax = convertPrice(cartData.totalPriceWithTax);
    const convertedTotalPriceWithoutFragileCharge = convertPrice(
      cartData.totalPriceWithoutFragileCharge
    );

    // Return the converted data
    return {
      ...cartData,
      cart: convertedCart,
      totalFragileCharge: convertedTotalFragileCharge,
      totalPrice: convertedTotalPrice,
      totalPriceWithTax: convertedTotalPriceWithTax,
      totalPriceWithoutFragileCharge: convertedTotalPriceWithoutFragileCharge,
    };
  };

  return {
    convertCartData,
  };
}
