import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Hidden,
  IconButton,
  ListItemText,
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
import ThumbsGallery2 from "../../../components/thumble/ThumbsGallery2";
import SizeModal from "../../../components/SizeModal";
import { FiHeart } from "react-icons/fi";

const PorductDetails = () => {
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
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

  const [sizeGuide, setSizeGuide] = useState(false);
  const [noteTextForStock, setNoteTextForStock] = useState(
    " Please select a color and size in order to check stock availability."
  );
  const [noteTextForCart, setNoteTextForCart] = useState(
    " Please select a color and size in order to enable Add To Cart."
  );
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
      if (colorSelected === false && sizeSelected === false) {
        setNoteTextForStock(
          " Please select a color and size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color and size in order to enable Add To Cart"
        );
      }
      if (colorSelected === false && sizeSelected === true) {
        setNoteTextForStock(
          " Please select a color in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color in order to enable Add To Cart"
        );
      }
      if (sizeSelected === false && colorSelected === true) {
        setNoteTextForStock(
          " Please select a size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a size in order to enable Add To Cart."
        );
      }

      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId && stock?.colour_id === colorId
        );

        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          setDisableBtn(false);
          setNoteTextForStock("In Stock");
        }
        if (stockAmount === undefined || stockAmount === 0) {
          setDisableBtn(true);
          setNoteTextForStock("Out of Stock");
        }
        setNoteTextForCart("");
      }
      /* if (sizeSelected === false || colorSelected === false) {
        setNoteTextForCart(
          " Please select a color and size in order to enable Add To Cart."
        );
        setNoteTextForStock(
          " Please select a color and size in order to check stock availability."
        );
      } */ if (
        products?.p_colours?.length > 0 &&
        colorSelected === false &&
        sizeSelected === true
      ) {
        setNoteTextForStock(
          " Please select a color in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color in order to enable Add To Cart"
        );
      }
      if (
        products?.p_sizes?.length > 0 &&
        sizeSelected === false &&
        colorSelected === true
      ) {
        setNoteTextForStock(
          " Please select a size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a size in order to enable Add To Cart."
        );
      }
    }

    if (
      (products?.p_colours?.length == 0 || products?.p_sizes?.length == 0) &&
      (products?.p_colours?.length > 0 || products?.p_sizes?.length > 0)
    ) {
      if (sizeSelected == true || colorSelected == true) {
        if (colorSelected == true) {
          const selectedProduct = products?.p_stocks?.find(
            (stock) => stock?.colour_id === colorId
          );
          setStockDetails(selectedProduct);
          setStockAmount(selectedProduct?.stock);
        }
        if (sizeSelected == true) {
          const selectedProduct = products?.p_stocks?.find(
            (stock) => stock?.size_id === sizeId
          );
          setStockDetails(selectedProduct);
          setStockAmount(selectedProduct?.stock);
        }

        if (stockAmount > 0) {
          setDisableBtn(false);
          setNoteTextForStock("In Stock");
        }
        if (stockAmount === undefined) {
          setDisableBtn(true);
          setNoteTextForStock("Out of Stock");
        }

        setNoteTextForCart("");
      }

      if (
        products?.p_colours?.length > 0 &&
        (products?.p_sizes?.length === undefined ||
          products?.p_sizes?.length === 0) &&
        colorSelected === false
      ) {
        setNoteTextForStock(
          " Please select a color in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color in order to enable Add To Cart"
        );
      }
      if (
        (products?.p_colours?.length === undefined ||
          products?.p_colours?.length === 0) &&
        products?.p_sizes?.length > 0 &&
        sizeSelected === false
      ) {
        setNoteTextForStock(
          " Please select a size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a size in order to enable Add To Cart"
        );
      }
    }
  }, [
    sizeSelected,
    colorSelected,
    colorId,
    sizeId,
    stockAmount,
    products?.p_colours?.length,
    products?.p_sizes?.length,
  ]);
  /*   useEffect(() => {
    if (
      products?.p_sizes?.length > 0 &&
      products?.p_colours?.length > 0 &&
      sizeSelected === false &&
      colorSelected === false
    ) {
      setNoteTextForCart(
        " Please select a color and size in order to enable Add To Cart."
      );
      setNoteTextForStock(
        " Please select a color and size in order to check stock availability."
      );
    }
    if (
      products?.p_sizes?.length > 0 &&
      products?.p_colours?.length < 0 &&
      sizeSelected === false
    ) {
      setNoteTextForCart(
        " Please select a size in order to enable Add To Cart."
      );
      setNoteTextForStock(
        " Please select a size in order to check stock availability."
      );
    }
    if (
      products?.p_colours?.length > 0 &&
      products?.p_sizes?.length < 0 &&
      colorSelected === false
    ) {
      setNoteTextForCart(
        " Please select a color in order to enable Add To Cart"
      );
      setNoteTextForStock(
        " Please select a color in order to check stock availability"
      );
    }
  }, [sizeSelected, colorSelected]); */

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
  console.log(products)
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
        <meta name="twitter:image" content={products?.feature_image} />

        <meta property="og:title" content={products?.p_name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content={products?.feature_image} />
        <meta property="og:description" content={products?.p_description} />
        <meta property="og:price:amount" content={products?.p_sale_price} />
        <meta property="og:price:currency" content="BDT" />
      </Head>
      <HomePageIntro title={"Saree "} />

      {/* Product Details for pc */}
      <Hidden only={["xms", "xs"]}>
        <Box
          mt={10}
          mb={4}
        //  sx={{ width: "90%", maxWidth: "1500px", mx: "auto" }}
        >
          <Grid container>
            <Grid item xl={6} lg={7} md={6} sm={12}>
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

            {/* Description Section */}
            <Grid item xl={5} lg={5} md={6}>
              <div style={{ position: "sticky", top: 100 }}>
                <Stack direction={"column"} mx={5} width={"100%"}>
                  <Typography
                    className="exterBold"
                    variant="login1"
                    color="initial"
                    sx={{ letterSpacing: 0.6 }}
                  >
                    {products?.p_name}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      variant="cardHeader1"
                      className="SemiBold"
                      fontWeight={400}
                      color="initial"
                      textTransform={"uppercase"}
                      sx={{ letterSpacing: 0.6 }}
                    >
                      Home {path ? path.split("/").join(" / ") : ""}
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
                  <Typography
                    className="light"
                    variant="cardHeader3"
                    color="initial"
                    sx={{ letterSpacing: 0.17 }}
                  >
                    {description}
                  </Typography>
                  <Stack direction={"row"} spacing={1}> <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClick}
                    size="small"

                    className="SemiBold"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textTransform: "capitalize",
                      width: "90vw",
                      maxWidth: "300px",
                    }}
                    endIcon={
                      arrow ? (
                        <RemoveIcon onClick={() => setArrow(!arrow)} />
                      ) : (
                        <AddIcon onClick={() => setArrow(!arrow)} />
                      )
                    }
                  >
                    Additional information
                  </Button>
                   <Button variant="outlined"   color="inherit"
                // style={{ display: `${showHeart}` }}
                aria-label=""
                // onClick={() => handleAddToWishList(dataForWishList)}
              >
                <FiHeart style={{ color: "#000",fontSize:"18px" }} />
              </Button></Stack>

                  {openList ? (
                    <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>

                      <Stack direction={"column"} spacing={1.5}>

                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Weight</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_weight}</Typography>} />
                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Dimensions</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_dimension}</Typography>} />
                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Fabric</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{<Stack direction={"row"} spacing={1}>
                          {
                            products?.p_fabric?.map((name) => <>

                              <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{name?.fabric_name}</Typography>

                            </>)}

                        </Stack>}</Typography>} />
                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Color</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{<Stack direction={"row"} spacing={1}>
                          {
                            products?.p_colours?.map((color) => <>

                              <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{color?.color_name}</Typography>

                            </>)}

                        </Stack>}</Typography>} />

                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Design Code</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_design_code}</Typography>} />

                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Size</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{
                          <Stack direction={"row"} spacing={1}>
                            {
                              products?.p_sizes?.map((size) => <>

                                <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{size?.size_name}</Typography>

                              </>)}

                          </Stack>
                        }</Typography>} />

                        <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Country of origin</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.country_of_origin}</Typography>} />



                      </Stack>
                    </Box>
                  ) : null}


                  <Typography
                    variant="header1"
                    className="SemiBold"
                    color="initial"
                    letterSpacing={0.3}
                    fontWeight={700}
                  >
                    Price : BDT {products?.p_sale_price}
                  </Typography>
                  {products?.p_sizes?.length > 0 ? (
                    <>
                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <Typography
                          variant="cardHeader3"
                          color="#959595"
                          className="SemiBold"
                        >
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
                              variant={`${activesize === size?.id ? "outlined" : "primary"
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
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => setSizeGuide(true)}
                        >
                          size guide
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    ""
                  )}
                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <Typography
                      variant="cardHeader3"
                      color="#959595"
                      className="SemiBold"
                    >
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
                    <Typography
                      variant="cardHeader3"
                      color="#959595"
                      className="SemiBold"
                    >
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
                          border: `${activecolor === color?.id
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
                    <Typography
                      variant="cardHeader3"
                      color="#959595"
                      width="25%"
                      className="SemiBold"
                    >
                      Avalability & Specs
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
                    {/* <Typography
                      variant="cardHeader12"
                      color="initial"
                      className="SemiBold"
                    >
                      Note: {noteTextForStock}
                    </Typography> */}
                    <Typography
                      variant="cardHeader12"
                      color="initial"
                      className="SemiBold"
                    >
                      In Availability:{" "}
                      {/* {stockAmount > 0 ? "In Stock" : "Out of Stock"} */}
                      {noteTextForStock}
                    </Typography>
                    <Typography
                      variant="cardHeader12"
                      color="initial"
                      className="SemiBold"
                    >
                      Check In Store Availability
                    </Typography>
                    <Typography
                      variant="cardHeader12"
                      color="initial"
                      className="SemiBold"
                    >
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
                  {noteTextForCart && (
                    <Alert severity="warning" >
                      <AlertTitle>
                        <Typography variant="cardHeader" color="initial">{noteTextForCart}</Typography>
                      </AlertTitle>
                    </Alert>
                  )}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Box>

        <Footer />
      </Hidden>

      {/* Product Details for tab amd mobile */}
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
                backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.0001) 62.15%, rgba(0, 0, 0, 0.5) 100%),url(${products?.feature_image})`,
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={5} sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}>
                <Stack direction={"column"}>
                  <Typography
                    variant="login2"
                    color="initial"
                    className="exterBold"
                  >
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                    className="SemiBold"
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  Price : {products?.p_sale_price} BDT
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
                backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.0001) 62.15%, rgba(0, 0, 0, 0.5) 100%),url(${products?.p_image_one})`,
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={5} sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}>
                <Stack direction={"column"}>
                  <Typography
                    variant="login2"
                    color="initial"
                    className="exterBold"
                  >
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                    className="SemiBold"
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  Price : {products?.p_sale_price} BDT
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
                backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.0001) 62.15%, rgba(0, 0, 0, 0.5) 100%),url(${products?.p_image_two})`,
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={5} sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}>
                <Stack direction={"column"}>
                  <Typography
                    variant="login2"
                    color="initial"
                    className="exterBold"
                  >
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                    className="SemiBold"
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  Price : {products?.p_sale_price} BDT
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
                backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.0001) 62.15%, rgba(0, 0, 0, 0.5) 100%),url(${products?.p_image_three})`,
                backgroundSize: "cover",
                height: "100vh",
                maxHeight: "fit-content",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack direction={"column"} spacing={5} sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}>
                <Stack direction={"column"}>
                  <Typography
                    variant="login2"
                    color="initial"
                    className="exterBold"
                  >
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="initial"
                    textTransform={"uppercase"}
                    className="SemiBold"
                  >
                    Home {path}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  Price : {products?.p_sale_price} BDT
                </Typography>
              </Stack>
            </SwiperSlide>
          </Swiper>
          <Grid container>
            <Grid item xl={6} lg={5} md={6} sm={6} width={"100%"}>
              <Stack
                direction={"column"}
                mt={3}
                spacing={2}
                sx={{ width: "85%", maxWidth: "1500px", mx: "auto" }}
              >
                {products?.p_sizes?.length > 0 ? <>
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
                    direction={"column"}
                    spacing={1}
                    alignItems="start"
                    justifyContent={"space-between"}
                  >
                    <Stack direction={"row"}>
                      {products?.p_sizes?.map((size, index) => (
                        <Button
                          key={index}
                          variant={`${activesize === size?.id ? "outlined" : "primary"
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
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={() => setSizeGuide(true)}
                    >
                      size guide
                    </Button>
                  </Stack></> : ""}
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
                        border: `${activecolor === color?.id
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
                <Stack direction={"row"} spacing={1}> <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleClick}
                    size="small"

                    className="SemiBold"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textTransform: "capitalize",
                      width: "90vw",
                      maxWidth: "300px",
                    }}
                    endIcon={
                      arrow ? (
                        <RemoveIcon onClick={() => setArrow(!arrow)} />
                      ) : (
                        <AddIcon onClick={() => setArrow(!arrow)} />
                      )
                    }
                  >
                    Additional information
                  </Button>
                   <Button variant="outlined"   color="inherit"
                // style={{ display: `${showHeart}` }}
                aria-label=""
                // onClick={() => handleAddToWishList(dataForWishList)}
              >
                <FiHeart style={{ color: "#000",fontSize:"18px" }} />
              </Button></Stack>
                {openList ? (
                  <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>

                    <Stack direction={"column"} spacing={1.5}>

                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Weight</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_weight}</Typography>} />
                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Dimensions</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_dimension}</Typography>} />
                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Fabric</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{<Stack direction={"row"} spacing={1}>
                        {
                          products?.p_fabric?.map((name) => <>

                            <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{name?.fabric_name}</Typography>

                          </>)}

                      </Stack>}</Typography>} />
                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Color</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{<Stack direction={"row"} spacing={1}>
                        {
                          products?.p_colours?.map((color) => <>

                            <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{color?.color_name}</Typography>

                          </>)}

                      </Stack>}</Typography>} />

                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Design Code</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.p_design_code}</Typography>} />

                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Size</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{
                        <Stack direction={"row"} spacing={1}>
                          {
                            products?.p_sizes?.map((size) => <>

                              <Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{size?.size_name}</Typography>

                            </>)}

                        </Stack>
                      }</Typography>} />

                      <ListItemText sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90vw", maxWidth: "250px" }} primary={<Typography variant="cardHeader12" className="SemiBold" color="initial">Country of origin</Typography>} secondary={<Typography variant="cardLocation1" sx={{ width: "50%" }} className="SemiBold" color="initial">{products?.country_of_origin}</Typography>} />



                    </Stack>
                  </Box>
                ) : null}
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
                    {/* {stockAmount > 0 ? "In Stock" : "Out of Stock"} */}
                    {noteTextForStock}
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
                {noteTextForCart && (
                  <Alert severity="warning">
                    <AlertTitle>
                      <Typography variant="cardLocation1" color="initial">{noteTextForCart}</Typography>
                    </AlertTitle>
                  </Alert>
                )}
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
            {/* <Typography variant="tabText1" color="#fff">
              Add To Cart
            </Typography> */}
          </Stack>
        </Box>
      </Hidden>
      <Hidden only={["xl", "lg", "md", "sm"]}>
        <ThumbsGallery open={open} setOpen={setOpen} imageData={imageData} />
      </Hidden>
      <Hidden only={["sm", "xs", "xms"]}>
        <ThumbsGallery1 open={open} setOpen={setOpen} imageData={imageData} />
      </Hidden>
      <Hidden only={["xs", "xms", "xl", "lg", "md"]}>
        <ThumbsGallery2 open={open} setOpen={setOpen} imageData={imageData} />
      </Hidden>
      <SizeModal open={sizeGuide} setOpen={setSizeGuide}></SizeModal>
    </>
  );
};

export default PorductDetails;
