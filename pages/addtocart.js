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

  // function to convert cart data

  /* const convertCartData = (cartData) => {
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
      return convertedItem;
    });

    // Convert data outside the cart array
    const convertedTotalFragileCharge = convertPrice(
      cartData.totalFragileCharge
    );
    const convertedTotalPrice = convertPrice(cartData.totalPrice);
    const convertedTotalPriceWithTax = convertPrice(cartData.totalPriceWithTax);

    // Return the converted data
    return {
      ...cartData,
      cart: convertedCart,
      totalFragileCharge: convertedTotalFragileCharge,
      totalPrice: convertedTotalPrice,
      totalPriceWithTax: convertedTotalPriceWithTax,
    };
  }; */

  // console.log("updated one", convertCartData(carts));

  const handleProceedToCheckout = () => {
    setIsProceedClicked(true);
    setIsProceedCheckout(true);
    setKeepShowing(true);
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
                              {data.totalPriceWithoutFragileCharge_after_discount}
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
              <Grid container spacing={5} pt={5} xs={12}>
                <Grid item lg={8} xl={9} md={8}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {cart?.map((data) => (
                          <>
                            <TableRow
                              // sx={{background:"#fdc",px:40}}
                              key={data?.id}
                              // sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",textDecoration:"none",border:"none" }}
                            >
                              <TableCell sx={{ border: "none" }}>
                                <IconButton
                                  onClick={() => removeItemFromCart(data)}
                                >
                                  <MdClose />
                                </IconButton>
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                <img src={data?.image} alt="" width={100} />
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                <Typography variant="subtitle1" color="initial">
                                  {data?.name}
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{ border: "none", padding: "0px" }}
                              >
                                <Typography variant="subtitle1" color="initial">
                                  {data?.design_code}
                                </Typography>
                              </TableCell>

                              {/* Table cell for quantity */}
                              <TableCell
                                sx={{
                                  border: "none",
                                  textAlign: "center",
                                  height: "100%",
                                  width: "15%",
                                }}
                              >
                                <Stack
                                  direction={"row"}
                                  width={"100%"}
                                  justifyContent={"space-between"}
                                  alignItems={"center"}
                                  // border={1}
                                  // padding={"10px"}
                                >
                                  <Stack
                                    sx={{ border: "none", textAlign: "center" }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      color="initial"
                                    >
                                      Quantity: {data.amount}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    direction={"column"}
                                    alignItems={"center"}
                                  >
                                    <Stack
                                      sx={{
                                        border: "none",
                                        textAlign: "center",
                                      }}
                                    >
                                      <IconButton
                                        aria-label="increase"
                                        size="small"
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

                                    <Stack
                                      sx={{
                                        border: "none",
                                        textAlign: "center",
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
                                    </Stack>
                                  </Stack>
                                </Stack>
                              </TableCell>
                              <TableCell
                                sx={{ border: "none", textAlign: "left" }}
                              >
                                <Stack
                                  direction={"row"}
                                  spacing={1}
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
                                    <Typography
                                      variant="subtitle1"
                                      color="initial"
                                    >
                                      {data?.color_name}
                                    </Typography>
                                  ) : (
                                    <Typography>N/A</Typography>
                                  )}
                                </Stack>
                              </TableCell>
                              <TableCell
                                sx={{ border: "none", textAlign: "left" }}
                              >
                                <Typography variant="subtitle1" color="initial">
                                  SIZE: {data.size ? data.size : "N/A"}
                                </Typography>
                              </TableCell>

                              <TableCell
                                sx={{ border: "none", textAlign: "left" }}
                              >
                                <Typography variant="subtitle1" color="initial">
                                  {selectedCurrency}{" "}
                                  {data.totalPriceWithoutFragileCharge_after_discount}
                                </Typography>
                              </TableCell>
                              {/* <TableCell
                              sx={{
                                border: "none",
                                textAlign: "center",
                                height: "100%",
                                width: "10%",
                              }}
                            >
                              <Stack
                                direction={"row"}
                                width={"100%"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Stack
                                  sx={{ border: "none", textAlign: "center" }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                  >
                                    {data.amount}
                                  </Typography>
                                </Stack>
                                <Stack direction={"column"}>
                                  <Stack
                                    sx={{ border: "none", textAlign: "center" }}
                                  >
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
                                          })
                                        )
                                      }
                                    >
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                  </Stack>

                                  <Stack
                                    sx={{ border: "none", textAlign: "center" }}
                                  >
                                    <IconButton
                                      size="small"
                                      aria-label="reduce"
                                      onClick={() =>
                                        dispatch(decreaseFromCart(data))
                                      }
                                    >
                                      <RemoveIcon fontSize="small" />
                                    </IconButton>
                                  </Stack>
                                </Stack>
                              </Stack>
                            </TableCell> */}
                            </TableRow>
                          </>
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
                <OrderDetails></OrderDetails>
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
