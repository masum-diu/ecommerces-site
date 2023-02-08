import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Image from "next/image";
import HomePageIntro from "../../components/HomePageIntro";
import { Box } from "@mui/system";
import Footer from "../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";
import { useGetParticularProductsQuery } from "../../src/features/api/apiSlice";

const PorductDetails = () => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const productId = router?.query?.porductId;

  const path = router.asPath;
  /* const data = [
    {
      id: 1,
      title: "Demo Product Name",
      price: "5,185",
      image: "assets/saree3.png",
    },
    {
      id: 2,
      title: "Demo Product Name",
      price: "5,185",
      image: "/public/assets/saree3.png",
    },
    {
      id: 3,
      title: "Demo Product Name",
      price: "5,185",
      image: "/public/assets/saree3.png",
    },
  ]; */
  const marks = [
    {
      value: 0,
      label: "S",
    },
    {
      value: 10,
      label: "M",
    },
    {
      value: 20,
      label: "L",
    },
    {
      value: 30,
      label: "XL",
    },
    {
      value: 40,
      label: "XXL",
    },
  ];
  function valuetext(value) {
    return `${value}`;
  }

  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);
  if (isLoading) {
    return <p>Loading</p>;
  }

  const products = data;

  console.log("sdfs", products);
  console.log("sdfs", productId);

  return (
    <>
      <HomePageIntro title={"Master Collection Layout "} />
      <Box mt={10} mb={4} sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent={"space-around"}
          columnGap={3}
          rowGap={3}
        >
          <img
            src={products?.product_image}
            width={500}
            style={{
              width: "90vw",
              margin: "0 auto",
              height: "fit-content",
              maxWidth: "500px",
            }}
            height={700}
          />

          <Stack
            direction={"column"}
            spacing={2}
            justifyContent={"space-between"}
          >
            <Typography variant="login1" color="initial">
              {products?.product_name}
            </Typography>
            <Typography variant="cardHeader2" color="initial">
              Home {path}
            </Typography>
            <Typography variant="cardLocation1" color="initial">
              {products?.p_description}
            </Typography>
            <Typography variant="login1" color="initial">
              BDT : {products?.mrp_price
} ৳
            </Typography>
            {/* size is here */}
            <Stack
              direction={"row"}
              spacing={{ lg: 4, xs: 3 }}
              sx={{ justifyContent: "space-between", alignItems: "" }}
            >
              <Box sx={{ minWidth: 320 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Size
                  </InputLabel>
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                  >
                    {products?.product_size?.map((size,index)=><option key={index} value={size?.size_name}>{size?.size_name}</option>).reverse()}
                    
                    {/* <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option> */}
                  </NativeSelect>
                </FormControl>
              </Box>
            </Stack>
            <br />
            <br />

            {/* Quantity is here */}
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              spacing={2}
            >
              <Typography variant="tabText">Quantity</Typography>

              <IconButton
                size="small"
                aria-label="reduce"
                onClick={() => {
                  setCount(Math.max(count - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <TextField
                size="small"
                id="outlined-helperText"
                placeholder={count}
              />
              <IconButton
                aria-label="increase"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default PorductDetails;
