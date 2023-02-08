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

const addtocart = () => {
  const router = useRouter();
  const addtocartData = [
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
              <Stack direction={"column"} spacing={2} >
                {addtocartData.map((addtocartData) => (
                  <>
                    <Stack
                      key={addtocartData.id}
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
                      <img src={addtocartData.image} alt="" width={100} />
                      <Typography variant="subtitle1" color="initial">
                        {addtocartData.title}
                      </Typography>
                      <Typography variant="subtitle1" color="initial">
                        ৳{addtocartData.price}
                      </Typography>
                      <Stack
                        direction={"row"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <IconButton size="small" aria-label="reduce">
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        {/* <TextField
                size="small"
                id="outlined-helperText"
                placeholder={count}
              /> */}
                        <Typography variant="subtitle1" color="initial">
                          1
                        </Typography>
                        <IconButton aria-label="increase">
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <Divider />
                  </>
                ))}
                <br />
                <Stack
                  direction={{lg:"row",xs:"column"}}
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
            </Grid>
            
          </Grid>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};

export default addtocart;
