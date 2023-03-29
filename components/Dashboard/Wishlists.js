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
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React from "react";
  import { MdClose } from "react-icons/md";

  import { useRouter } from "next/router";
  import { FiHeart } from "react-icons/fi";
  import toast from "react-hot-toast";
import HomePageIntro from "../HomePageIntro";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../src/features/wishlist/wishListSlice";
  
  const Wishlists = () => {
    const router = useRouter();
    const wishlist = useSelector((state) => state.wishList.wishList);
  
    const dispatch = useDispatch();
  
    const handleRemoveFromList = async (data) => {
      dispatch(removeFromWishList(data));
      await toast.error("Removed From Wishlist!")
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
        <HomePageIntro title={"wishlist "} />
        <Box sx={{ height: "fit-content" }}>
          <Stack sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }} py={4}>
            <Typography
              variant="cardHeader1"
              color="initial"
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              Wishlist
            </Typography>
            <Hidden only={["md", "lg", "xl", "sm"]}>
              {wishlist?.length > 0 ? (
                <Stack direction={"column"} spacing={2} pt={5}>
                  {wishlist?.map((wishlistData) => (
                    <div key={wishlistData?.id}>
                      <Stack
                        spacing={2}
                        
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
                          BDT {wishlistData?.price}
                        </Typography>
                        {/* <Typography variant="cardHeader12" color="initial">
                          {wishlistData?.stock[0]?.stock}
                        </Typography> */}
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
                    </div> 
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
            </Hidden>
            {/*  */}
            <Hidden only={["xms", "xs"]}>
              {wishlist?.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableBody sx={{ width: "100%" }}>
                      {wishlist?.map((wishlistData) => (
                        <div key={wishlistData?.id}>
                          <TableRow
                            // sx={{background:"#fdc",px:40}}
                            
                            // sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",textDecoration:"none",border:"none" }}
                          >
                            <TableCell sx={{ border: "none" }}>
                              <IconButton
                                aria-label=""
                                onClick={() =>
                                  handleRemoveFromList({
                                    id: wishlistData?.id,
                                    amount: 1,
                                  })
                                }
                              >
                                <MdClose />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <img src={wishlistData?.image} alt="" width={100} />
                            </TableCell>
  
                            <TableCell sx={{ border: "none", textAlign: "left" }}>
                              {" "}
                              {wishlistData?.name}
                            </TableCell>
                            <TableCell sx={{ border: "none", textAlign: "left" }}>
                              BDT {wishlistData?.price}
                            </TableCell>
                            {/* <TableCell sx={{ border: "none" }}>
                          {wishlistData.stock[0]?.stock}
                        </TableCell> */}
                            <TableCell
                              sx={{ border: "none", textAlign: "center" }}
                            >
                              <Button
                                variant="contained"
                                color="background2"
                                size="small"
                                onClick={() =>
                                  router.push(
                                    `/products/${
                                      wishlistData?.sub_category?.slug ===
                                      "unknown"
                                        ? wishlistData?.category?.slug
                                        : wishlistData?.sub_category?.slug
                                    }/${wishlistData?.id}`
                                  )
                                }
                              >
                                View Product
                              </Button>
                            </TableCell>
                          </TableRow>
                        </div>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
            </Hidden>
          </Stack>
        </Box>
       
      </>
    );
  };
  
  export default Wishlists;
  