import {
  Stack,
  Typography,
  Button,
  IconButton,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MdClose } from "react-icons/md";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../src/features/wishlist/wishListSlice";
import { useRouter } from "next/router";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";

const wishlists = () => {
  const router = useRouter();
  const wishlist = useSelector((state) => state.wishList.wishList);

  const dispatch = useDispatch();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const handleRemoveFromList = async (data) => {
    dispatch(removeFromWishList(data));
    await toast.error("Removed From Wishlist!");
  };
  /* const wishlistData = [
    {
      id: 1,
      image: "https://aranya.com.bd/wp-content/uploads/2022/06/296.jpg",
      title: "Broom baby shirt",
      price: "1,165",
      stock: "IN STOCK",
    },
    {
      id: 2,
      image: "https://aranya.com.bd/wp-content/uploads/2022/06/296.jpg",
      title: "Broom baby shirt",
      price: "1,165",
      stock: "OUT STOCK",
    },
    {
      id: 3,
      image: "https://aranya.com.bd/wp-content/uploads/2022/06/296.jpg",
      title: "Broom baby shirt",
      price: "1,165",
      stock: "IN STOCK",
    },
  ]; */

  return (
    <>
      <HomePageIntro title={"Wishlist "} />
      <Box sx={{ height: "fit-content" }}>
        <Stack sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }} py={15}>
          <Typography
            variant="header1"
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
            mb={3}
          >
            Wishlist
          </Typography>
          {/* <Hidden only={["md", "lg", "xl", "sm"]}>
            {wishlist?.length > 0 ? (
              <Stack direction={"column"} spacing={2} pt={5}>
                {wishlist?.map((wishlistData) => (
                  <>
                    <Stack
                      spacing={2}
                      key={wishlistData?.id}
                      direction={{ lg: "row", xs: "column" }}
                      sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleRemoveFromList({
                            id: wishlistData?.id,
                            amount: 1,
                          })
                        }
                      >
                        <MdClose />
                      </IconButton>
                      <img src={wishlistData?.image} alt="" width={100} />
                      <Typography variant="cardHeader12" color="initial">
                        {wishlistData?.name}
                      </Typography>
                      <Typography variant="cardHeader12" color="initial">
                        {selectedCurrency} {wishlistData?.price}
                      </Typography>
                     
                      <Button
                        variant="contained"
                        color="background2"
                        size="small"
                        onClick={() =>
                          router.push(
                            `/products/${
                              wishlistData?.sub_category?.slug === "unknown"
                                ? wishlistData?.category?.slug
                                : wishlistData?.sub_category?.slug
                            }/${wishlistData?.id}`
                          )
                        }
                      >
                        View Product
                      </Button>
                    </Stack>
                    <br />
                    <Divider />
                  </>
                ))}
              </Stack>
            ) : (
              <Stack
                direction={"column"}
                spacing={2}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  mt: 10,
                }}
              >
                <FiHeart style={{ color: "#0A0A0A", fontSize: "128px" }} />
                <Typography variant="header1">
                  No products added to the wishlist
                </Typography>
              </Stack>
            )}
          </Hidden> */}
          {/*  */}

          {wishlist?.length > 0 ? (
            <Stack sx={{ width: "100%" }} direction={"column"}>
              {wishlist?.map((wishlistData) => (
                <Card variant="outlined" sx={{ marginBottom: "8px", py: 2 }}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    sx={{ width: "100%", px: 2 }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                      sx={{
                        width: "50%",
                      }}
                    >
                      <Stack
                        sx={{
                          width: {
                            xs: "70%",
                            xms: "50%",
                            sm: "40%",
                            md: "20%",
                          },
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "10px",
                            maxWidth: "170px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={wishlistData?.image}
                          alt=""
                          // width={100}
                        />
                      </Stack>
                      <Stack sx={{ pl: { xs: 0, sm: 5 } }}>
                        <Typography variant="wishlistPName">
                          {wishlistData?.name}
                        </Typography>
                        <Typography variant="wishlistPPrice">
                          {selectedCurrency} {wishlistData?.price}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack
                      sx={{
                        width: "50%",
                      }}
                      direction={"column"}
                      justifyContent={"flex-start"}
                      alignItems={"flex-end"}
                      spacing={10}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        sx={{ width: "30%" }}
                      >
                        <IconButton
                          aria-label=""
                          onClick={() =>
                            handleRemoveFromList({
                              id: wishlistData?.id,
                              amount: 1,
                            })
                          }
                        >
                          <img src="/assets/close-square.svg" alt="" />
                        </IconButton>
                      </Stack>
                      <Stack
                        sx={{
                          width: {
                            xs: "100%",
                            xms: "90%",
                            sm: "50%",
                            md: "40%",
                            lg: "30%",
                            xl: "20%",
                          },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="background2"
                          size="small"
                          onClick={() =>
                            router.push(
                              `/products/${
                                wishlistData?.sub_category?.slug === "unknown"
                                  ? wishlistData?.category?.slug
                                  : wishlistData?.sub_category?.slug
                              }/${wishlistData?.id}`
                            )
                          }
                        >
                          View Product
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* <TableRow
                      // sx={{background:"#fdc",px:40}}
                      key={wishlistData?.id}
                      // sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",textDecoration:"none",border:"none" }}
                    >
                      <TableCell sx={{ border: "none" }}></TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <img src={wishlistData?.image} alt="" width={100} />
                      </TableCell>

                      <TableCell sx={{ border: "none", textAlign: "left" }}>
                        {" "}
                        {wishlistData?.name}
                      </TableCell>
                      <TableCell sx={{ border: "none", textAlign: "left" }}>
                        {selectedCurrency} {wishlistData?.price}
                      </TableCell>
                      <TableCell sx={{ border: "none", textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="background2"
                          size="small"
                          onClick={() =>
                            router.push(
                              `/products/${
                                wishlistData?.sub_category?.slug === "unknown"
                                  ? wishlistData?.category?.slug
                                  : wishlistData?.sub_category?.slug
                              }/${wishlistData?.id}`
                            )
                          }
                        >
                          View Product
                        </Button>
                      </TableCell>
                    </TableRow> */}
                </Card>
              ))}
            </Stack>
          ) : (
            <Stack
              direction={"column"}
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                mt: 10,
              }}
            >
              <img
                style={{ width: "10rem" }}
                src="/assets/wishlist_1.svg"
                alt=""
              />

              {/* <FiHeart style={{ color: "#0A0A0A", fontSize: "128px" }} /> */}

              <Typography variant="header1">
                Your wishlist is currently empty
              </Typography>
              <Button
                variant="contained"
                color="background2"
                size="large"
                sx={{ width: "15rem" }}
                onClick={() => router.push(`/shop`)}
              >
                Shop All
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default wishlists;
