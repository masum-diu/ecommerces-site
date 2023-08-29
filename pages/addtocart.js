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

const addtocart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const dataFetchedRef = useRef(false);
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart.cart);
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
                              {data.colors.length > 0 ? (
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
                              )}
                            </Stack>
                            <Typography variant="subtitle1" color="initial">
                              SIZE: {data.size ? data.size : "N/A"}
                            </Typography>
                            <Typography variant="subtitle1" color="initial">
                              {selectedCurrency} {data.totalPrice}
                            </Typography>
                            <Stack
                              direction={"row"}
                              alignItems="center"
                              justifyContent={"space-between"}
                              spacing={2}
                            >
                              <IconButton
                                size="small"
                                aria-label="reduce"
                                onClick={() => dispatch(decreaseFromCart(data))}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>

                              <Typography variant="subtitle1" color="initial">
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
                                      totalFragileCharge: data.fragileCharge,
                                      fragileCharge: data.fragileCharge,
                                      totalProductWeight: data.productWeight,
                                      productWeight: data.productWeight,
                                      vatAmountParticularProduct:
                                        parseFloat(
                                          data.vatAmountParticularProduct
                                        ) +
                                        parseFloat(
                                          data.vatAmountParticularProduct
                                        ) /
                                          data.amount,
                                      priceWithTax: parseFloat(
                                        data.priceWithTax
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
                                      amount: data.amount + 1,
                                      stock: data.stock,
                                      totalAmount: 1,
                                      totalPrice:
                                        data.totalPrice +
                                        parseFloat(data.price),
                                      totalPriceWithTax:
                                        data.totalPriceWithTax +
                                        parseFloat(data.priceWithTax),
                                      totalPriceOrg:
                                        data.totalPriceOrg +
                                        parseFloat(data.priceOrg),
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
                          </Stack>
                          <Divider />
                        </>
                      ))}
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
              <Stack
                sx={
                  {
                    // backgroundColor: "red",
                  }
                }
              >
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
                            <TableCell sx={{ border: "none" }}>
                              <Typography variant="subtitle1" color="initial">
                                {data?.design_code}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ border: "none", textAlign: "left" }}
                            >
                              <Stack
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                              >
                                {/* <Box
                                  size="small"
                                  variant="primary"
                                  color="primary"
                                  disabled={true}
                                  style={{
                                    backgroundColor: `${data?.colorCode}`,
                                    width: "25px",
                                    height: "25px",
                                  }}
                                ></Box> */}
                                <Typography>Colors: </Typography>
                                {data.colors.length > 0 ? (
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
                                {selectedCurrency} {data.totalPrice}
                              </Typography>
                            </TableCell>
                            {/* <TableCell sx={{ border: "none" }}>
                        {wishlistData.stock[0]?.stock}
                      </TableCell> */}
                            <TableCell
                              sx={{ border: "none", textAlign: "center" }}
                            >
                              <IconButton
                                size="small"
                                aria-label="reduce"
                                onClick={() => dispatch(decreaseFromCart(data))}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              sx={{ border: "none", textAlign: "center" }}
                            >
                              <Typography variant="subtitle1" color="initial">
                                {data.amount}
                              </Typography>
                            </TableCell>
                            <TableCell
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
                                      totalFragileCharge: data.fragileCharge,
                                      fragileCharge: data.fragileCharge,
                                      totalProductWeight: data.productWeight,
                                      productWeight: data.productWeight,
                                      vatAmountParticularProduct:
                                        parseFloat(
                                          data.vatAmountParticularProduct
                                        ) +
                                        parseFloat(
                                          data.vatAmountParticularProduct
                                        ) /
                                          data.amount,
                                      priceWithTax: parseFloat(
                                        data.priceWithTax
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
                                      amount: data.amount + 1,
                                      stock: data.stock,
                                      totalAmount: 1,
                                      totalPrice:
                                        data.totalPrice +
                                        parseFloat(data.price),
                                      totalPriceWithTax:
                                        data.totalPriceWithTax +
                                        parseFloat(data.priceWithTax),
                                      totalPriceOrg:
                                        data.totalPriceOrg +
                                        parseFloat(data.priceOrg),
                                      totalPriceWithTaxOrg:
                                        data.totalPriceWithTaxOrg +
                                        parseFloat(data.priceWithTaxOrg),
                                    })
                                  )
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                              {/* <Stack
                                direction={"row"}
                                // alignItems="center"
                                sx={{justifyContent:"flex-end",alignItems:"center"}}
                                // justifyContent={"space-between"}
                                spacing={2}
                              >
                               

                               
                              </Stack> */}
                            </TableCell>
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
