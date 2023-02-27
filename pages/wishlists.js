import { Stack, Typography, Button, IconButton, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MdClose } from "react-icons/md";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../src/features/wishlist/wishListSlice";
import { useRouter } from "next/router";

const wishlists = () => {
  const router = useRouter();
  const wishlist = useSelector((state) => state.wishList.wishList);
  // console.log("your log output", wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromList = (data) => {
    console.log("your log output", data);
    dispatch(removeFromWishList(data));
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
  console.log("your log output wishlist", wishlist);
  return (
    <>
      <HomePageIntro title={"wishlist "} />
      <Box sx={{ height: "fit-content" }}>
        <Stack sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }} py={15}>
          <Typography
            variant="header1"
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Wishlist
          </Typography>
          <Stack direction={"column"} spacing={2} pt={5}>
            {wishlist.map((wishlistData) => (
              <div key={wishlistData.id}>
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
                        id: wishlistData.id,
                        amount: 1,
                      })
                    }
                  >
                    <MdClose />
                  </IconButton>
                  <img src={wishlistData.image} alt="" width={100} />
                  <Typography variant="cardHeader12" color="initial">
                    {wishlistData.name}
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    ৳{wishlistData.price}
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    {wishlistData.stock[0]?.stock}
                  </Typography>
                  <Button
                    variant="contained"
                    color="background2"
                    size="small"
                    onClick={() =>
                      router.push(
                        `/${
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
                <Divider />
              </div>
            ))}
          </Stack>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default wishlists;
