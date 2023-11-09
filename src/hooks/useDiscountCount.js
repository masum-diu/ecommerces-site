const useDiscountCount = () => {
  const updatedPriceAfterDiscount = (
    productPrice,
    discountAmount,
    discountType
  ) => {
    if (discountType === "percentage") {
      const updatedPrice = (
        productPrice -
        productPrice * (discountAmount / 100)
      ).toFixed(2);

      return {
        updatedPrice: parseFloat(updatedPrice),
        discountAmount: discountAmount,
        discountType: discountType,
      };
    }
    if (discountType === "flat") {
      const updatedPrice = (productPrice - discountAmount).toFixed(2);

      return {
        updatedPrice: parseFloat(updatedPrice),
        discountAmount: discountAmount,
        discountType: discountType,
      };
    }
    if (discountType === undefined) {
      return {
        updatedPrice: parseFloat(productPrice),
        discountAmount: discountAmount,
        discountType: discountType,
      };
    }
  };

  return {
    updatedPriceAfterDiscount,
  };
};

export default useDiscountCount;
