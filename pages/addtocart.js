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
          maxWidth: "1920px",
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
          <Grid
            container
            spacing={5}
            pt={5}
            xs={12}
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   width: "100%",
            // }}
          >
            <Grid item lg={8} sx={{width:"100%"}}>
              <Stack
                direction={"column"}
                spacing={2}
                // sx={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   width: "100%",
                // }}
              >
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
                    <Divider/>
                  </>
                ))}
              </Stack>
            </Grid>
            <Grid item lg={4} mt={4} xs={12} sx={{width:"100%"}}>
              <Paper elevation={3} mb={1}>
                <Stack
                  sx={{ width: "90%", mx: "auto", p: 2 }}
                  direction={"column"}
                  spacing={2}
                >
                  <Typography variant="cardHeader1" color="initial">
                    CART TOTALS
                  </Typography>
                  <Divider />
                  <Stack direction={"row"} spacing={3}>
                    <Typography variant="cardHeader" color="initial">
                      SUBTOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12,160
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={5} mb={5} >
                    <Typography variant="cardHeader" color="initial" mt={1}>
                      SHIPPING 
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="DHAKA"
                        control={<Radio />}
                        label="DHAKA : ৳ 100"
                      />
                      <FormControlLabel
                        value="PICK FROM SHOWROOM"
                        control={<Radio />}
                        label="PICK FROM SHOWROOM"
                      />
                      <br />
                      <small>Shipping to Dhaka.</small>
                    </RadioGroup>
                  </Stack>
                  <br />
                  <br />
                  <Stack direction={"row"} spacing={9}>
                    <Typography variant="cardHeader" color="initial">
                      TAX :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12
                    </Typography>
                  </Stack>

                  <Divider />
                  <Stack direction={"row"} spacing={7}>
                    <Typography variant="cardHeader" color="initial">
                      TOTAL :
                    </Typography>
                    <Typography variant="cardHeader" color="initial">
                      ৳ 12,160
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    color="background2"
                    onClick={() => router.push("/checkout")}
                  >
                    proceed to checkout
                  </Button>
                </Stack>
              </Paper>
              <Typography
                variant="subtitle1"
                color="initial"
                fontWeight={"bold"}
                mt={5}
                textAlign={"center"}
              >
                CONTINUE SHOPPING
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};

export default addtocart;
