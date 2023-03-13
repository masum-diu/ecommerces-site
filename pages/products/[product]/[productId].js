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
import HomePageIntro from "../../../components/HomePageIntro";
import { Box } from "@mui/system";
import Footer from "../../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useGetParticularProductsQuery } from "../../../src/features/api/apiSlice";
import { useDispatch } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { addToCart } from "../../../src/features/cart/cartSlice";
import ThumbsGallery from "../../../components/thumble/ThumbsGallery";
import ThumbsGallery1 from "../../../components/thumble/ThumbsGallery1";
import Head from "next/head";
const PorductDetails = () => {
  const router = useRouter();
  const path = router.asPath;
  const productId = router?.query?.productId;
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
  const [activesize, setActiveSize] = useState(null);
  const [activecolor, setActiveColor] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState([]);
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);

  useEffect(() => {
    if (isSuccess) {
      const handleSuccess = async () => {
        setProducts(data?.data);
        setActiveSize(data?.data.p_sizes[0]?.id);
        setActiveColor(data?.data.p_colours[0]?.id);
      };
      handleSuccess();
    }
  }, [data, isSuccess, isLoading]);

  useEffect(() => {
    if (products?.p_colours?.length > 0 && products?.p_sizes?.length > 0) {
      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId && stock?.colour_id === colorId
        );
        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          setDisableBtn(false);
        }
        if (stockAmount === undefined) {
          setDisableBtn(true);
        }
      }
    }
    if (
      (products?.p_colours?.length == 0 || products?.p_sizes?.length == 0) &&
      (products?.p_colours?.length > 0 || products?.p_sizes?.length > 0)
    ) {
      if (sizeSelected == true || colorSelected == true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId || stock?.colour_id === colorId
        );
        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          setDisableBtn(false);
        }
        if (stockAmount === undefined) {
          setDisableBtn(true);
        }
      }
    }
  }, [sizeSelected, colorSelected, stockDetails, colorId, sizeId, stockAmount]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleSelectSize = (data, id) => {
    setSizeSelected(true);
    setSizeId(id);
    setSize(data);
    setActiveSize(id);
  };
  const handleSelectColor = (data, code, id) => {
    setColorSelected(true);
    setColorId(id);
    setColorName(data);
    setColorCode(code);
    setActiveColor(id);
  };

  const handleAddToCart = async (finalData) => {
    dispatch(addToCart(finalData));
    await toast.success("Added To Cart!");
  };

  const handleImageForThumble = (data, images) => {
    setOpen(data);
    setImageData(images);
  };

  const description = products?.p_description;
  const finalData = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    size: size,
    size_id: sizeId,
    text: products?.p_description,
    color: color,
    color_id: colorId,
    colorCode: colorCode,
    price: products?.p_sale_price,
    amount: count,
    stock: stockAmount,
    totalAmount: count,
    totalPrice: count * parseFloat(products?.p_sale_price),
    taxAmount: products?.p_tax?.tax_percentage,
    priceWithTax:
      products?.p_sale_price * (products?.p_tax?.tax_percentage / 100) +
      products?.p_sale_price,
  };
  return (
    <>
      <Head>
          <meta name="author" content="Aranya" />
          <meta name="sitemap_link" content="sitemap.com" />
          <meta property="og:site_name" content="Aranya" />
           
          <meta name="keywords" content={products?.p_name} />
          <meta name="twitter:card" content="product" />
          <meta name="twitter:title" content={products?.p_name} />
          <meta name="twitter:site" content="@webable_digital" />
          <meta name="twitter:creator" content="@webable_digital" />
          <meta name="twitter:description" content={products?.p_description} />
          <meta name="twitter:image" content={products?.feature_image } />
          
          <meta property="og:title" content={products?.p_name} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={router.pathname} />
          <meta property="og:image" content={products?.feature_image } />
          <meta property="og:description" content={products?.p_description} />
          <meta property="og:price:amount" content={products?.p_sale_price} />
          <meta property="og:price:currency" content="BDT"/>
      </Head>
      <HomePageIntro title={"Saree "} />
      <Hidden only={["xms", "xs"]}>
        <Box
          mt={10}
          mb={4}
          //  sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}
        >
          <Grid container>
            <Grid item xl={6} lg={7} md={6}>
              <img
                onClick={() =>
                  handleImageForThumble(true, {
                    img1: products?.feature_image,
                    img2: products?.p_image_one,
                    img3: products?.p_image_two,
                    img4: products?.p_image_three,
                  })
                }
                // src={products?.feature_image}
                src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_830,w_664/${products?.feature_image
                  ?.split("/")
                  .slice(-3)
                  .join("/")}`}
                alt=""
                style={{
                  width: "100%",
                  // maxWidth: "664px",
                }}
              />
              <Stack direction={"row"} spacing={0.5} mb={0.5}>
                <img
                  onClick={() =>
                    handleImageForThumble(true, {
                      img1: products?.p_image_one,
                      img2: products?.feature_image,
                      img3: products?.p_image_two,
                      img4: products?.p_image_three,
                    })
                  }
                  // src={products?.p_image_one}
                  src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_750,w_332/${products?.p_image_one
                    ?.split("/")
                    .slice(-3)
                    .join("/")}`}
                  alt=""
                  style={{
                    width: "100%",
                    // maxWidth: "330px",
                  }}
                />
                <img
                  onClick={() =>
                    handleImageForThumble(true, {
                      img1: products?.p_image_two,
                      img2: products?.feature_image,
                      img3: products?.p_image_one,
                      img4: products?.p_image_three,
                    })
                  }
                  // src={products?.p_image_two}
                  src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_750,w_332/${products?.p_image_two
                    ?.split("/")
                    .slice(-3)
                    .join("/")}`}
                  alt=""
                  style={{
                    width: "100%",
                    // maxWidth: "330px",
                  }}
                />
              </Stack>

              <img
                onClick={() =>
                  handleImageForThumble(true, {
                    img1: products?.p_image_three,
                    img2: products?.feature_image,
                    img3: products?.p_image_one,
                    img4: products?.p_image_two,
                  })
                }
                // src={products?.p_image_three}
                src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_830,w_664/${products?.p_image_three
                  ?.split("/")
                  .slice(-3)
                  .join("/")}`}
                alt=""
                style={{
                  width: "100%",
                  // maxWidth: "664px",
                }}
              />
            </Grid>
            <Grid item xl={5} lg={5} md={6}>
              <Stack direction={"column"} mx={5} mt={3} width={"100%"}>
                <Typography className="fonts" variant="login1" color="initial"sx={{letterSpacing:.6,}} >
                  {products?.p_name}
                </Typography>
                <Stack direction={"row"} spacing={1}>
                  <Typography
                    variant="cardHeader1"
                    fontWeight={400}
                    color="initial"
                    textTransform={"uppercase"}
                     sx={{letterSpacing:.6}}
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
                <Typography variant="cardHeader3" color="initial" sx={{letterSpacing:.17}}>
                  {description}
                </Typography>
                <Typography variant="header1" color="initial" letterSpacing={.3} fontWeight={700}>
                  Price : ৳ {products?.p_sale_price} 
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
                  <Stack
                    direction={"row"}
                    spacing={2}
                    width={"20%"}
                    justifyContent="space-between"
                  >
                    {products?.p_sizes?.map((size, index) => (
                      <Button
                        key={index}
                        variant={`${
                          activesize === size?.id ? "outlined" : "primary"
                        }`}
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
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        border: `${
                          activecolor === color?.id
                            ? "4px solid #2d323f"
                            : "1px solid black"
                        }`,
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
                  onClick={() => handleAddToCart(finalData)}
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
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.feature_image,
                  img2: products?.p_image_one,
                  img3: products?.p_image_two,
                  img4: products?.p_image_three,
                })
              }
              style={{
                backgroundImage: `url(${products?.feature_image})`,
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
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_one,
                  img2: products?.feature_image,
                  img3: products?.p_image_two,
                  img4: products?.p_image_three,
                })
              }
              style={{
                backgroundImage: `url(${products?.p_image_one})`,
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
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_two,
                  img2: products?.feature_image,
                  img3: products?.p_image_one,
                  img4: products?.p_image_three,
                })
              }
              style={{
                backgroundImage: `url(${products?.p_image_two})`,
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
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_three,
                  img2: products?.feature_image,
                  img3: products?.p_image_one,
                  img4: products?.p_image_two,
                })
              }
              style={{
                backgroundImage: `url(${products?.p_image_three})`,
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
            <Grid item xl={6} lg={5} md={6} width={"100%"}>
              <Stack
                direction={"column"}
                mt={3}
                spacing={2}
                sx={{ width: "85%", maxWidth: "1500px", mx: "auto" }}
              >
                <Stack direction={"row"} spacing={1} alignItems="center">
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
                        key={index}
                        variant={`${
                          activesize === size?.id ? "outlined" : "primary"
                        }`}
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
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        border: `${
                          activecolor === color?.id
                            ? "4px solid #2d323f"
                            : "1px solid black"
                        }`,
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
                  onClick={() => handleAddToCart(finalData)}
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
      <Hidden only={["xl", "lg", "md", "sm"]}>
        <ThumbsGallery open={open} setOpen={setOpen} imageData={imageData} />
      </Hidden>
      <Hidden only={["sm", "xs", "xms"]}>
        <ThumbsGallery1 open={open} setOpen={setOpen} imageData={imageData} />
      </Hidden>
    </>
  );
};

export default PorductDetails;
