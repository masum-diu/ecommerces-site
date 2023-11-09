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

      // converting discount prices
      convertedItem.price_after_discount = convertPrice(
        item.price_after_discount
      );
      convertedItem.priceWithoutFragile_after_discount = convertPrice(
        item.priceWithoutFragile_after_discount
      );
      convertedItem.priceWithTax_after_discount = convertPrice(
        item.priceWithTax_after_discount
      );
      convertedItem.vatAmountParticularProduct_after_discount = convertPrice(
        item.vatAmountParticularProduct_after_discount
      );
      convertedItem.totalPrice_after_discount = convertPrice(
        item.totalPrice_after_discount
      );
      convertedItem.totalPriceWithTax_after_discount = convertPrice(
        item.totalPriceWithTax_after_discount
      );
      // convertedItem.taxAmount = convertPrice(item.taxAmount);
      // convertedItem.fragileCharge = convertPrice(item.fragileCharge);
      // convertedItem.totalFragileCharge = convertPrice(item.totalFragileCharge);
      convertedItem.totalPriceWithoutFragileCharge_after_discount =
        convertPrice(item.totalPriceWithoutFragileCharge_after_discount);
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

    // converting state data
    const convertedTotalPrice_after_discount = convertPrice(
      cartData.totalPrice_after_discount
    );
    const convertedTotalPriceWithTax_after_discount = convertPrice(
      cartData.totalPriceWithTax_after_discount
    );
    const convertedTotalPriceWithoutFragileCharge_after_discount = convertPrice(
      cartData.totalPriceWithoutFragileCharge_after_discount
    );

    // Return the converted data
    return {
      ...cartData,
      cart: convertedCart,
      totalFragileCharge: convertedTotalFragileCharge,
      totalPrice: convertedTotalPrice,
      totalPriceWithTax: convertedTotalPriceWithTax,
      totalPriceWithoutFragileCharge: convertedTotalPriceWithoutFragileCharge,
      totalPrice_after_discount: convertedTotalPrice_after_discount,
      totalPriceWithTax_after_discount:
        convertedTotalPriceWithTax_after_discount,
      totalPriceWithoutFragileCharge_after_discount:
        convertedTotalPriceWithoutFragileCharge_after_discount,
    };
  };

  return {
    convertCartData,
  };
}
