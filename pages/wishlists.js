import { Stack, Typography, Button, IconButton, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { MdClose } from "react-icons/md";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";

const wishlists = () => {
  const wishlistData = [
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
  ];
  return (
    <>
      <HomePageIntro title={"wishlist "} />
      <Box sx={{ height: "100vh" }}>
        <Stack sx={{ width: "90%", maxWidth: "1920px", mx: "auto" }}  py={15}>
          <Typography
           
            variant="header1"
            color="initial"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Wishlist
          </Typography>
          <Stack direction={"column"} spacing={2} pt={5}>
            {wishlistData.map((wishlistData) => (
              <>
                <Stack
                  key={wishlistData.id}
                  direction={"row"}
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <MdClose />
                  </IconButton>
                  <img src={wishlistData.image} alt="" width={100} />
                  <Typography variant="subtitle1" color="initial">
                    {wishlistData.title}
                  </Typography>
                  <Typography variant="subtitle1" color="initial">
                    ৳{wishlistData.price}
                  </Typography>
                  <Button variant="outlined" color="primary" size="small">
                    {wishlistData.stock}
                  </Button>
                  <Button variant="contained" color="background2" size="small">
                    Add to Cart
                  </Button>
                </Stack>
                <Divider />
              </>
            ))}
          </Stack>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default wishlists;
