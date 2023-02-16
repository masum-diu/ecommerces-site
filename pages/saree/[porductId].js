import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";

import HomePageIntro from "../../components/HomePageIntro";
import { Box } from "@mui/system";
import Footer from "../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
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
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);

  // const products = data?.data;

  /* const initialSize = products?.p_sizes[0]?.size_name
    ? products?.p_sizes[0]?.size_name
    : "No Size Selected";
  const initialColor = products?.p_colours[0]?.slug
    ? products?.p_colours[0]?.slug
    : "No Color Selected"; */

  useEffect(() => {
    if (isSuccess) {
      const handleSuccess = async () => {
        await setProducts(data?.data);
      };
      handleSuccess();
    }
  }, [data, isSuccess, isLoading]);

  useEffect(() => {
    if (products?.p_colours?.length > 0 && products?.p_sizes?.length > 0) {
      console.log(sizeSelected);
      console.log(colorSelected);
      if (sizeSelected === true && colorSelected === true) {
        console.log("your log outputsdfsdfsdds");
        setDisableBtn(false);
      }
    }
    if (
      (products?.p_colours?.length == 0 || products?.p_sizes?.length == 0) &&
      (products?.p_colours?.length > 0 || products?.p_sizes?.length > 0)
    ) {
      if (sizeSelected == true || colorSelected == true) {
        setDisableBtn(false);
      }
    }
  }, [sizeSelected, colorSelected]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  /* useEffect(() => {
    handleSuccess();
  }, [data, isSuccess, isLoading]); */
  // useEffect(() => {}, [sizeSelected, colorSelected]);

  const handleSelectSize = (data) => {
    setSizeSelected(true);
    setSize(data);
  };
  const handleSelectColor = (data, code) => {
    setColorSelected(true);
    setColorName(data);
    setColorCode(code);
  };

  console.log("your log output", router);

  // console.log(products?.product_size[0]?.size_name);
  // console.log("kash", products);
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
  const description =
    products?.p_description; /* parse(products?.p_description)?.props?.children?.props?.children */
  // console.log("your log output", description);
  const finalData = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    size: size,
    text: description,
    color: color,
    colorCode: colorCode,
    price: products?.p_sale_price,
    amount: count,
    totalAmount: count,
    totalPrice: count * parseFloat(products?.p_sale_price),
  };
  // console.log("ami kas", finalData);

  return (
    <>
      <HomePageIntro title={"Saree "} />
      <Box mt={10} mb={4} sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}>
        <Grid container>
          <Grid item lg={7}>
            <img src={products?.feature_image} alt="" style={{
                width: "90vw",
                maxWidth: "664px",
              }} />
            <Stack direction={"row"} spacing={0.5} mb={0.5}>
              <img
                src="/assets/6.png"
                alt=""
                style={{
                  width: "90vw",
                  maxWidth: "330px",
                }}
              />
              <img
                src="/assets/7.png"
                alt=""
                style={{
                  width: "90vw",
                  maxWidth: "330px",
                }}
              />
            </Stack>

            <img
              src="/assets/Bitmap.png"
              alt=""
              style={{
                width: "90vw",
                maxWidth: "664px",
              }}
            />
          </Grid>
          <Grid item lg={5} md={6}>
            <Stack direction={"column"} mx={5} mt={3} width={"100%"}>
              <Typography variant="login1" color="initial" fontWeight="bold">
                {products?.p_name}
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <Typography
                  variant="cardHeader1"
                  color="initial"
                  textTransform={"uppercase"}
                >
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
                {description}
              </Typography>
              <Typography variant="header1" color="initial">
                Price : {products?.p_sale_price} ৳
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
                  {products?.p_sizes?.map((size, index) => (
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
                {products?.p_colours?.map((color, index) => (
                  <Box
                    size="small"
                    key={index}
                    style={{
                      backgroundColor: `${color?.color_code}`,
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleSelectColor(color?.color_name, color?.color_code)
                    }
                  ></Box>
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
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default PorductDetails;
