import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { removeFromCart } from "../src/features/cart/cartSlice";
import { addToCart } from "../src/features/cart/cartSlice";

const addtocart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const carts = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log("yourdf log output", cart);
  return (
    <>
      <HomePageIntro title={"Cart "} />
      <Box
        sx={{
          height: { lg: "100vh", xs: "fit-content" },
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
              {cart.length > 0 ? (
                <>
                  <Stack direction={"column"} spacing={2}>
                    {cart?.map((data) => (
                      <>
                        <Stack
                          key={data.id}
                          spacing={1}
                          direction={{ lg: "row", xs: "column" }}
                          sx={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <IconButton>
                            <MdClose />
                          </IconButton>
                          <img src={data.image} alt="" width={100} />
                          <Typography variant="subtitle1" color="initial">
                            {data.name}
                          </Typography>
                          <Typography variant="subtitle1" color="initial">
                            {data.color}
                          </Typography>
                          <Typography variant="subtitle1" color="initial">
                            ৳{data.totalPrice}
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
                              onClick={() => dispatch(removeFromCart(data))}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            {/* <TextField
                size="small"
                id="outlined-helperText"
                placeholder={count}
              /> */}
                            <Typography variant="subtitle1" color="initial">
                              {data.amount}
                            </Typography>
                            <IconButton
                              aria-label="increase"
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: data.id,
                                    image: data.image,
                                    name: data.name,
                                    size: data.size,
                                    text: data.text,
                                    color: data.color,
                                    price: data.price,
                                    amount: 1,
                                    totalAmount: 1,
                                    totalPrice:
                                      data.amount * parseInt(data.price),
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
                        color="background2"
                        onClick={() => router.push("/checkout")}
                      >
                        proceed to checkout
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push("/shop")}
                      >
                        CONTINUE SHOPPING
                      </Button>
                    </Stack>
                  </Stack>
                </>
              ) : (
                <>
                  <Stack
                    direction={"column"}
                    spacing={2}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <ProductionQuantityLimitsIcon
                      sx={{ fontSize: "15em" }}
                    ></ProductionQuantityLimitsIcon>
                    <Typography variant="header1">
                      Your cart is currently empty.
                    </Typography>
                  </Stack>
                </>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};

export default addtocart;
