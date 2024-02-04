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
  const totalProducts = carts?.cart?.length;
  const convertedCart = convertCartData(carts);
  const totalPrice = convertedCart.totalPrice;
  const totalPriceWithoutFragile = convertedCart.totalPriceWithoutFragileCharge;
  const totalPriceWithTax = convertedCart.totalPriceWithTax;

  const totalPrice_after_discount = convertedCart.totalPrice_after_discount;

  const totalPriceWithoutFragile_after_discount =
    convertedCart.totalPriceWithoutFragileCharge_after_discount;

  const totalPriceWithTax_after_discount =
    convertedCart.totalPriceWithTax_after_discount;
  const totalDiscountAmount = performOperation(
    totalPriceWithoutFragile,
    totalPriceWithoutFragile_after_discount
  );
  const { selectedCurrency, convertPrice, currentConversionRate } =
    useCurrencyConversion();
  return (
    <Grid item lg={4} xl={4} md={4}>
      <Card elevation={4} mb={1} sx={{ width: "100%",borderRadius:"10px" }}>
        <Stack
          sx={{ width: "100%", mx: "auto", p: 2 }}
          direction={"column"}
          spacing={2}
        >
          <Stack
            direction={"row"}
            spacing={{ xs: 1, lg: 0, xl: 1 }}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography variant="wishlistPName" color="#1B3148" className="bold">
              Cart Totals
            </Typography>
          </Stack>
          <Divider />

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
              <small style={{ opacity: 0.5 }}>({totalProducts}product)</small>
            </Typography>
            <Typography
              variant="cardHeader"
              color="#1B3148"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency} {totalPriceWithoutFragile_after_discount}
            </Typography>
          </Stack>

          <Divider />
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
              {selectedCurrency} {totalDiscountAmount}
            </Typography>
          </Stack>

          <Divider />
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
              {parseFloat(
                (
                  totalPriceWithTax_after_discount - totalPrice_after_discount
                ).toFixed(2)
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
              {selectedCurrency} {totalPriceWithTax_after_discount}
            </Typography>
          </Stack>
          {/* <Divider /> */}
        </Stack>
      </Card>
    </Grid>
  );
};

export default OrderDetails;
