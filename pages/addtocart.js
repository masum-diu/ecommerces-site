import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
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
              {cart?.length > 0 ? (
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
                          <IconButton onClick={() => removeItemFromCart(data)}>
                            <MdClose />
                          </IconButton>
                          <img src={data.image} alt="" width={100} />
                          <Typography variant="subtitle1" color="initial">
                            {data.name}
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
                            {data.size}
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
                                    amount: data.amount + 1,
                                    stock: data.stock,
                                    totalAmount: 1,
                                    totalPrice:
                                      data.totalPrice + parseFloat(data.price),
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
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Footer />
      <LoginModal open={openLoginModal} setOpen={setLoginModal}></LoginModal>
    </>
  );
};

export default addtocart;
