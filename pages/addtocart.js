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
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Cart
          </Typography>
          <Grid container spacing={5} pt={5} xs={12}>
            <Grid item lg={12} sx={{ width: "100%" }}>
              <Hidden only={["md", "lg", "xl"]}>
                {cart?.length > 0 ? (
                  <>
                    <Stack direction={"column"} spacing={2}>
                      {cart?.map((data) => (
                        <>
                          <Stack
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
                            <Typography variant="subtitle1" color="initial">
                              {data?.name}
                            </Typography>
                            <Typography variant="subtitle1" color="initial">
                              {data?.design_code}
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={2}
                              alignItems={"center"}
                            >
                              <Typography>Colors: </Typography>
                              {/* {data.colors.length > 0 ? (
                                <>
                                  {data?.colors?.map((singleColor, index) => (
                                    <Typography
                                      key={index}
                                      variant="subtitle1"
                                      color="initial"
                                    >
                                      {singleColor?.color_name}
                                      {index !== data?.colors?.length - 1 &&
                                      data?.colors?.length > 1
                                        ? ", "
                                        : ""}
                                    </Typography>
                                  ))}
                                </>
                              ) : (
                                <Typography>N/A</Typography>
                              )} */}
                              {data?.color_name ? (
                                <Typography variant="subtitle1" color="initial">
                                  {data?.color_name}
                                </Typography>
                              ) : (
                                <Typography>N/A</Typography>
                              )}
                            </Stack>
                            <Typography variant="subtitle1" color="initial">
                              SIZE: {data.size ? data.size : "N/A"}
                            </Typography>
                            <Typography variant="subtitle1" color="initial">
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
                              <Typography variant="subtitle1" color="initial">
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
                          </Stack>
                          <Divider />
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
                          color="secondary"
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
              >
                <Grid item lg={8} xl={7} md={8}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {cart?.map((data) => (
                          <Card
                            key={data?.id}
                            variant="outlined"
                            sx={{ marginBottom: "8px" }}
                          >
                            {console.log("data", data)}
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
                                    color="initial"
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
                                      color="initial"
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
                                          color="initial"
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
                                          color="initial"
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
                                      pl={{ md: 1, lg: 5 }}
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
                                      >
                                        {selectedCurrency}{" "}
                                        {data?.totalPriceWithoutFragileCharge}
                                      </Typography>
                                      {data?.discountType !== undefined ? (
                                        <Typography
                                          variant="subtitle1"
                                          color="initial"
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
                                    spacing={1}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    sx={{
                                      border: "1px solid #D9D9D9",
                                      borderRadius: "5px",
                                      px: 1,
                                      width: {
                                        md: "75%",
                                        lg: "70%",
                                        xl: "60%",
                                      },
                                    }}
                                  >
                                    <Stack>
                                      <Typography
                                        variant="cardHeader3"
                                        color="#959595"
                                        className="SemiBold"
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
                                      spacing={2}
                                      alignItems="center"
                                      justifyContent={"space-between"}
                                      // sx={{ width: "100%", maxWidth: "50px", color: "#959595" }}
                                    >
                                      <Stack
                                        direction={"row"}
                                        spacing={2}
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
                                          color="#959595"
                                        >
                                          {" "}
                                          {data.amount}
                                        </Typography>
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

                                                // setting cart data for discount price
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
                      color="secondary"
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
                style={{ color: "#0A0A0A", fontSize: "128px" }}
              ></ProductionQuantityLimitsIcon>
              <Typography variant="header1">
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
