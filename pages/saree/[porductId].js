import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Grid,
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
import parse from "html-react-parser";
import Loader from "../../components/Loader/Loader";

const PorductDetails = () => {
  const router = useRouter();
  const path = router.asPath;
  const productId = router?.query?.porductId;
  const [colorSelected, setColorSelected] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);

  const products = data;

  const initialSize = products?.product_size[0]?.size_name
    ? products?.product_size[0]?.size_name
    : "No Size Selected";
  const initialColor = products?.product_colour[0]?.slug
    ? products?.product_colour[0]?.slug
    : "No Color Selected";
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      setSize(initialSize);
      setColorName(initialColor);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (sizeSelected || colorSelected) {
      setDisableBtn(false);
    }
  }, [sizeSelected, colorSelected]);

  const handleSelectSize = (data) => {
    setSize(data);
    setSizeSelected(true);
  };
  const handleSelectColor = (data,code) => {
    setColorName(data);
    setColorCode(code)
    setColorSelected(true);
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  // console.log('your log output',description)

  // console.log(products?.product_size[0]?.size_name);
  console.log("kash", products);
  // console.log("sdfs", productId);
  // console.log(size);
  // console.log(color);
  // console.log(count);

  // discount calculation here

  /* if (products.discount.length > 0) {
    products.discount.forEach((element) => {
      let ds_price = 0;
      if (element.discount_type == "percentage") {
        ds_price = prdoucts.mrp_price * (element.discount_amount / 100);
        if (ds_price > element.max_amount) {
          ds_price = element.max_amount;
        }

        setProductPrice(prdoucts.mrp_price - ds_price);
      } else {
      }
    });
  } */
  const description = parse(products?.description)?.props?.children;
  const finalData = {
    id: products.id,
    image: products.product_image,
    name: products?.product_name,
    size: size,
    text: description,
    color: color,
    colorCode:colorCode,
    price: products?.mrp_price,
    amount: count,
    totalAmount: count,
    totalPrice: count * parseFloat(products?.mrp_price),
  };
  // console.log("ami kas", finalData);

  return (
    <>
      <HomePageIntro title={"Master Collection Layout "} />
      <Box mt={10} mb={4} sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}>
        <Grid container>
          <Grid item lg={7}>
            <Stack direction={"column"}>
              <img src={products?.product_image} alt="" width={"fit-content"} />
              <Stack direction={"row"}>
                {" "}
                <img src="/assets/6.png" alt="" width={"100%"} />
                <img src="/assets/7.png" alt="" width={"100%"} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item lg={5}>
            <Stack direction={"column"} mx={5} mt={3}>
              <Typography variant="login1" color="initial" fontWeight="bold">
                {products?.product_name}
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="cardHeader1" color="initial">
                  Home {path}
                </Typography>
                {/* <Typography variant="cardHeader1" color="initial">
                WOMEN /
              </Typography>
              <Typography variant="cardHeader1" color="initial">
                KURTI & FATUA
              </Typography> */}
              </Stack>
            </Stack>
            <Stack direction={"column"} mx={5} mt={3} spacing={3}>
              <Typography variant="cardHeader3" color="initial">
                {parse(products?.description)}
              </Typography>
              <Typography variant="header1" color="initial">
                Price : {products?.mrp_price} ৳
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems="center">
                <Typography variant="cardHeader3" color="initial">
                  Sizes
                </Typography>
                <hr
                  style={{
                    textAlign: "left",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "black",
                    // maxWidth: "350px",
                  }}
                />
              </Stack>
              <Stack
                direction={"row"}
                spacing={1}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Stack direction={"row"}>
                  {products?.product_size?.map((size, index) => (
                    <Button
                      variant="primary"
                      color="primary"
                      onClick={() => handleSelectSize(size?.size_name)}
                    >
                      {size?.size_name}
                    </Button>
                  ))}

                  {/* <Button variant="text" color="primary">
                    M
                  </Button>
                  <Button variant="text" color="primary">
                    L
                  </Button>
                  <Button variant="text" color="primary">
                    XL
                  </Button>
                  <Button variant="text" color="primary">
                    XXL
                  </Button> */}
                </Stack>
                <Button variant="text" color="primary">
                  size guide
                </Button>
              </Stack>
              <Stack direction={"row"} spacing={1} alignItems="center">
                <Typography variant="cardHeader3" color="initial">
                  Quantity
                </Typography>
                <hr
                  style={{
                    textAlign: "left",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "black",
                    // maxWidth: "340px",
                  }}
                />
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ width: "100%", maxWidth: "50px" }}
              >
                <IconButton
                  size="small"
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 1));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="cardHeader3" color="initial">
                  {" "}
                  {count}
                </Typography>
                <IconButton
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Stack direction={"row"} spacing={1} alignItems="center">
                <Typography variant="cardHeader3" color="initial">
                  Colors
                </Typography>
                <hr
                  style={{
                    textAlign: "left",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "black",
                    // maxWidth: "350px",
                  }}
                />
              </Stack>
              <Stack direction={"row"} spacing={1} height={40}>
                {products.product_colour.map((color, index) => (
                  <Button
                    key={index}
                    style={{ backgroundColor: `${color?.color_code}` }}
                    onClick={() => handleSelectColor(color?.slug,color?.color_code)}
                  ></Button>
                ))}
                {/* <Button variant="contained" color="primary"></Button>
                <Button variant="contained" color="primary"></Button>
                <Button variant="contained" color="primary"></Button>
                <Button variant="contained" color="primary"></Button> */}
              </Stack>
              <Button
                variant="contained"
                color="background2"
                type="submit"
                disabled={disableBtn}
                onClick={() => dispatch(addToCart(finalData))}
              >
                ADD TO CART
              </Button>
            </Stack>
          </Grid>
          <Grid item lg={7}>
            <img src="/assets/Bitmap.png" alt="" width={"100%"} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default PorductDetails;