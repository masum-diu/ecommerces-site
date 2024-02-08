import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";
import { useConvertCartData } from "../src/hooks/useConvertCartData";

const OrderDetails = () => {
  const { convertCartData } = useConvertCartData();
  const carts = useSelector((state) => state.cart);
  const performOperation = (value1, value2) => {
    return parseFloat((parseFloat(value1) - parseFloat(value2)).toFixed(2));
  };
  const totalProducts = useSelector((state) => state.cart?.totalAmount);
  // const totalProducts = carts?.cart?.length;
  const convertedCart = convertCartData(carts);
  const totalPrice = convertedCart.totalPrice;
  const totalPriceWithoutFragile = convertedCart.totalPriceWithoutFragileCharge;
  const totalPriceWithTax = convertedCart.totalPriceWithTax;

  const totalPrice_after_discount = convertedCart.totalPrice_after_discount;

  const totalPriceWithoutFragile_after_discount =
    convertedCart.totalPriceWithoutFragileCharge_after_discount;

  const totalPriceWithTax_after_discount =
    convertedCart.totalPriceWithTax_after_discount;
  const totalPrice_before_discount =
    convertedCart.totalPriceWithoutFragileCharge;
  const totalDiscountAmount = performOperation(
    totalPriceWithoutFragile,
    totalPriceWithoutFragile_after_discount
  );
  const { selectedCurrency, convertPrice, currentConversionRate } =
    useCurrencyConversion();

  const formatPrice = (amount) => {
    // Assuming amount is a number representing the price
    const currency = localStorage.getItem("currency");
    // Use toLocaleString to format the number with commas and appropriate currency symbol
    if (currency) {
      const formattedPrice = amount.toLocaleString("en-US", {
        // style: "currency",
        currency: currency, // Change the currency code as needed
        minimumFractionDigits: 2,
      });

      return formattedPrice;
    } else {
      return amount;
    }
  };

  console.log("formatPrice", formatPrice(totalPrice_before_discount));
  return (
    <Grid item lg={4} xl={4} md={4} mt={6}>
      <Card
        elevation={2}
        mb={1}
        sx={{ width: { xs: "100%", lg: "90%" }, borderRadius: "10px" }}
      >
        <Stack
          sx={{ width: "100%", mx: "auto", p: 2 }}
          direction={"column"}
          spacing={3.5}
        >
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography
              variant="wishlistPName"
              color="#1B3148"
              className="bold"
            >
              Cart Totals
            </Typography>
          </Stack>
          {/* <Divider /> */}

          {/* <Divider /> */}
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
          >
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              SUBTOTAL :<br />{" "}
              <small style={{ opacity: 0.5 }}>({totalProducts} product)</small>
            </Typography>
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency} {formatPrice(totalPrice_before_discount)}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
          >
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              DISCOUNT :
            </Typography>
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency} {formatPrice(totalDiscountAmount)}
            </Typography>
          </Stack>
          {/* <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
          >
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              SUBTOTAL :
            </Typography>
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency}{" "}
              {formatPrice(totalPriceWithoutFragile_after_discount)}
            </Typography>
          </Stack> */}

          {/* <Divider /> */}
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
          >
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              TAX :
            </Typography>
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
              textAlign={"left"}
              // sx={{ marginLeft: "72px!important" }}
            >
              {selectedCurrency}{" "}
              {formatPrice(
                parseFloat(
                  (
                    totalPriceWithTax_after_discount - totalPrice_after_discount
                  ).toFixed(2)
                )
              )}
            </Typography>
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
          >
            <Typography
              variant="tabText1"
              color="#1B3148"
              className="exterBold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              TOTAL :
            </Typography>
            <Typography
              variant="tabText1"
              color="#1B3148"
              className="exterBold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency}{" "}
              {`${formatPrice(Math.round(totalPriceWithTax_after_discount))}`}
            </Typography>
          </Stack>
          {/* <Divider /> */}
        </Stack>
      </Card>
    </Grid>
  );
};

export default OrderDetails;
