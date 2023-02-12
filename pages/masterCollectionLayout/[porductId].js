import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Badge,
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
import { useDispatch } from "react-redux";
import { addToCart } from "../../src/features/cart/cartSlice";

const PorductDetails = () => {
  const router = useRouter();
  const productId = router?.query?.porductId;

  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);

  const products = data;
  
  const initialSize = products?.product_size[0]?.size_name?products?.product_size[0]?.size_name:null;
  const initialColor = products?.product_colour[0]?.slug;
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(initialSize);
  const [color, setColor] = useState(initialColor);
  const dispatch = useDispatch();
  if (isLoading) {
    return <p>Loading</p>;
  }
  const handleQuantity = (data) => {
    if (isNaN(data)) {
      return;
    }
    setCount(data);
  };

  const path = router.asPath;

  // console.log(products?.product_size[0]?.size_name);
  // console.log("kash", products);
  // console.log("sdfs", productId);
  console.log(size);
  // console.log(color);
  // console.log(count);

  const finalData = {
    id: products.id,
    name: products?.product_name,
    price: products?.mrp_price,
    color: color,
    size: size,
    amount: count,
    totalPrice: count * parseInt(products?.mrp_price),
  };
  console.log("sdfs", finalData);

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
              BDT : {products?.mrp_price} ৳
            </Typography>
            {/* size is here */}
            <Stack
              direction={"row"}
              spacing={{ lg: 4, xs: 3 }}
              sx={{ justifyContent: "space-between", alignItems: "" }}
            >
              <Box sx={{ minWidth: 320 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="size">
                    Size
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "size",
                      id: "size",
                    }}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {products?.product_size?.map((size, index) => (
                      <option key={index} value={size?.size_name}>
                        {size?.size_name}
                      </option>
                    ))}

                    {/* <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option> */}
                  </NativeSelect>
                </FormControl>
              </Box>
            </Stack>

            {/* Color is here */}

            <Box>
              <Typography>Pick a Color</Typography>
              <Stack direction="row" spacing={2}>
                {products.product_colour.map((color, index) => (
                  <Avatar
                    key={index}
                    sx={{ backgroundColor: `${color?.slug}` }}
                    variant="rounded"
                    onClick={() => setColor(color?.slug)}
                  ></Avatar>
                ))}
              </Stack>
            </Box>

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
                value={count}
                size="small"
                id="outlined-helperText"
                onChange={(e) => handleQuantity(parseInt(e.target.value))}
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
            <Button
              variant="contained"
              color="background2"
              type="submit"
              onClick={() => /* dispatch(addToCart()) */ console.log(finalData)}
            >
              Add to Chart
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default PorductDetails;
