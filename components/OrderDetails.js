import {
  Box,
  Button,
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
  const convertedCart = convertCartData(carts);
  const totalPrice = convertedCart.totalPrice;
  const totalPriceWithoutFragile = convertedCart.totalPriceWithoutFragileCharge;
  const totalPriceWithTax = convertedCart.totalPriceWithTax;
  const { selectedCurrency, convertPrice, currentConversionRate } =
    useCurrencyConversion();
  return (
    <Grid item lg={4} xl={3} md={4} mt={4}>
      <Paper elevation={1} mb={1} sx={{ width: "100%" }}>
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
            <Typography variant="homeFlash" color="initial" className="bold">
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
              color="initial"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              SUBTOTAL :
            </Typography>
            <Typography
              variant="cardHeader"
              color="initial"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency} {totalPriceWithoutFragile}
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
              color="initial"
              className="bold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              TAX :
            </Typography>
            <Typography
              variant="cardHeader"
              color="initial"
              className="bold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
              textAlign={"left"}
              // sx={{ marginLeft: "72px!important" }}
            >
              {selectedCurrency}{" "}
              {parseFloat((totalPriceWithTax - totalPrice).toFixed(2))}
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
              color="initial"
              className="exterBold"
              sx={{ width: { xs: "50%", lg: "60%", xl: "50%" } }}
            >
              TOTAL :
            </Typography>
            <Typography
              variant="tabText1"
              color="initial"
              className="exterBold"
              sx={{ width: { xs: "50%", lg: "40%", xl: "50%" } }}
            >
              {selectedCurrency} {totalPriceWithTax}
            </Typography>
          </Stack>
          {/* <Divider /> */}
        </Stack>
      </Paper>
    </Grid>
  );
};

export default OrderDetails;
