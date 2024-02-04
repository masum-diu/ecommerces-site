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
import { MdClose } from "react-icons/md";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
  removeFromCart,
  increaseCart,
  decreaseFromCart,
} from "../src/features/cart/cartSlice";

import toast from "react-hot-toast";
import LoginModal from "../components/LoginModal";
import { FiHeart } from "react-icons/fi";
import USER_CONTEXT from "../components/userContext";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";
import { useConvertCartData } from "../src/hooks/useConvertCartData";
import OrderDetails from "../components/OrderDetails";
import { MdCancelPresentation } from "react-icons/md";
import * as fbq from "../lib/fpixel";

const addtocart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const dataFetchedRef = useRef(false);
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const { convertCartData } = useConvertCartData();
  const [loading, setLoading] = useState(true);
  // const cart = useSelector((state) => state.cart.cart);
  const [openLoginModal, setLoginModal] = useState(false);
  const carts = useSelector((state) => state.cart);
  const [isProceedClicked, setIsProceedClicked] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const {
    isProceedCheckout,
    setIsProceedCheckout,
    keepShowing,
    setKeepShowing,
  } = useContext(USER_CONTEXT);
  const removeItemFromCart = async (data) => {
    dispatch(removeFromCart(data));
    toast.error("Removed From Cart!");
  };
  const convertedCart = convertCartData(carts);
  const cart = convertedCart.cart;
  useEffect(() => {
    if (isProceedClicked === true) {
      const securePage = async () => {
        const token = await localStorage.getItem("acesstoken");
        if (!token) {
          setLoginModal(true);
          // await toast.error("Please Login First");
          await router.push("/addtocart");
          setIsProceedClicked(false);
        } else {
          setLoading(false);
          router.push("/checkout");
        }
      };
      securePage();
    }
  }, [isProceedClicked]);

  const handleProceedToCheckout = () => {
    setIsProceedClicked(true);
    setIsProceedCheckout(true);
    setKeepShowing(true);
    fbq.event("InitiateCheckout");
  };
  const performDoubleOperation = (value1, value2) => {
    return parseFloat((parseFloat(value1) + parseFloat(value2)).toFixed(2));
  };

  const performSingleOperation = (value1) => {
    return parseFloat(parseFloat(value1).toFixed(2));
  };

  return (
    <>
      <HomePageIntro title={"Cart "} />
      <Box
        sx={{
          height: { lg: "100%", xs: "fit-content" },
          py: 15,
          width: { lg: "90%", xs: "100%" },
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="header1"
            color="#1B3148"
            textAlign={"center"}
            textTransform={"uppercase"}
            className="bold"
          >
            Cart
          </Typography>
          <Grid container spacing={5} pt={5} xs={12}>
            <Grid
              item
              lg={12}
              sx={{
                width: { xs: "100%", xms: "90%", sm: "85%" },
                margin: "0 auto",
              }}
            >
              <Hidden only={["md", "lg", "xl"]}>
                {cart?.length > 0 ? (
                  <>
                    <Stack direction={"column"} spacing={2}>
                      {cart?.map((data) => (
                        <>
                          <Grid
                            container
                            sx={{
                              width: "100%",
                              borderRadius: "10px",
                              border: "1px solid #CECECE",
                              pl: ".2rem",
                            }}
                          >
                            <Grid
                              item
                              xs={4}
                              xms={4}
                              sm={3}
                              sx={{ width: "30%" }}
                            >
                              <Stack
                                sx={{
                                  width: { xs: "90%", xms: "80%", sm: "70%" },
                                  bgcolor: "black",
                                  paddingTop: {
                                    xs: "5px",
                                    xms: "4px",
                                    sm: "5px",
                                  },
                                  paddingBottom: {
                                    xs: "5px",
                                    xms: "4px",
                                    sm: "5px",
                                  },
                                  marginLeft: "4px",
                                  height: "100%",
                                }}
                                direction={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  src={data.image}
                                  alt=""
                                />
                              </Stack>
                            </Grid>
                            <Grid
                              item
                              xs={5}
                              xms={5}
                              sm={6}
                              sx={{ width: "40%", mt: 2 }}
                            >
                              {/* <Typography variant="homeFlash" color="#1B3148">
                                {data?.name}
                              </Typography> */}
                              <Stack
                                sx={{ height: "100%" }}
                                direction={"column"}
                                spacing={2}
                              >
                                {" "}
                                <Typography
                                  variant="homeFlash"
                                  color="#1B3148"
                                  className="bold"
                                  sx={{ fontWeight: "900" }}
                                >
                                  {data?.name}
                                </Typography>
                                <Stack
                                  direction={"row"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                >
                                  <Typography
                                    variant="cardLocation1"
                                    color="#1B3148"
                                  >
                                    SIZE: {data.size ? data.size : "N/A"}
                                  </Typography>
                                  <Stack
                                    direction={"row"}
                                    spacing={1}
                                    alignItems={"center"}
                                    pl={3}
                                  >
                                    <Typography variant="cardLocation1">
                                      Colors:{" "}
                                    </Typography>

                                    {data?.color_name ? (
                                      <Typography
                                        variant="cardLocation1"
                                        color="#1B3148"
                                      >
                                        {data?.color_name}
                                      </Typography>
                                    ) : (
                                      <Typography variant="cardLocation1">
                                        N/A
                                      </Typography>
                                    )}
                                  </Stack>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  justifyContent={"flex-start"}
                                  alignItems={"center"}
                                >
                                  {data?.discountType ? (
                                    <Stack>
                                      <Typography
                                        variant="cardHeader3"
                                        color="#1B3148"
                                        className="bold"
                                        sx={{
                                          border: "1px solid #3D5675",
                                          borderRadius: "5px",
                                          padding: "1px",
                                        }}
                                      >
                                        -{data?.discount}
                                        {data?.discountType === "percentage"
                                          ? "%"
                                          : ""}
                                      </Typography>
                                    </Stack>
                                  ) : (
                                    ""
                                  )}

                                  <Stack
                                    direction={"column"}
                                    justifyContent={"space-between"}
                                    sx={{
                                      paddingLeft: {
                                        xs: `${
                                          data?.discountType !== undefined
                                            ? ".5rem"
                                            : 0
                                        }`,
                                        xms: `${
                                          data?.discountType !== undefined
                                            ? ".5rem"
                                            : 0
                                        }`,
                                        sm: `${
                                          data?.discountType !== undefined
                                            ? ".5rem"
                                            : 0
                                        }`,
                                      },
                                    }}
                                    // pl={{ xs: 1, xms: 1, sm: 1 }}
                                  >
                                    <Typography
                                      variant={`${
                                        data?.discountType !== undefined
                                          ? "cardLocation1"
                                          : "subtitle1"
                                      }`}
                                      style={{
                                        textDecorationLine: `${
                                          data?.discountType !== undefined
                                            ? "line-through"
                                            : "none"
                                        }`,
                                      }}
                                      sx={{ fontWeight: "900" }}
                                    >
                                      {selectedCurrency}{" "}
                                      {data?.totalPriceWithoutFragileCharge}
                                    </Typography>
                                    {data?.discountType !== undefined ? (
                                      <Typography
                                        variant="homeFlash"
                                        color="#1B3148"
                                        className="bold"
                                        sx={{ fontWeight: "900" }}
                                      >
                                        {selectedCurrency}{" "}
                                        {
                                          data.totalPriceWithoutFragileCharge_after_discount
                                        }
                                      </Typography>
                                    ) : (
                                      ""
                                    )}
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              xms={3}
                              sm={3}
                              sx={{ width: "20%", mt: 2 }}
                            >
                              <Stack
                                sx={{ width: "100%" }}
                                direction={"column"}
                                alignItems={"flex-end"}
                                spacing={5}
                                justifyContent={"space-around"}
                              >
                                <Stack
                                  direction={"row"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  <IconButton
                                    onClick={() => removeItemFromCart(data)}
                                  >
                                    <img
                                      width={20}
                                      src="/assets/close-square.svg"
                                      alt=""
                                    />
                                  </IconButton>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  sx={{
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "5px",
                                    width: { sm: "85%" },
                                  }}
                                  style={{
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {/* <Stack>
                                    <Typography
                                      variant="cardHeader3"
                                      color="#959595"
                                      className="SemiBold"
                                    >
                                      Quantity
                                    </Typography>
                                    
                                  </Stack> */}

                                  <IconButton
                                    size="small"
                                    aria-label="reduce"
                                    onClick={() =>
                                      dispatch(decreaseFromCart(data))
                                    }
                                  >
                                    <KeyboardArrowDownIcon fontSize="small" />
                                  </IconButton>
                                  <Typography
                                    variant="cardHeader3"
                                    color="#1B3148"
                                  >
                                    {" "}
                                    {data.amount}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    aria-label="increase"
                                    onClick={() =>
                                      dispatch(
                                        increaseCart({
                                          id: data.id,
                                          image: data.image,
                                          name: data.name,
                                          design_code: data.design_code,
                                          size: data.size,
                                          size_id: data.size_id,
                                          text: data.text,
                                          colors: data.colors,
                                          color_id: data.color_id,
                                          price: data.price,
                                          priceOrg: data.priceOrg,
                                          totalFragileCharge:
                                            data.fragileCharge,
                                          totalFragileChargeOrg:
                                            data.fragileChargeOrg,
                                          fragileCharge: data.fragileCharge,
                                          fragileChargeOrg:
                                            data.fragileChargeOrg,
                                          totalProductWeight:
                                            data.productWeight,
                                          productWeight: data.productWeight,
                                          vatAmountParticularProduct:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) /
                                              data.amount,
                                          priceWithTax: parseFloat(
                                            data.priceWithTaxOrg
                                          ),
                                          vatAmountParticularProductOrg:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) /
                                              data.amount,
                                          priceWithTaxOrg: parseFloat(
                                            data.priceWithTaxOrg
                                          ),
                                          priceWithoutFragile:
                                            data.priceWithoutFragileOrg,
                                          priceWithoutFragileOrg:
                                            data.priceWithoutFragileOrg,
                                          amount: data.amount + 1,
                                          stock: data.stock,
                                          totalAmount: 1,
                                          totalPrice:
                                            data.totalPriceOrg +
                                            parseFloat(data.priceOrg),
                                          totalPriceWithoutFragileCharge:
                                            data.totalPriceWithoutFragileChargeOrg +
                                            parseFloat(
                                              data.priceWithoutFragileOrg
                                            ),
                                          totalPriceWithTax:
                                            data.totalPriceWithTaxOrg +
                                            parseFloat(data.priceWithTaxOrg),
                                          totalPriceOrg:
                                            data.totalPriceOrg +
                                            parseFloat(data.priceOrg),
                                          totalPriceWithoutFragileChargeOrg:
                                            data.totalPriceWithoutFragileChargeOrg +
                                            parseFloat(
                                              data.priceWithoutFragileOrg
                                            ),
                                          totalPriceWithTaxOrg:
                                            data.totalPriceWithTaxOrg +
                                            parseFloat(data.priceWithTaxOrg),

                                          // set cart data for discount price
                                          price_after_discount:
                                            data.price_after_discount,
                                          priceOrg_after_discount:
                                            data.priceOrg_after_discount,
                                          priceWithTax_after_discount:
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          priceWithTaxOrg_after_discount:
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          vatAmountParticularProduct_after_discount:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) /
                                              data.amount,
                                          vatAmountParticularProductOrg_after_discount:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) /
                                              data.amount,
                                          totalPrice_after_discount:
                                            data.totalPriceOrg_after_discount +
                                            parseFloat(
                                              data.priceOrg_after_discount
                                            ),
                                          totalPriceOrg_after_discount:
                                            data.totalPriceOrg_after_discount +
                                            parseFloat(
                                              data.priceOrg_after_discount
                                            ),
                                          totalPriceWithTax_after_discount:
                                            data.totalPriceWithTaxOrg_after_discount +
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          totalPriceWithTaxOrg_after_discount:
                                            data.totalPriceWithTaxOrg_after_discount +
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          priceWithoutFragile_after_discount:
                                            data.priceWithoutFragileOrg_after_discount,
                                          priceWithoutFragileOrg_after_discount:
                                            data.priceWithoutFragileOrg_after_discount,
                                          totalPriceWithoutFragileCharge_after_discount:
                                            data.totalPriceWithoutFragileChargeOrg_after_discount +
                                            parseFloat(
                                              data.priceWithoutFragileOrg_after_discount
                                            ),
                                          totalPriceWithoutFragileChargeOrg_after_discount:
                                            data.totalPriceWithoutFragileChargeOrg_after_discount +
                                            parseFloat(
                                              data.priceWithoutFragileOrg_after_discount
                                            ),
                                        })
                                      )
                                    }
                                  >
                                    <KeyboardArrowUpIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </Grid>
                          </Grid>
                          {/* <Stack
                            key={data.id}
                            spacing={1}
                            direction={{
                              lg: "row",
                              xs: "column",
                              md: "row",
                              xl: "row",
                            }}
                            sx={{
                              width: "100%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => removeItemFromCart(data)}
                            >
                              <MdClose />
                            </IconButton>
                            <img src={data.image} alt="" width={100} />
                            <Typography variant="subtitle1" color="#1B3148">
                              {data?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="#1B3148">
                              {data?.design_code}
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={2}
                              alignItems={"center"}
                            >
                              <Typography>Colors: </Typography>
                              
                              {data?.color_name ? (
                                <Typography variant="subtitle1" color="#1B3148">
                                  {data?.color_name}
                                </Typography>
                              ) : (
                                <Typography>N/A</Typography>
                              )}
                            </Stack>
                            <Typography variant="subtitle1" color="#1B3148">
                              SIZE: {data.size ? data.size : "N/A"}
                            </Typography>
                            <Typography variant="subtitle1" color="#1B3148">
                              {selectedCurrency}{" "}
                              {
                                data.totalPriceWithoutFragileCharge_after_discount
                              }
                            </Typography>
                            <Stack
                              direction={"row"}
                              alignItems="center"
                              justifyContent={"space-between"}
                              spacing={2}
                            >
                              <Typography variant="subtitle1" color="#1B3148">
                                Quantity: {data.amount}
                              </Typography>

                              <Stack direction={"column"} alignItems={"center"}>
                                <Stack textAlign={"center"}>
                                  <IconButton
                                    aria-label="increase"
                                    onClick={() =>
                                      dispatch(
                                        increaseCart({
                                          id: data.id,
                                          image: data.image,
                                          name: data.name,
                                          design_code: data.design_code,
                                          size: data.size,
                                          size_id: data.size_id,
                                          text: data.text,
                                          colors: data.colors,
                                          color_id: data.color_id,
                                          price: data.price,
                                          priceOrg: data.priceOrg,
                                          totalFragileCharge:
                                            data.fragileCharge,
                                          totalFragileChargeOrg:
                                            data.fragileChargeOrg,
                                          fragileCharge: data.fragileCharge,
                                          fragileChargeOrg:
                                            data.fragileChargeOrg,
                                          totalProductWeight:
                                            data.productWeight,
                                          productWeight: data.productWeight,
                                          vatAmountParticularProduct:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) /
                                              data.amount,
                                          priceWithTax: parseFloat(
                                            data.priceWithTaxOrg
                                          ),
                                          vatAmountParticularProductOrg:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg
                                            ) /
                                              data.amount,
                                          priceWithTaxOrg: parseFloat(
                                            data.priceWithTaxOrg
                                          ),
                                          priceWithoutFragile:
                                            data.priceWithoutFragileOrg,
                                          priceWithoutFragileOrg:
                                            data.priceWithoutFragileOrg,
                                          amount: data.amount + 1,
                                          stock: data.stock,
                                          totalAmount: 1,
                                          totalPrice:
                                            data.totalPriceOrg +
                                            parseFloat(data.priceOrg),
                                          totalPriceWithoutFragileCharge:
                                            data.totalPriceWithoutFragileChargeOrg +
                                            parseFloat(
                                              data.priceWithoutFragileOrg
                                            ),
                                          totalPriceWithTax:
                                            data.totalPriceWithTaxOrg +
                                            parseFloat(data.priceWithTaxOrg),
                                          totalPriceOrg:
                                            data.totalPriceOrg +
                                            parseFloat(data.priceOrg),
                                          totalPriceWithoutFragileChargeOrg:
                                            data.totalPriceWithoutFragileChargeOrg +
                                            parseFloat(
                                              data.priceWithoutFragileOrg
                                            ),
                                          totalPriceWithTaxOrg:
                                            data.totalPriceWithTaxOrg +
                                            parseFloat(data.priceWithTaxOrg),

                                          // set cart data for discount price
                                          price_after_discount:
                                            data.price_after_discount,
                                          priceOrg_after_discount:
                                            data.priceOrg_after_discount,
                                          priceWithTax_after_discount:
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          priceWithTaxOrg_after_discount:
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          vatAmountParticularProduct_after_discount:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) /
                                              data.amount,
                                          vatAmountParticularProductOrg_after_discount:
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) +
                                            parseFloat(
                                              data.vatAmountParticularProductOrg_after_discount
                                            ) /
                                              data.amount,
                                          totalPrice_after_discount:
                                            data.totalPriceOrg_after_discount +
                                            parseFloat(
                                              data.priceOrg_after_discount
                                            ),
                                          totalPriceOrg_after_discount:
                                            data.totalPriceOrg_after_discount +
                                            parseFloat(
                                              data.priceOrg_after_discount
                                            ),
                                          totalPriceWithTax_after_discount:
                                            data.totalPriceWithTaxOrg_after_discount +
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          totalPriceWithTaxOrg_after_discount:
                                            data.totalPriceWithTaxOrg_after_discount +
                                            parseFloat(
                                              data.priceWithTaxOrg_after_discount
                                            ),
                                          priceWithoutFragile_after_discount:
                                            data.priceWithoutFragileOrg_after_discount,
                                          priceWithoutFragileOrg_after_discount:
                                            data.priceWithoutFragileOrg_after_discount,
                                          totalPriceWithoutFragileCharge_after_discount:
                                            data.totalPriceWithoutFragileChargeOrg_after_discount +
                                            parseFloat(
                                              data.priceWithoutFragileOrg_after_discount
                                            ),
                                          totalPriceWithoutFragileChargeOrg_after_discount:
                                            data.totalPriceWithoutFragileChargeOrg_after_discount +
                                            parseFloat(
                                              data.priceWithoutFragileOrg_after_discount
                                            ),
                                        })
                                      )
                                    }
                                  >
                                    <KeyboardArrowUpIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                                <Stack textAlign={"center"}>
                                  <IconButton
                                    size="small"
                                    aria-label="reduce"
                                    onClick={() =>
                                      dispatch(decreaseFromCart(data))
                                    }
                                  >
                                    <KeyboardArrowDownIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Stack> */}
                          {/* <Divider /> */}
                        </>
                      ))}
                      <br />
                      <OrderDetails></OrderDetails>
                      <br />
                      <Stack
                        direction={{ lg: "row", xs: "column" }}
                        spacing={2}
                        justifyContent={"flex-end"}
                      >
                        {" "}
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#af7b29",
                            "&:hover": {
                              bgcolor: "#af7b29",
                            },
                          }}
                          onClick={() => router.push("/shop")}
                        >
                          CONTINUE SHOPPING
                        </Button>
                        <Button
                          variant="contained"
                          color="background2"
                          onClick={() => handleProceedToCheckout()}
                        >
                          proceed to checkout
                        </Button>
                      </Stack>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack
                      direction={"column"}
                      spacing={2}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 10,
                      }}
                    >
                      <ProductionQuantityLimitsIcon
                        style={{ color: "#0A0A0A", fontSize: "128px" }}
                      ></ProductionQuantityLimitsIcon>
                      <Typography variant="header1">
                        Your cart is currently empty.
                      </Typography>
                    </Stack>
                  </>
                )}
              </Hidden>
            </Grid>
          </Grid>
        </Stack>
        <Hidden only={["xms", "xs", "sm"]}>
          {cart?.length > 0 ? (
            <>
              <Grid
                container
                spacing={5}
                pt={5}
                xs={12}
                alignItems={"flex-start"}
                sx={{ margin: "0 auto" }}
                pr={5}
              >
                <Grid item lg={8} xl={8} md={8} justifyContent={"space-around"}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {cart?.map((data) => (
                          <Card
                            key={data?.id}
                            variant="outlined"
                            sx={{ marginBottom: "8px",borderRadius:"10px" }}
                          >
                            <TableRow>
                              <TableCell sx={{ border: "none" }}>
                                <img
                                  style={{ borderRadius: "10px" }}
                                  src={data?.image}
                                  alt=""
                                  width={100}
                                />
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  width: { md: "35%", lg: "50%" },
                                }}
                              >
                                <Stack
                                  sx={{ height: "100%" }}
                                  direction={"column"}
                                  spacing={2}
                                >
                                  {" "}
                                  <Typography
                                    variant="subtitle1"
                                    color="#1B3148"
                                    className="bold"
                                    sx={{ fontWeight: "900" }}
                                  >
                                    {data?.name}
                                  </Typography>
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                  >
                                    <Typography
                                      variant="cardLocation1"
                                      color="#1B3148"
                                    >
                                      SIZE: {data.size ? data.size : "N/A"}
                                    </Typography>
                                    <Stack
                                      direction={"row"}
                                      spacing={1}
                                      alignItems={"center"}
                                      pl={3}
                                    >
                                      <Typography variant="cardLocation1">
                                        Colors:{" "}
                                      </Typography>

                                      {data?.color_name ? (
                                        <Typography
                                          variant="cardLocation1"
                                          color="#1B3148"
                                        >
                                          {data?.color_name}
                                        </Typography>
                                      ) : (
                                        <Typography variant="cardLocation1">
                                          N/A
                                        </Typography>
                                      )}
                                    </Stack>
                                  </Stack>
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                  >
                                    {data?.discountType ? (
                                      <Stack>
                                        <Typography
                                          variant="cardHeader3"
                                          color="#1B3148"
                                          className="bold"
                                          sx={{
                                            border: "1px solid #3D5675",
                                            borderRadius: "5px",
                                            padding: "1px",
                                          }}
                                        >
                                          -{data?.discount}
                                          {data?.discountType === "percentage"
                                            ? "%"
                                            : ""}
                                        </Typography>
                                      </Stack>
                                    ) : (
                                      ""
                                    )}

                                    <Stack
                                      direction={"column"}
                                      justifyContent={"space-between"}
                                      sx={{
                                        paddingLeft: {
                                          md: `${
                                            data?.discountType !== undefined
                                              ? "1rem"
                                              : 0
                                          }`,
                                          lg: `${
                                            data?.discountType !== undefined
                                              ? "1rem"
                                              : 0
                                          }`,
                                          xl: `${
                                            data?.discountType !== undefined
                                              ? "1rem"
                                              : 0
                                          }`,
                                        },
                                      }}
                                      /* pl={{
                                        md: `${
                                          data?.discountType !== undefined
                                            ? 1
                                            : 0
                                        }`,
                                        lg: `${
                                          data?.discountType !== undefined
                                            ? 5
                                            : 0
                                        }`,
                                        xl: `${
                                          data?.discountType !== undefined
                                            ? 5
                                            : 0
                                        }`,
                                      }} */
                                    >
                                      <Typography
                                        variant={`${
                                          data?.discountType !== undefined
                                            ? "cardLocation1"
                                            : "subtitle1"
                                        }`}
                                        style={{
                                          textDecorationLine: `${
                                            data?.discountType !== undefined
                                              ? "line-through"
                                              : "none"
                                          }`,
                                        }}
                                        sx={{ fontWeight: "900" }}
                                      >
                                        {selectedCurrency}{" "}
                                        {data?.totalPriceWithoutFragileCharge}
                                      </Typography>
                                      {data?.discountType !== undefined ? (
                                        <Typography
                                          variant="subtitle1"
                                          color="#1B3148"
                                          className="bold"
                                          sx={{ fontWeight: "900" }}
                                        >
                                          {selectedCurrency}{" "}
                                          {
                                            data.totalPriceWithoutFragileCharge_after_discount
                                          }
                                        </Typography>
                                      ) : (
                                        ""
                                      )}
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </TableCell>
                              <TableCell
                                sx={{
                                  border: "none",
                                  textAlign: "center",
                                  width: "100%",
                                }}
                              >
                                <Stack
                                  sx={{ width: "100%" }}
                                  direction={"column"}
                                  alignItems={"flex-end"}
                                  spacing={5}
                                  justifyContent={"space-around"}
                                >
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                  >
                                    <IconButton
                                      onClick={() => removeItemFromCart(data)}
                                    >
                                      <img
                                        src="/assets/close-square.svg"
                                        alt=""
                                      />
                                    </IconButton>
                                  </Stack>
                                  <Stack
                                    direction={"row"}
                                    // spacing={1}
                                    alignItems={"center"}
                                    justifyContent={{
                                      md: "space-around",
                                      lg: "center",
                                    }}
                                    sx={{
                                      border: "1px solid #D9D9D9",
                                      borderRadius: "5px",
                                      px: 1,
                                      width: {
                                        md: "70%",
                                        lg: "63%",
                                        xl: "45%",
                                      },
                                    }}
                                  >
                                    <Stack>
                                      <Typography
                                        variant="cardHeader3"
                                        color="#1B3148"
                                        className="bold"
                                      >
                                        Quantity
                                      </Typography>
                                      {/* <hr
                      style={{
                        textAlign: "left",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "black",
                        // maxWidth: "340px",
                      }}
                    /> */}
                                    </Stack>
                                    <Stack
                                      direction={"row"}
                                      alignItems="center"
                                      justifyContent={"space-between"}
                                      // sx={{ width: "100%", maxWidth: "50px", color: "#959595" }}
                                    >
                                      <Stack
                                        direction={"row"}
                                        spacing={1}
                                        alignItems="center"
                                        justifyContent={"space-between"}
                                        sx={{
                                          color: "#959595",
                                        }}
                                      >
                                        <IconButton
                                          size="small"
                                          aria-label="reduce"
                                          onClick={() =>
                                            dispatch(decreaseFromCart(data))
                                          }
                                        >
                                          <KeyboardArrowDownIcon fontSize="small" />
                                        </IconButton>
                                        <Typography
                                          variant="cardHeader3"
                                          color="#1B3148"
                                          className="SemiBold"
                                        >
                                          {" "}
                                          {data.amount}
                                        </Typography>
                                        <IconButton
                                          size="small"
                                          aria-label="increase"
                                          onClick={() =>
                                            dispatch(
                                              increaseCart({
                                                id: data.id,
                                                image: data.image,
                                                name: data.name,
                                                design_code: data.design_code,
                                                size: data.size,
                                                size_id: data.size_id,
                                                text: data.text,
                                                colors: data.colors,
                                                color_id: data.color_id,
                                                price: data.price,
                                                priceOrg: data.priceOrg,
                                                totalFragileCharge:
                                                  data.fragileCharge,
                                                totalFragileChargeOrg:
                                                  data.fragileChargeOrg,
                                                fragileCharge:
                                                  data.fragileCharge,
                                                fragileChargeOrg:
                                                  data.fragileChargeOrg,
                                                totalProductWeight:
                                                  data.productWeight,
                                                productWeight:
                                                  data.productWeight,
                                                vatAmountParticularProduct:
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg
                                                  ) +
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg
                                                  ) /
                                                    data.amount,
                                                priceWithTax: parseFloat(
                                                  data.priceWithTaxOrg
                                                ),
                                                vatAmountParticularProductOrg:
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg
                                                  ) +
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg
                                                  ) /
                                                    data.amount,
                                                priceWithTaxOrg: parseFloat(
                                                  data.priceWithTaxOrg
                                                ),
                                                priceWithoutFragile:
                                                  data.priceWithoutFragileOrg,
                                                priceWithoutFragileOrg:
                                                  data.priceWithoutFragileOrg,
                                                amount: data.amount + 1,
                                                stock: data.stock,
                                                totalAmount: 1,
                                                totalPrice:
                                                  data.totalPriceOrg +
                                                  parseFloat(data.priceOrg),
                                                totalPriceWithoutFragileCharge:
                                                  data.totalPriceWithoutFragileChargeOrg +
                                                  parseFloat(
                                                    data.priceWithoutFragileOrg
                                                  ),
                                                totalPriceWithTax:
                                                  data.totalPriceWithTaxOrg +
                                                  parseFloat(
                                                    data.priceWithTaxOrg
                                                  ),
                                                totalPriceOrg:
                                                  data.totalPriceOrg +
                                                  parseFloat(data.priceOrg),
                                                totalPriceWithoutFragileChargeOrg:
                                                  data.totalPriceWithoutFragileChargeOrg +
                                                  parseFloat(
                                                    data.priceWithoutFragileOrg
                                                  ),
                                                totalPriceWithTaxOrg:
                                                  data.totalPriceWithTaxOrg +
                                                  parseFloat(
                                                    data.priceWithTaxOrg
                                                  ),

                                                // set cart data for discount price
                                                price_after_discount:
                                                  data.price_after_discount,
                                                priceOrg_after_discount:
                                                  data.priceOrg_after_discount,
                                                priceWithTax_after_discount:
                                                  parseFloat(
                                                    data.priceWithTaxOrg_after_discount
                                                  ),
                                                priceWithTaxOrg_after_discount:
                                                  parseFloat(
                                                    data.priceWithTaxOrg_after_discount
                                                  ),
                                                vatAmountParticularProduct_after_discount:
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg_after_discount
                                                  ) +
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg_after_discount
                                                  ) /
                                                    data.amount,
                                                vatAmountParticularProductOrg_after_discount:
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg_after_discount
                                                  ) +
                                                  parseFloat(
                                                    data.vatAmountParticularProductOrg_after_discount
                                                  ) /
                                                    data.amount,
                                                totalPrice_after_discount:
                                                  data.totalPriceOrg_after_discount +
                                                  parseFloat(
                                                    data.priceOrg_after_discount
                                                  ),
                                                totalPriceOrg_after_discount:
                                                  data.totalPriceOrg_after_discount +
                                                  parseFloat(
                                                    data.priceOrg_after_discount
                                                  ),
                                                totalPriceWithTax_after_discount:
                                                  data.totalPriceWithTaxOrg_after_discount +
                                                  parseFloat(
                                                    data.priceWithTaxOrg_after_discount
                                                  ),
                                                totalPriceWithTaxOrg_after_discount:
                                                  data.totalPriceWithTaxOrg_after_discount +
                                                  parseFloat(
                                                    data.priceWithTaxOrg_after_discount
                                                  ),
                                                priceWithoutFragile_after_discount:
                                                  data.priceWithoutFragileOrg_after_discount,
                                                priceWithoutFragileOrg_after_discount:
                                                  data.priceWithoutFragileOrg_after_discount,
                                                totalPriceWithoutFragileCharge_after_discount:
                                                  data.totalPriceWithoutFragileChargeOrg_after_discount +
                                                  parseFloat(
                                                    data.priceWithoutFragileOrg_after_discount
                                                  ),
                                                totalPriceWithoutFragileChargeOrg_after_discount:
                                                  data.totalPriceWithoutFragileChargeOrg_after_discount +
                                                  parseFloat(
                                                    data.priceWithoutFragileOrg_after_discount
                                                  ),
                                              })
                                            )
                                          }
                                        >
                                          <KeyboardArrowUpIcon fontSize="small" />
                                        </IconButton>
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          </Card>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                  <Divider />
                  <br />
                  <Stack
                    direction={{
                      lg: "row",
                      xl: "row",
                      md: "row",
                      xs: "column",
                      xms: "column",
                    }}
                    spacing={2}
                    justifyContent={"flex-end"}
                  >
                    {" "}
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#af7b29",
                        "&:hover": {
                          bgcolor: "#af7b29",
                        },
                      }}
                      onClick={() => router.push("/shop")}
                    >
                      CONTINUE SHOPPING
                    </Button>
                    <Button
                      variant="contained"
                      color="background2"
                      onClick={() => handleProceedToCheckout()}
                    >
                      proceed to checkout
                    </Button>
                  </Stack>
                </Grid>
                <OrderDetails style={{ width: "100%" }}></OrderDetails>
              </Grid>
            </>
          ) : (
            <Stack
              direction={"column"}
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                mt: 10,
              }}
            >
              <ProductionQuantityLimitsIcon
                style={{ color: "#1B3148", fontSize: "128px" }}
              ></ProductionQuantityLimitsIcon>
              <Typography color="#1B3148" variant="header1">
                Your cart is currently empty.
              </Typography>
            </Stack>
          )}
        </Hidden>
      </Box>

      <Footer />
      <LoginModal
        open={openLoginModal}
        setOpen={setLoginModal}
        isProceedCheckout={isProceedCheckout}
        setIsProceedCheckout={setIsProceedCheckout}
      ></LoginModal>
    </>
  );
};

export default addtocart;
