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
  Box,
  ButtonGroup,
} from "@mui/material";
import { pink, red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import HomePageIntro from "../../../components/HomePageIntro";
// import { Box } from "@mui/system";
import Footer from "../../../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetMatchedWithProductQuery,
  useGetParticularProductsQuery,
} from "../../../src/features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
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
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import {
  addToWishList,
  removeFromWishList,
} from "../../../src/features/wishlist/wishListSlice";
import HovarImage from "../../../components/HovarableImage/HovarImage";
import style from "../../../public/assets/css/innerpage.module.css";
import { useCurrencyConversion } from "../../../src/hooks/useCurrencyConversion";

const PorductDetails = () => {
  const [openList, setOpenList] = React.useState(false);
  const [arrow, setArrow] = useState(false);
  const handleClick = () => {
    setOpenList((prev) => !prev);
    setArrow(!arrow);
  };
  const wishListArray = useSelector((state) => state.wishList.wishList);
  const myProduct = wishListArray.find(
    (product) => product.id === products?.id
  );
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
  const [subCat, setSubCat] = useState(0);
  const [cat, setCat] = useState(0);
  const dispatch = useDispatch();

  const [showHeart, setShowHeart] = useState(
    myProduct?.showHeart ? myProduct?.showHeart : "block"
  );
  const [showBrokenHeart, setShowBrokenHeart] = useState(
    myProduct?.showBrokenHeart ? myProduct?.showBrokenHeart : "none"
  );
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const category = products?.p_category?.id;
  const sub_catcategory = products?.p_subcategory?.id;
  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId);
  const { data: matchedwithProduct } = useGetMatchedWithProductQuery({
    category,
    sub_catcategory,
  });
  const RelatedProducts = matchedwithProduct?.data;
  // console.log("lost", RelatedProducts);

  // Fetching the particular Product
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

  // Product Selection Section
  useEffect(() => {
    if (products?.p_sizes?.length > 0) {
      if (products?.fragile === "Yes" && products?.fragile_charge) {
        setProductPrice(
          products?.p_stocks?.[0]?.mrp + products?.fragile_charge
        );
      } else {
        setProductPrice(products?.p_stocks?.[0]?.mrp);
      }

      if (sizeSelected === false) {
        setNoteTextForStock(
          " Please select a size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a size in order to enable Add To Cart"
        );
      }

      if (sizeSelected === true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId
        );
        if (products?.fragile === "Yes" && products?.fragile_charge) {
          setProductPrice(selectedProduct?.mrp + products?.fragile_charge);
          // setProductPrice(selectedProduct?.mrp);
        } else {
          setProductPrice(selectedProduct?.mrp);
          // setProductPrice(selectedProduct?.mrp);
        }
        // setProductPrice(selectedProduct?.mrp);
        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        // console.log('stock amount',stockAmount)
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
    }
    if (!products?.p_sizes?.length) {
      const selectedProduct = products?.p_stocks?.find(
        (stock) => stock?.size_id === sizeId
      );
      if (products?.fragile === "Yes" && products?.fragile_charge) {
        // console.log('inside no size')
        setProductPrice(selectedProduct?.mrp + products?.fragile_charge);
        // setProductPrice(selectedProduct?.mrp);
      } else {
        setProductPrice(selectedProduct?.mrp);
        // setProductPrice(selectedProduct?.mrp);
      }
      // setProductPrice(selectedProduct?.mrp);
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
  }, [
    sizeSelected,
    colorSelected,
    colorId,
    sizeId,
    stockAmount,
    products?.p_colours?.length,
    products?.p_sizes?.length,
    productPrice,
    products?.fragile,
    products?.fragile_charge,
  ]);
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
  const handleStockAvailability = (id) => {
    const element = products?.p_stocks.find((item) => item.size_id === id);

    // console.log("inside handle stock", element);
    if (element && element.stock > 0) {
      return "inStock";
    } else {
      return "outOfStock";
    }
  };
  const handleAddToCart = async (finalData) => {
    dispatch(addToCart(finalData));
    await toast.success("Added To Cart!");
  };

  const handleImageForThumble = (data, images) => {
    setOpen(data);
    setImageData(images);
  };
  const handleSizeGuide = (subcat_id, cat_id) => {
    setSizeGuide(true);
    setSubCat(subcat_id);
    setCat(cat_id);
  };
  const handleAddToWishList = async (data) => {
    dispatch(addToWishList(data));
    setShowBrokenHeart("block");
    setShowHeart("none");
    await toast.success("Added To WishList!");
  };
  const handleRemoveFromList = async (data) => {
    dispatch(removeFromWishList(data));
    setShowBrokenHeart("none");
    setShowHeart("block");
    await toast.error("Removed From Wishlist!");
  };
  const description = products?.p_description;

  // variable for price priceWithTax
  const priceWithTax1 = parseFloat(
    convertPrice(productPrice) * (products?.p_tax?.tax_percentage / 100) +
      convertPrice(productPrice)
  );
  const priceWithTaxRounded = Math.round(priceWithTax1);

  // variable for price vatAmountParticularProduct
  const vatAmountParticularProduct1 =
    parseFloat(
      convertPrice(productPrice) * (products?.p_tax?.tax_percentage / 100)
    ) * count;
  const vatAmountParticularProductRounded = Math.round(
    vatAmountParticularProduct1
  );

  // variable for price vatAmountParticularProduct
  const totalPriceWithTax1 =
    parseFloat(
      convertPrice(productPrice) * (products?.p_tax?.tax_percentage / 100) +
        convertPrice(productPrice)
    ) * count;
  const totalPriceWithTaxRounded = Math.round(totalPriceWithTax1);
  // console.log("priceWithTaxRounded", vatAmountParticularProductRounded);
  const finalData = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    design_code: products?.p_design_code,
    size: size,
    size_id: sizeId,
    text: products?.p_description,
    colors: products?.p_colours,
    price: convertPrice(productPrice),
    priceWithTax: priceWithTaxRounded,
    vatAmountParticularProduct: vatAmountParticularProductRounded,
    amount: count,
    stock: stockAmount,
    totalAmount: count,
    totalPrice: parseFloat(convertPrice(productPrice)) * count,
    totalPriceWithTax: totalPriceWithTaxRounded,
    taxAmount: products?.p_tax?.tax_percentage,
    priceOrg: productPrice,
    priceWithTaxOrg: parseFloat(
      productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
    ),
    vatAmountParticularProductOrg:
      count *
      parseFloat(productPrice * (products?.p_tax?.tax_percentage / 100)),
    totalPriceOrg: count * parseFloat(productPrice),
    totalPriceWithTaxOrg:
      count *
      parseFloat(
        productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
      ),
  };

  const dataForWishList = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    size: products?.p_sizes,
    text: products?.p_description,
    colors: products?.p_colours,
    price: convertPrice(productPrice),
    priceOrg: productPrice,
    amount: 1,
    stock: products?.p_stocks,
    totalAmount: 1,
    category: products?.p_category,
    sub_category: products?.p_subcategory,
    showHeart: "none",
    showBrokenHeart: "block",
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
          sx={{
            pt: { lg: 8, xs: 7 },
            width: "90%",
            maxWidth: "1500px",
            mx: "auto",
          }}
          mb={4}
          // sx={{ }}
        >
          <Grid container justifyContent={"center"}>
            <Grid item xl={4} lg={5} md={6} sm={12}>
              <img
                onClick={() =>
                  handleImageForThumble(true, {
                    img1: products?.p_image_one,
                    img2: products?.p_image_two,
                    img3: products?.p_image_three,
                    img4: products?.p_image_four,
                  })
                }
                // src={products?.feature_image}
                src={`${products?.p_image_one}`}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "auto",
                }}
              />
              <Stack direction={"row"} spacing={0.5} mb={0.5}>
                <Stack width={"50%"}>
                  <img
                    //  className={style.images}
                    onClick={() =>
                      handleImageForThumble(true, {
                        img1: products?.p_image_two,
                        img2: products?.p_image_one,
                        img3: products?.p_image_three,
                        img4: products?.p_image_four,
                      })
                    }
                    // src={products?.p_image_one}
                    src={`${products?.p_image_two}`}
                    alt=""
                    style={{
                      width: "100%",
                      maxWidth: "auto",
                    }}
                  />
                </Stack>
                <Stack width={"50%"}>
                  <img
                    //  className={style.images}
                    onClick={() =>
                      handleImageForThumble(true, {
                        img1: products?.p_image_three,
                        img2: products?.p_image_one,
                        img3: products?.p_image_two,
                        img4: products?.p_image_four,
                      })
                    }
                    // src={products?.p_image_two}
                    src={`${products?.p_image_three}`}
                    alt=""
                    style={{
                      width: "100%",
                      maxWidth: "auto",
                    }}
                  />
                </Stack>
              </Stack>

              <img
                onClick={() =>
                  handleImageForThumble(true, {
                    img1: products?.p_image_four,
                    img2: products?.p_image_one,
                    img3: products?.p_image_two,
                    img4: products?.p_image_three,
                  })
                }
                // src={products?.p_image_three}
                src={`${products?.p_image_four}`}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "auto",
                }}
              />
            </Grid>

            {/* Description Section */}
            <Grid item xl={8} lg={7} md={6}>
              <div style={{ position: "sticky", top: 100 }}>
                <Stack direction={"column"} mx={5} width={"100%"}>
                  <Typography
                    className="exterBold"
                    variant="productName"
                    color="initial"
                    sx={{ letterSpacing: 0.6 }}
                  >
                    {products?.p_name}
                  </Typography>
                  <Stack direction={"row"} spacing={1}></Stack>
                </Stack>
                <Stack direction={"column"} mx={5} mt={1} spacing={1.5}>
                  <Typography
                    className="light"
                    variant="cardHeader3"
                    color="initial"
                    sx={{ letterSpacing: 0.17 }}
                  >
                    {description}
                  </Typography>
                  <Typography
                    variant="header1"
                    className="SemiBold"
                    color="initial"
                    letterSpacing={0.3}
                    fontWeight={700}
                  >
                    {/* Price : BDT {productPrice} */}
                    {selectedCurrency} {convertPrice(productPrice)}
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
                        {/* <hr
                          style={{
                            textAlign: "left",
                            width: "100%",
                            height: "1px",
                            backgroundColor: "black",
                            // maxWidth: "350px",
                          }}
                        /> */}
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
                          // width={"20%"}
                          justifyContent="space-between"
                        >
                          {/* {console.log("your log output", products)} */}
                          {products?.p_sizes?.map((size, index) => (
                            <Button
                              startIcon={
                                handleStockAvailability(size.id) ===
                                "outOfStock" ? (
                                  <CloseIcon
                                    color="action"
                                    sx={{ color: red[300] }}
                                  />
                                ) : (
                                  ""
                                )
                              }
                              style={{
                                boxShadow:
                                  "0px 1px 4px 2px rgba(131 131 133 / 20%)",
                              }}
                              key={index}
                              variant={`${
                                activesize === size?.id ? "outlined" : "primary"
                              }`}
                              color="primary"
                              onClick={() =>
                                handleSelectSize(size?.size_name, size?.id)
                              }
                            >
                              {/* {console.log(products?.p_stocks.find((element)=>element.size_id===size.id))} */}
                              <Typography
                                variant="cardHeader"
                                color={
                                  handleStockAvailability(size?.id) ===
                                  "outOfStock"
                                    ? "#bbb6b6;"
                                    : ""
                                }
                              >
                                {size?.size_name}
                              </Typography>
                            </Button>
                          ))}
                        </Stack>
                        {products?.subcat_id === 13 ||
                        products?.subcat_id === 15 ||
                        products?.cat_id === 1 ? (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() =>
                              handleSizeGuide(
                                products?.subcat_id,
                                products?.cat_id
                              )
                            }
                          >
                            size guide
                          </Button>
                        ) : (
                          ""
                        )}
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
                    {/* <hr
                      style={{
                        textAlign: "left",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "black",
                        // maxWidth: "340px",
                      }}
                    /> */}
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems="center"
                    justifyContent={"space-between"}
                    // sx={{ width: "100%", maxWidth: "50px", color: "#959595" }}
                  >
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
                  </Stack>
                  {noteTextForCart && (
                    <>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <AiOutlineWarning style={{ color: "#ed6c02" }} />
                        <Typography variant="cardHeader" color="#ed6c02">
                          {noteTextForCart}
                        </Typography>
                      </Stack>
                    </>
                  )}
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"100%"}
                    spacing={1}
                  >
                    <Stack width={"100%"}>
                      <Button
                        size="small"
                        fullWidth
                        variant="contained"
                        color="background2"
                        type="submit"
                        disabled={disableBtn}
                        onClick={() => handleAddToCart(finalData)}
                      >
                        ADD TO CART
                      </Button>
                    </Stack>

                    <Button
                      variant="outlined"
                      color="primary"
                      aria-label=""
                      style={{ display: `${showHeart}` }}
                      onClick={() => handleAddToWishList(dataForWishList)}
                    >
                      <FiHeart
                        style={{
                          // color: "#000",
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      style={{ display: `${showBrokenHeart}` }}
                      aria-label=""
                      onClick={() =>
                        handleRemoveFromList({
                          id: products?.id,
                          amount: 1,
                          showHeart: "block",
                          showBrokenHeart: "none",
                        })
                      }
                    >
                      <HeartBrokenOutlinedIcon
                        style={{
                          color: "#000",
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      />
                    </Button>
                  </Stack>

                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <Typography
                      variant="cardHeader3"
                      color="#959595"
                      // width="25%"
                      className="SemiBold"
                    >
                      Availability & Specs
                    </Typography>
                    {/* <hr
                      style={{
                        textAlign: "left",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "black",
                        // maxWidth: "340px",
                      }}
                    /> */}
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
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    {" "}
                    <Button
                      variant="outlined"
                      color="primary"
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
                    {/* <Button
                      variant="outlined"
                      color="inherit"
                      aria-label=""
                      style={{ display: `${showHeart}` }}
                      onClick={() => handleAddToWishList(dataForWishList)}
                    >
                      <FiHeart
                        style={{
                          color: "#000",
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      style={{ display: `${showBrokenHeart}` }}
                      aria-label=""
                      onClick={() =>
                        handleRemoveFromList({
                          id: products?.id,
                          amount: 1,
                          showHeart: "block",
                          showBrokenHeart: "none",
                        })
                      }
                    >
                      <HeartBrokenOutlinedIcon
                        style={{
                          color: "#000",
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      />
                    </Button> */}
                  </Stack>

                  {openList ? (
                    <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>
                      <Stack direction={"column"} spacing={1.5}>
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Weight
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {products?.p_weight}
                            </Typography>
                          }
                        />
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Dimensions
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {products?.p_dimension}
                            </Typography>
                          }
                        />
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Fabric
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  {products?.p_fabric?.map((name) => (
                                    <>
                                      <Typography
                                        variant="cardLocation1"
                                        sx={{ width: "50%" }}
                                        className="SemiBold"
                                        color="initial"
                                      >
                                        {name?.fabric_name}
                                      </Typography>
                                    </>
                                  ))}
                                </Stack>
                              }
                            </Typography>
                          }
                        />
                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Color
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  {products?.p_colours?.map((color) => (
                                    <>
                                      <Typography
                                        variant="cardLocation1"
                                        sx={{ width: "50%" }}
                                        className="SemiBold"
                                        color="initial"
                                      >
                                        {color?.color_name}
                                      </Typography>
                                    </>
                                  ))}
                                </Stack>
                              }
                            </Typography>
                          }
                        />

                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Design Code
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {products?.p_design_code}
                            </Typography>
                          }
                        />

                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Size
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  {products?.p_sizes?.map((size) => (
                                    <>
                                      <Typography
                                        variant="cardLocation1"
                                        sx={{ width: "50%" }}
                                        className="SemiBold"
                                        color="initial"
                                      >
                                        {size?.size_name}
                                      </Typography>
                                    </>
                                  ))}
                                </Stack>
                              }
                            </Typography>
                          }
                        />

                        <ListItemText
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90vw",
                            maxWidth: "250px",
                          }}
                          primary={
                            <Typography
                              variant="cardHeader12"
                              className="SemiBold"
                              color="initial"
                            >
                              Country of origin
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="initial"
                            >
                              {products?.country_of_origin}
                            </Typography>
                          }
                        />
                      </Stack>
                    </Box>
                  ) : null}
                </Stack>
              </div>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: "90vw",
              margin: "0 auto",
              maxWidth: "fit-content",
              mt: 3,
            }}
          >
            <Typography
              variant="cardHeader1"
              color="initial"
              className="SemiBold"
            >
              Similar Products
            </Typography>

            <Grid container mt={1} spacing={1.5}>
              {RelatedProducts?.map((data, index) => (
                <Grid item lg={3} sm={6}>
                  <HovarImage
                    url={`/products/${
                      data?.p_subcategory?.slug === "unknown"
                        ? data?.p_category?.slug
                        : data?.p_subcategory?.slug
                    }/${data?.id}`}
                    data={data}
                    imageURL={`${data?.feature_image}`}
                  ></HovarImage>
                  {/* <img src={data?.feature_image} alt="" width={385} /> */}
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mt={1}
                  >
                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="SemiBold"
                    >
                      {data?.p_name}
                    </Typography>
                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="bold"
                    >
                      {" "}
                      {/* BDT {data?.p_stocks[0]?.mrp} */}
                      {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Footer />
      </Hidden>

      {/* Product Details for tab amd mobile */}
      <Hidden only={["md", "lg", "xl", "sm"]}>
        <Box pt={7} sx={{ width: "100%", maxWidth: "1500px", mx: "auto" }}>
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
                height: "92vh",
                maxHeight: "auto",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={5}
                sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}
              >
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
                    {/*Home {path}*/}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  {/* Price : {productPrice} BDT */}
                  {selectedCurrency} {convertPrice(productPrice)}
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
                height: "92vh",
                maxHeight: "auto",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={5}
                sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}
              >
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
                    {/*Home {path}*/}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  {/* Price : {productPrice} BDT */}
                  {selectedCurrency} {convertPrice(productPrice)}
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
                height: "92vh",
                maxHeight: "auto",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={5}
                sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}
              >
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
                    {/*Home {path}*/}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  {/* Price : {productPrice} BDT */}
                  {selectedCurrency} {convertPrice(productPrice)}
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
                height: "92vh",
                maxHeight: "auto",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Stack
                direction={"column"}
                spacing={5}
                sx={{ justifyContent: "flex-end", height: "90%", px: 2 }}
              >
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
                    {/*Home {path}*/}
                  </Typography>
                </Stack>
                <Typography
                  variant="tabText1"
                  color="initial"
                  className="exterBold"
                >
                  {/* Price : {productPrice} BDT */}
                  {selectedCurrency} {convertPrice(productPrice)}
                </Typography>
              </Stack>
            </SwiperSlide>
          </Swiper>
          <Grid container>
            <Grid item xl={6} lg={5} md={6} sm={6} width={"100%"}>
              <Stack
                direction={"column"}
                mt={3}
                spacing={1}
                sx={{ width: "85%", maxWidth: "1500px", mx: "auto" }}
              >
                <Typography variant="cardHeader3" color="initial">
                  {description}
                </Typography>
                {products?.p_sizes?.length > 0 ? (
                  <>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                      <Typography variant="cardHeader3" color="#959595">
                        Sizes
                      </Typography>
                      {/* <hr
                        style={{
                          textAlign: "left",
                          width: "100%",
                          height: "1px",
                          backgroundColor: "black",
                          // maxWidth: "350px",
                        }}
                      /> */}
                    </Stack>
                    <Stack
                      direction={"column"}
                      spacing={2}
                      alignItems="start"
                      justifyContent={"space-between"}
                    >
                      <Stack direction={"row"}>
                        {products?.p_sizes?.map((size, index) => (
                          <Button
                            startIcon={
                              handleStockAvailability(size.id) ===
                              "outOfStock" ? (
                                <CloseIcon
                                  color="action"
                                  sx={{ color: red[300] }}
                                />
                              ) : (
                                ""
                              )
                            }
                            style={{
                              boxShadow:
                                "0px 1px 4px 2px rgba(131 131 133 / 20%)",
                            }}
                            key={index}
                            variant={`${
                              activesize === size?.id ? "outlined" : "primary"
                            }`}
                            color="primary"
                            onClick={() =>
                              handleSelectSize(size?.size_name, size?.id)
                            }
                          >
                            {/* {console.log(products?.p_stocks.find((element)=>element.size_id===size.id))} */}
                            <Typography
                              variant="cardHeader"
                              color={
                                handleStockAvailability(size?.id) ===
                                "outOfStock"
                                  ? "#bbb6b6;"
                                  : ""
                              }
                            >
                              {size?.size_name}
                            </Typography>
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
                      {products?.subcat_id === 13 ||
                      products?.subcat_id === 15 ||
                      products?.cat_id === 1 ? (
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() =>
                            handleSizeGuide(
                              products?.subcat_id,
                              products?.cat_id
                            )
                          }
                        >
                          size guide
                        </Button>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </>
                ) : (
                  ""
                )}
                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Typography variant="cardHeader3" color="#959595">
                    Quantity
                  </Typography>
                  {/* <hr
                    style={{
                      textAlign: "left",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "black",
                      // maxWidth: "340px",
                    }}
                  /> */}
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
                {/* {products?.p_colours?.length > 0 ? (
                  <>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                      <Typography variant="cardHeader3" color="#959595">
                        Colors
                      </Typography>
                      
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
                  </>
                ) : (
                  ""
                )} */}

                {noteTextForCart && (
                  <>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <AiOutlineWarning style={{ color: "#ed6c02" }} />
                      <Typography variant="cardHeader" color="#ed6c02">
                        {noteTextForCart}
                      </Typography>
                    </Stack>
                  </>
                )}
                <Button
                  variant="contained"
                  color="background2"
                  type="submit"
                  disabled={disableBtn}
                  onClick={() => handleAddToCart(finalData)}
                >
                  ADD TO CART
                </Button>

                <Stack direction={"row"} spacing={1} alignItems="center">
                  <Typography variant="cardHeader3" color="#959595">
                    Availability & Spces
                  </Typography>
                  {/* <hr
                    style={{
                      textAlign: "left",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "black",
                      // maxWidth: "340px",
                    }}
                  /> */}
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
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  {" "}
                  <Button
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
                  <Button
                    variant="outlined"
                    color="inherit"
                    aria-label=""
                    style={{ display: `${showHeart}` }}
                    onClick={() => handleAddToWishList(dataForWishList)}
                  >
                    <FiHeart
                      style={{
                        color: "#000",
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    style={{ display: `${showBrokenHeart}` }}
                    aria-label=""
                    onClick={() =>
                      handleRemoveFromList({
                        id: products?.id,
                        amount: 1,
                        showHeart: "block",
                        showBrokenHeart: "none",
                      })
                    }
                  >
                    <HeartBrokenOutlinedIcon
                      style={{
                        color: "#000",
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    />
                  </Button>
                </Stack>
                {openList ? (
                  <Box sx={{ width: "80%", margin: "0 auto", px: 2 }}>
                    <Stack direction={"column"} spacing={1.5}>
                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Weight
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {products?.p_weight}
                          </Typography>
                        }
                      />
                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Dimensions
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {products?.p_dimension}
                          </Typography>
                        }
                      />
                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Fabric
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_fabric?.map((name) => (
                                  <>
                                    <Typography
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="initial"
                                    >
                                      {name?.fabric_name}
                                    </Typography>
                                  </>
                                ))}
                              </Stack>
                            }
                          </Typography>
                        }
                      />
                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Color
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_colours?.map((color) => (
                                  <>
                                    <Typography
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="initial"
                                    >
                                      {color?.color_name}
                                    </Typography>
                                  </>
                                ))}
                              </Stack>
                            }
                          </Typography>
                        }
                      />

                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Design Code
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {products?.p_design_code}
                          </Typography>
                        }
                      />

                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Size
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_sizes?.map((size) => (
                                  <>
                                    <Typography
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="initial"
                                    >
                                      {size?.size_name}
                                    </Typography>
                                  </>
                                ))}
                              </Stack>
                            }
                          </Typography>
                        }
                      />

                      <ListItemText
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "90vw",
                          maxWidth: "250px",
                        }}
                        primary={
                          <Typography
                            variant="cardHeader12"
                            className="SemiBold"
                            color="initial"
                          >
                            Country of origin
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="initial"
                          >
                            {products?.country_of_origin}
                          </Typography>
                        }
                      />
                    </Stack>
                  </Box>
                ) : null}
              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "90vw", margin: "0 auto", mt: 3 }}
          >
            <Typography
              variant="cardHeader1"
              color="initial"
              className="SemiBold"
            >
              Similar Products
            </Typography>
            <FiArrowRight />
          </Stack>
          <Swiper
            style={{
              width: "90vw",
              margin: "0 auto",
              maxWidth: "fit-content",
              marginTop: "1rem",
            }}
            spaceBetween={10}
            slidesPerView={2.5}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {RelatedProducts?.map((data, index) => (
              <SwiperSlide>
                <HovarImage
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`${data?.feature_image}`}
                ></HovarImage>
                {/* <img src={data?.feature_image} alt="" width={385} /> */}
                <Stack
                  direction={"column"}
                  justifyContent={"space-between"}
                  mt={1}
                >
                  <Typography
                    variant="cardHeader3"
                    color="initial"
                    className="SemiBold"
                  >
                    {data?.p_name}
                  </Typography>
                  <Typography
                    variant="cardHeader3"
                    color="initial"
                    className="bold"
                  >
                    {" "}
                    {/* BDT {data?.p_stocks[0]?.mrp} */}
                    {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                  </Typography>
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>

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
      <SizeModal
        open={sizeGuide}
        setOpen={setSizeGuide}
        subCat={subCat}
        cat={cat}
      ></SizeModal>
    </>
  );
};

export default PorductDetails;
