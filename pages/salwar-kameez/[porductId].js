import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import HomePageIntro from "../../components/HomePageIntro";
import { Box } from "@mui/system";
import Footer from "../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useGetParticularProductsQuery } from "../../src/features/api/apiSlice";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { addToCart } from "../../src/features/cart/cartSlice";
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
  const [sizeId, setSizeId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [stockDetails, setStockDetails] = useState([]);
  const [stockAmount, setStockAmount] = useState(0);
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
  // console.log('your log output',typeof(productId),productId)
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
      // console.log(sizeSelected);
      // console.log(colorSelected);
      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId && stock?.colour_id === colorId
        );
        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          console.log("stock morethan 0", stockAmount);
          setDisableBtn(false);
        }
        if (stockAmount === undefined) {
          console.log("stock less then 0", stockAmount);
          setDisableBtn(true);
        }
        // console.log("your stock", stockDetails);
        // console.log("your log outputsdfsdfsdds");
      }
    }
    if (
      (products?.p_colours?.length == 0 || products?.p_sizes?.length == 0) &&
      (products?.p_colours?.length > 0 || products?.p_sizes?.length > 0)
    ) {
      if (sizeSelected == true || colorSelected == true) {
        console.log("inside anyone");
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId || stock?.colour_id === colorId
        );
        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          console.log("stock morethan 0", stockAmount);
          setDisableBtn(false);
        }
        if (stockAmount === undefined) {
          console.log("stock less then 0", stockAmount);
          setDisableBtn(true);
        }
        // setDisableBtn(false);
      }
    }
  }, [sizeSelected, colorSelected, stockDetails, colorId, sizeId, stockAmount]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  /* useEffect(() => {
    handleSuccess();
  }, [data, isSuccess, isLoading]); */
  // useEffect(() => {}, [sizeSelected, colorSelected]);

  const handleSelectSize = (data, id) => {
    setSizeSelected(true);
    setSizeId(id);
    setSize(data);
  };
  const handleSelectColor = (data, code, id) => {
    setColorSelected(true);
    setColorId(id);
    setColorName(data);
    setColorCode(code);
  };

  // console.log("your log output", router);

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
  const description =
    products?.p_description; /* parse(products?.p_description)?.props?.children?.props?.children */
  // console.log("your log output", description);
  const finalData = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    size: size,
    size_id:sizeId,
    text: products?.p_description,
    color: color,
    color_id:colorId,
    colorCode: colorCode,
    price: products?.p_sale_price,
    amount: count,
    stock: stockAmount,
    totalAmount: count,
    totalPrice: count * parseFloat(products?.p_sale_price),
  };
  // console.log("ami kas", finalData);

  return (
    <>
      <HomePageIntro title={"Saree "} />
      <Hidden only={["xms", "xs"]}>
        <Box
          mt={10}
          mb={4}
          sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}
        >
          <Grid container>
            <Grid item xl={6} lg={7} md={6}>
              {/* <Image
            src={products?.feature_image}
            width={1000}
            height={1000}
           sx={{width:"90vw",maxWidth:"100%"}}
            /> */}
              <img
                src={products?.feature_image}
                alt=""
                style={{
                  width: "90vw",
                  maxWidth: "664px",
                }}
              />
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
            <Grid item xl={6} lg={5} md={6}>
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
                        onClick={() =>
                          handleSelectSize(size?.size_name, size?.id)
                        }
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
                  <Typography variant="cardHeader3" color="#959595">
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
                  sx={{ width: "100%", maxWidth: "50px", color: "#959595" }}
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
                  <Typography variant="cardHeader3" color="#959595">
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
                  <Typography variant="cardHeader3" color="#959595">
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
                        border: "1px solid #000",
                      }}
                      onClick={() =>
                        handleSelectColor(
                          color?.color_name,
                          color?.color_code,
                          color?.id
                        )
                      }
                    ></Box>
                  ))}
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Typography variant="cardHeader3" color="#959595" width="25%">
                    Avalability & Spces
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
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    In Availability:{" "}
                    {stockAmount > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    Check In Store Availability
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    Check Specs
                  </Typography>
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
      </Hidden>
      <Hidden only={["md", "lg", "xl", "sm"]}>
        <Box mt={10} sx={{ width: "100%", maxWidth: "1500px", mx: "auto" }}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={true}
            modules={[Pagination]}
          >
            <SwiperSlide
              style={{
                backgroundImage:
                  "url('https://aranya.com.bd/wp-content/uploads/2023/02/1-2.jpg')",
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={3} sx={{ pt: 85, px: 4 }}>
                <Stack direction={"column"}>
                  <Typography variant="login2" color="initial">
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography variant="tabText1" color="initial">
                  Price : {products?.p_sale_price} ৳
                </Typography>
              </Stack>
            </SwiperSlide>
            <SwiperSlide
              style={{
                backgroundImage:
                  "url('https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg')",
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={3} sx={{ pt: 85, px: 4 }}>
                <Stack direction={"column"}>
                  <Typography variant="login2" color="initial">
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography variant="tabText1" color="initial">
                  Price : {products?.p_sale_price} ৳
                </Typography>
              </Stack>
            </SwiperSlide>
            <SwiperSlide
              style={{
                backgroundImage:
                  "url('https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg')",
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={3} sx={{ pt: 85, px: 4 }}>
                <Stack direction={"column"}>
                  <Typography variant="login2" color="initial">
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography variant="tabText1" color="initial">
                  Price : {products?.p_sale_price} ৳
                </Typography>
              </Stack>
            </SwiperSlide>
            <SwiperSlide
              style={{
                backgroundImage:
                  "url('https://aranya.com.bd/wp-content/uploads/2023/02/4-2.jpg')",
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={5} sx={{ pt: 85, px: 4 }}>
                <Stack direction={"column"}>
                  <Typography variant="login2" color="initial">
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography variant="tabText1" color="initial">
                  Price : {products?.p_sale_price} ৳
                </Typography>
              </Stack>
            </SwiperSlide>
          </Swiper>
          <Grid container>
            <Grid item xl={6} lg={5} md={6}>
              <Stack
                direction={"column"}
                mt={3}
                spacing={2}
                sx={{ width: "85%", maxWidth: "1500px", mx: "auto" }}
              >
                <Stack direction={"row"} spacing={1} alignItems="center" >
                  <Typography variant="cardHeader3" color="#959595">
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
                  <Button variant="text" color="primary" size="small">
                    size guide
                  </Button>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Typography variant="cardHeader3" color="#959595">
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
                  sx={{ width: "100%", maxWidth: "50px", color: "#959595" }}
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
                  <Typography variant="cardHeader3" color="#959595">
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
                  <Typography variant="cardHeader3" color="#959595">
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
                        border: "1px solid #000",
                      }}
                      onClick={() =>
                        handleSelectColor(color?.color_name, color?.color_code)
                      }
                    ></Box>
                  ))}
                </Stack>
                <Typography variant="cardHeader3" color="initial">
                  {description}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Typography variant="cardHeader3" color="#959595" width="25%">
                    Avalability & Spces
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
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="cardHeader12" color="initial">
                    In Availability:{" "}
                    {stockAmount > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    Check In Store Availability
                  </Typography>
                  <Typography variant="cardHeader12" color="initial">
                    Check Specs
                  </Typography>
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
          <Stack
            direction={"row"}
            sx={{
              backgroundColor: "#000",
              mt: 2,
              color: "#fff",
              justifyContent: "space-between",
              p: 4,
            }}
          >
            <Stack direction={"row"} spacing={3}>
              <Typography variant="cardLocation1" color="#9F9F9F">
                Home
              </Typography>
              <Typography variant="cardLocation1" color="#9F9F9F">
                Women
              </Typography>
              <Typography variant="cardLocation1" color="#9F9F9F">
                Kurti & Fatua{" "}
              </Typography>
            </Stack>
            <Typography variant="tabText1" color="#fff">
              Add To Cart
            </Typography>
          </Stack>
        </Box>
      </Hidden>
    </>
  );
};

export default PorductDetails;

