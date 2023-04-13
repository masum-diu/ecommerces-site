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
import React, { useEffect, useRef, useState } from "react";
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

const addtocart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const dataFetchedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart.cart);
  const [openLoginModal, setLoginModal] = useState(false);
  const carts = useSelector((state) => state.cart);
  const [isProceedClicked, setIsProceedClicked] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const removeItemFromCart = async (data) => {
    dispatch(removeFromCart(data));
    await toast.error("Removed From Cart!");
  };

  /* useEffect(() => {
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
  }, [isProceedClicked]); */

  /* useEffect(() => {
    const handleProceedToCheckout = () => {};
    handleProceedToCheckout();
  }, []); */

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
                            <Stack direction={"row"} spacing={2}>
                              <Box
                                size="small"
                                variant="primary"
                                color="primary"
                                disabled={true}
                                style={{
                                  backgroundColor: `${data?.colorCode}`,
                                  width: "25px",
                                  height: "25px",
                                }}
                              ></Box>
                              <Typography variant="subtitle1" color="initial">
                                {data.color}
                              </Typography>
                            </Stack>
                            <Typography variant="subtitle1" color="initial">
                              SIZE {data.size}
                            </Typography>
                            <Typography variant="subtitle1" color="initial">
                              BDT {data.totalPrice}
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
                                      size: data.size,
                                      size_id: data.size_id,
                                      text: data.text,
                                      color: data.color,
                                      color_id: data.color_id,
                                      colorCode: data.colorCode,
                                      price: data.price,
                                      vatAmountParticularProduct:
                                        parseFloat(data.vatAmountParticularProduct) +
                                        parseFloat(data.vatAmountParticularProduct) /
                                          data.amount,
                                      priceWithTax: parseFloat(data.priceWithTax),
                                      amount: data.amount + 1,
                                      stock: data.stock,
                                      totalAmount: 1,
                                      totalPrice:
                                        data.totalPrice +
                                        parseFloat(data.price),
                                      totalPriceWithTax:
                                        data.totalPriceWithTax +
                                        parseFloat(data.priceWithTax),
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
                          onClick={() => router.push("/checkout")}
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

                            <TableCell
                              sx={{ border: "none", textAlign: "left" }}
                            >
                              <Stack direction={"row"} spacing={1}>
                                <Box
                                  size="small"
                                  variant="primary"
                                  color="primary"
                                  disabled={true}
                                  style={{
                                    backgroundColor: `${data?.colorCode}`,
                                    width: "25px",
                                    height: "25px",
                                  }}
                                ></Box>
                                <Typography variant="subtitle1" color="initial">
                                  {data.color}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell
                              sx={{ border: "none", textAlign: "left" }}
                            >
                              <Typography variant="subtitle1" color="initial">
                                SIZE {data.size}
                              </Typography>
                            </TableCell>

                            <TableCell
                              sx={{ border: "none", textAlign: "left" }}
                            >
                              <Typography variant="subtitle1" color="initial">
                                BDT {data.totalPrice}
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
                                      size: data.size,
                                      size_id: data.size_id,
                                      text: data.text,
                                      color: data.color,
                                      color_id: data.color_id,
                                      colorCode: data.colorCode,
                                      price: data.price,
                                      vatAmountParticularProduct:
                                        parseFloat(data.vatAmountParticularProduct) +
                                        parseFloat(data.vatAmountParticularProduct) /
                                          data.amount,
                                      priceWithTax: parseFloat(data.priceWithTax),
                                      amount: data.amount + 1,
                                      stock: data.stock,
                                      totalAmount: 1,
                                      totalPrice:
                                        data.totalPrice +
                                        parseFloat(data.price),
                                      totalPriceWithTax:
                                        data.totalPriceWithTax +
                                        parseFloat(data.priceWithTax),
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
                    onClick={() => router.push("/checkout")}
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
      <LoginModal open={openLoginModal} setOpen={setLoginModal}></LoginModal>
    </>
  );
};

export default addtocart;
