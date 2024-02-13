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
import ProductPoPup from "../../../components/ProductPoPup";
import useDiscountCount from "../../../src/hooks/useDiscountCount";
import { ArrowRight, ArrowRightOutlined, Padding } from "@mui/icons-material";
import * as fbq from "../../../lib/fpixel";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [sizeId, setSizeId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [stockDetails, setStockDetails] = useState([]);
  const [stockAmount, setStockAmount] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [priceWithoutFragileCharge, setPriceWithoutFragileCharge] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [fragileCharge, setFragileCharge] = useState(0);
  const [productWeight, setProductWeight] = useState(0);
  const [products, setProducts] = useState({});
  const [activesize, setActiveSize] = useState(null);
  const [activecolor, setActiveColor] = useState(null);
  const [open, setOpen] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFragile, setIsFragile] = useState(false);
  const [discountAmount, setDiscountAmount] = useState();
  const [discountType, setDiscountType] = useState();
  const [productSku, setProductSku] = useState("");

  console.log("your log output", products);
  // product popup
  const [productpopup, setProductpopup] = useState(false);
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
  const { updatedPriceAfterDiscount } = useDiscountCount();
  const category = products?.p_category?.id;
  const p_id = products?.id;
  const sub_catcategory = products?.p_subcategory?.id;
  const { data, isLoading, isSuccess, isError, error } =
    useGetParticularProductsQuery(productId, { skip: !productId });
  const { data: matchedwithProduct } = useGetMatchedWithProductQuery({
    category,
    sub_catcategory,
    p_id,
  });
  const RelatedProducts = matchedwithProduct?.data;
  const catName = products?.p_category?.cat_name;
  const subCatName = products?.p_subcategory?.cat_name;
  const sub_cat_slug = products?.p_subcategory?.slug;
  const cat_slug = products?.p_category?.slug;
  const sub_cat_slug_id = products?.p_subcategory?.id;
  const cat_slug_id = products?.p_category?.id;
  // Fetching the particular Product
  useEffect(() => {
    if (isSuccess) {
      const handleSuccess = async () => {
        setProducts(data?.data);
        // setActiveSize(data?.data.p_sizes[0]?.id);
        // setActiveColor(data?.data.p_colours[0]?.id);
      };
      handleSuccess();
    }
  }, [data, isSuccess, isLoading]);

  useEffect(() => {
    if (products?.fragile === "1") {
      setIsFragile(true);
    }
    if (products?.fragile === "0") {
      setIsFragile(false);
    }
  }, [isFragile, products?.fragile]);
  // Product Selection Section
  useEffect(() => {
    setNoteTextForStock("");
    setNoteTextForCart("");

    if (products?.p_stocks) {
      setPriceWithoutFragileCharge(products?.p_stocks[0]?.mrp);

      setPriceAfterDiscount(
        updatedPriceAfterDiscount(
          products?.p_stocks[0]?.mrp,
          products?.p_stocks[0]?.discount?.discount_amount,
          products?.p_stocks[0]?.discount?.discount_type
        ).updatedPrice
      );
      setProductPrice(products?.p_stocks[0]?.mrp);
      setDiscountAmount(products?.p_stocks[0]?.discount?.discount_amount);
      setDiscountType(products?.p_stocks[0]?.discount?.discount_type);
    }
    setProductWeight(products?.p_weight);
    if (products?.fragile === "Yes") {
      setFragileCharge(products?.fragile_charge);
    }
    if (products?.fragile === "No") {
      setFragileCharge(products?.fragile_charge);
    }

    // if both color and size both exists
    if (products?.p_colours?.length > 0 && products?.p_sizes?.length > 0) {
      setDisableBtn(true);
      // if both color and size both exists and but selected none
      if (colorSelected === false && sizeSelected === false) {
        setNoteTextForStock(
          " Please select a color and size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color and size in order to enable Add To Cart"
        );
      }
      // if both color and size both exists and but color not selected
      if (colorSelected === false && sizeSelected === true) {
        setNoteTextForStock(
          " Please select a color in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a color in order to enable Add To Cart"
        );
      }
      // if both color and size both exists and but size not selected
      if (sizeSelected === false && colorSelected === true) {
        setNoteTextForStock(
          " Please select a size in order to check stock availability"
        );
        setNoteTextForCart(
          " Please select a size in order to enable Add To Cart."
        );
      }
      // if both color and size both exists and both selected
      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = products?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId && stock?.colour_id === colorId
        );

        setStockDetails(selectedProduct);
        setStockAmount(selectedProduct?.stock);
        setProductSku(selectedProduct?.sku);
        if (selectedProduct?.mrp) {
          setPriceWithoutFragileCharge(selectedProduct?.mrp);
          setPriceAfterDiscount(
            updatedPriceAfterDiscount(
              selectedProduct?.mrp,
              selectedProduct?.discount?.discount_amount,
              selectedProduct?.discount?.discount_type
            ).updatedPrice
          );
          setProductPrice(selectedProduct?.mrp);
          setDiscountAmount(selectedProduct?.discount?.discount_amount);
          setDiscountType(selectedProduct?.discount?.discount_type);
        } else {
          setPriceWithoutFragileCharge(0);
          setPriceAfterDiscount(0);
          setProductPrice(0);
        }

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

      // if color exist but not selected
      if (
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
      // if size exist but not selected
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

    // if color or size only one of them exists
    if (
      (products?.p_colours?.length == 0 || products?.p_sizes?.length == 0) &&
      (products?.p_colours?.length > 0 || products?.p_sizes?.length > 0)
    ) {
      setDisableBtn(true);
      if (sizeSelected === true || colorSelected === true) {
        if (colorSelected == true) {
          const selectedProduct = products?.p_stocks?.find(
            (stock) => stock?.colour_id === colorId
          );

          setPriceWithoutFragileCharge(selectedProduct?.mrp);
          setPriceAfterDiscount(
            updatedPriceAfterDiscount(
              selectedProduct?.mrp,
              selectedProduct?.discount?.discount_amount,
              selectedProduct?.discount?.discount_type
            ).updatedPrice
          );
          setProductPrice(selectedProduct?.mrp);
          setDiscountAmount(selectedProduct?.discount?.discount_amount);
          setDiscountType(selectedProduct?.discount?.discount_type);
          setStockDetails(selectedProduct);
          setStockAmount(selectedProduct?.stock);
          setProductSku(selectedProduct?.sku);
        }
        if (sizeSelected == true) {
          const selectedProduct = products?.p_stocks?.find(
            (stock) => stock?.size_id === sizeId
          );
          setPriceWithoutFragileCharge(selectedProduct?.mrp);
          setPriceAfterDiscount(
            updatedPriceAfterDiscount(
              selectedProduct?.mrp,
              selectedProduct?.discount?.discount_amount,
              selectedProduct?.discount?.discount_type
            ).updatedPrice
          );
          setProductPrice(selectedProduct?.mrp);
          setDiscountAmount(selectedProduct?.discount?.discount_amount);
          setDiscountType(selectedProduct?.discount?.discount_type);
          setStockDetails(selectedProduct);
          setStockAmount(selectedProduct?.stock);
          setProductSku(selectedProduct?.sku);
        }

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

    // if color or size none of them exist
    if (products?.p_colours?.length === 0 && products?.p_sizes?.length === 0) {
      setDisableBtn(true);
      if (products?.p_stocks) {
        setPriceWithoutFragileCharge(products?.p_stocks[0]?.mrp);
        setPriceAfterDiscount(
          updatedPriceAfterDiscount(
            products?.p_stocks[0]?.mrp,
            products?.p_stocks[0]?.discount?.discount_amount,
            products?.p_stocks[0]?.discount?.discount_type
          ).updatedPrice
        );
        setProductPrice(products?.p_stocks[0]?.mrp);
        setDiscountAmount(products?.p_stocks[0]?.discount?.discount_amount);
        setDiscountType(products?.p_stocks[0]?.discount?.discount_type);
        if (products?.p_stocks[0]?.stock > 0) {
          setStockAmount(products?.p_stocks[0]?.stock);
          setProductSku(products?.p_stocks[0]?.sku);
          setNoteTextForStock("In Stock");
          setDisableBtn(false);
        }
        if (
          products?.p_stocks[0]?.stock === undefined ||
          products?.p_stocks[0]?.stock === 0
        ) {
          setNoteTextForStock("Out of Stock");
          setDisableBtn(true);
        }
      }
      setNoteTextForCart("");
    }
  }, [
    sizeSelected,
    colorSelected,
    colorId,
    sizeId,
    productSku,
    stockAmount,
    products?.p_colours?.length,
    products?.p_sizes?.length,
    productPrice,
    products?.fragile,
    products?.fragile_charge,
    location.pathname,
    disableBtn,
    discountAmount,
    discountType,
    products?.p_stocks,
  ]);

  useEffect(() => {
    setActiveColor("");
    setActiveSize("");
    setDiscountAmount("");
    setDiscountType("");
  }, [window.location.href]);

  useEffect(() => {
    setDisableBtn(true);
    setCount(1);
    setSizeSelected(false);
    setColorSelected(false);
  }, [productId]);
  // console.log("stockAmount", stockAmount);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const handleSelectSize = (data, id) => {
    setSizeSelected(true);
    setSizeId(id);
    setSize(data);
    setActiveSize("");
    setActiveSize(id);
  };
  const handleSelectColor = (data, code, id) => {
    setColorSelected(true);
    setColorId(id);
    setColorName(data);
    setColorCode(code);
    setActiveColor(id);
  };
  // console.log("inside handle stock", products);

  const handleStockAvailability = (id) => {
    const element = products?.p_stocks.find((item) => item.size_id === id);

    if (element && element.stock > 0) {
      return "inStock";
    } else {
      return "outOfStock";
    }
  };
  const handleAddToCart = async (finalData) => {
    dispatch(addToCart(finalData));
    toast.success("Added To Cart!");
    setProductpopup(true);
    fbq.event("AddToCart");
  };

  const handleImageForThumble = (data, images) => {
    setOpen(data);
    setImageData(images);
  };
  const handleSizeGuide = (subcat_id, cat_id, sizes, category) => {
    setSizeGuide(true);
    setSubCat(subcat_id);
    setCat(cat_id);
    setSizes(sizes);
    setCategoryName(category);
  };
  // console.log("sizes", sizes);
  const handleAddToWishList = async (data) => {
    dispatch(addToWishList(data));
    setShowBrokenHeart("block");
    setShowHeart("none");
    toast.success("Added To WishList!");
    fbq.event("AddToWishlist");
  };
  const handleRemoveFromList = async (data) => {
    dispatch(removeFromWishList(data));
    setShowBrokenHeart("none");
    setShowHeart("block");
    toast.error("Removed From Wishlist!");
  };
  const description = products?.p_description;
  const totalPriceWithTaxRounded =
    count *
    parseFloat(
      productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
    );

  const finalData = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    design_code: products?.p_design_code,
    size: size,
    size_id: sizeId,
    isFragile: isFragile,
    text: products?.p_description,
    colors: products?.p_colours,
    color_id: colorId,
    color_name: colorName,
    selectedCurrency: selectedCurrency,
    productWeight: productWeight,
    totalProductWeight: count * productWeight,
    amount: count,
    stock: stockAmount,
    totalAmount: count,
    taxAmount: products?.p_tax?.tax_percentage,
    price: productPrice,
    priceOrg: productPrice,
    discount: discountAmount,
    discountType: discountType,
    priceWithTax: parseFloat(
      productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
    ),
    priceWithTaxOrg: parseFloat(
      productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
    ),
    priceWithoutFragile: priceWithoutFragileCharge,
    priceWithoutFragileOrg: priceWithoutFragileCharge,

    vatAmountParticularProduct:
      count *
      parseFloat(productPrice * (products?.p_tax?.tax_percentage / 100)),
    vatAmountParticularProductOrg:
      count *
      parseFloat(productPrice * (products?.p_tax?.tax_percentage / 100)),

    fragileCharge: fragileCharge,
    fragileChargeOrg: fragileCharge,
    totalFragileCharge: count * fragileCharge,
    totalFragileChargeOrg: count * fragileCharge,

    totalPrice: parseFloat(productPrice) * count,
    totalPriceOrg: count * parseFloat(productPrice),
    totalPriceWithoutFragileCharge:
      parseFloat(priceWithoutFragileCharge) * count,
    totalPriceWithoutFragileChargeOrg:
      parseFloat(priceWithoutFragileCharge) * count,
    totalPriceWithTax:
      count *
      parseFloat(
        productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
      ),
    totalPriceWithTaxOrg:
      count *
      parseFloat(
        productPrice * (products?.p_tax?.tax_percentage / 100) + productPrice
      ),

    // Setting data after discount

    price_after_discount: priceAfterDiscount,
    priceOrg_after_discount: priceAfterDiscount,
    priceWithTax_after_discount: parseFloat(
      priceAfterDiscount * (products?.p_tax?.tax_percentage / 100) +
        priceAfterDiscount
    ),
    priceWithTaxOrg_after_discount: parseFloat(
      priceAfterDiscount * (products?.p_tax?.tax_percentage / 100) +
        priceAfterDiscount
    ),
    priceWithoutFragile_after_discount: priceAfterDiscount,
    priceWithoutFragileOrg_after_discount: priceAfterDiscount,

    vatAmountParticularProduct_after_discount:
      count *
      parseFloat(priceAfterDiscount * (products?.p_tax?.tax_percentage / 100)),
    vatAmountParticularProductOrg_after_discount:
      count *
      parseFloat(priceAfterDiscount * (products?.p_tax?.tax_percentage / 100)),

    fragileCharge_after_discount: fragileCharge,
    fragileChargeOrg_after_discount: fragileCharge,
    totalFragileCharge_after_discount: count * fragileCharge,
    totalFragileChargeOrg_after_discount: count * fragileCharge,

    totalPrice_after_discount: parseFloat(priceAfterDiscount) * count,
    totalPriceOrg_after_discount: count * parseFloat(priceAfterDiscount),
    totalPriceWithoutFragileCharge_after_discount:
      parseFloat(priceAfterDiscount) * count,
    totalPriceWithoutFragileChargeOrg_after_discount:
      parseFloat(priceAfterDiscount) * count,
    totalPriceWithTax_after_discount:
      count *
      parseFloat(
        priceAfterDiscount * (products?.p_tax?.tax_percentage / 100) +
          priceAfterDiscount
      ),
    totalPriceWithTaxOrg_after_discount:
      count *
      parseFloat(
        priceAfterDiscount * (products?.p_tax?.tax_percentage / 100) +
          priceAfterDiscount
      ),
  };
  // unit price area
  const subTotal = finalData.totalPrice_after_discount;

  const dataForWishList = {
    id: products.id,
    image: products.feature_image,
    name: products?.p_name,
    size: products?.p_sizes,
    text: products?.p_description,
    colors: products?.p_colours,
    color_id: colorId,
    color_name: colorName,
    color_code: colorCode,
    price: productPrice,
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
        {/* <title>{products?.p_name}</title> */}
      </Head>
      <HomePageIntro title={products?.p_name} />

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
            <Grid item xl={5} lg={5} md={6} sm={12}>
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
                <Stack width={"50%"} cursor={"zoom-in"}>
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
            <Grid item xl={7} lg={7} md={6}>
              <div style={{ position: "sticky", top: 100 }}>
                <Stack direction={"column"} mx={5} width={"100%"}>
                  <Typography
                    className="exterBold"
                    variant="productName"
                    color="#1B3148"
                    fontFamily={"IM Fell Double Pica"}
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
                    color="#1B3148"
                    sx={{
                      letterSpacing: 0.17,
                      width: { xs: "100%", lg: "70%", xl: "60%" },
                    }}
                  >
                    {description}
                  </Typography>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack
                      direction={{ sm: "row", md: "column-reverse", lg: "row" }}
                      justifyContent={"flex-start"}
                      alignItems={{ md: "flex-start", lg: "center" }}
                      sx={{ width: "60%" }}
                      spacing={1}
                    >
                      <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        {discountType !== undefined ? (
                          <Typography
                            variant="cardHeader3"
                            color="#1B3148"
                            className="bold"
                            sx={{
                              border: "1px solid #3D5675",
                              borderRadius: "5px",
                              padding: "1px",
                            }}
                          >
                            -{discountAmount}
                            {discountType === "percentage" ? "%" : ""}
                          </Typography>
                        ) : (
                          ""
                        )}
                        <Typography
                          variant={
                            discountType !== undefined ? "homeFlash" : "header1"
                          }
                          className="SemiBold"
                          color={
                            discountType !== undefined ? "#8799B1" : "#1B3148"
                          }
                          letterSpacing={0.3}
                          fontWeight={700}
                          style={{
                            textDecorationLine: `${
                              discountType !== undefined
                                ? "line-through"
                                : "none"
                            }`,
                          }}
                        >
                          {/* Price : BDT {productPrice} */}
                          {priceWithoutFragileCharge > 0
                            ? selectedCurrency
                            : ""}{" "}
                          {priceWithoutFragileCharge > 0
                            ? `${convertPrice(priceWithoutFragileCharge)}`
                            : /* "Out of Stock" */ ""}
                        </Typography>
                      </Stack>
                      {discountType !== undefined ? (
                        <Typography
                          variant="header1"
                          className="SemiBold"
                          color="#1B3148"
                          letterSpacing={0.3}
                          fontWeight={700}
                        >
                          {/* Price : BDT {productPrice} */}
                          {priceAfterDiscount > 0 ? selectedCurrency : ""}{" "}
                          {priceAfterDiscount > 0
                            ? `${convertPrice(priceAfterDiscount)}`
                            : "Out of Stock"}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Stack>

                    <Stack
                      direction={"row"}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                      sx={{ width: "40%" }}
                    >
                      {" "}
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems="center"
                        sx={{
                          border: "1px solid #D9D9D9",
                          borderRadius: "5px",
                          px: 1,
                        }}
                      >
                        <Stack>
                          <Typography
                            variant="cardHeader3"
                            color="#1B3148"
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
                            sx={{
                              color: "#959595",
                            }}
                          >
                            <IconButton
                              size="small"
                              aria-label="reduce"
                              onClick={() => {
                                setCount(Math.max(count - 1, 1));
                              }}
                            >
                              <KeyboardArrowDownIcon fontSize="small" />
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
                              <KeyboardArrowUpIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <hr />

                  {products?.p_colours?.length > 0 ? (
                    <>
                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <Typography
                          variant="cardHeader3"
                          color="#959595"
                          className="SemiBold"
                        >
                          Colors
                        </Typography>
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
                          alignItems={"center"}
                        >
                          {products?.p_colours?.map((color) => (
                            <Stack
                              key={color.id}
                              onClick={() =>
                                handleSelectColor(
                                  color.color_name,
                                  color.color_code,
                                  color.id
                                )
                              }
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "35px",
                                height: "35px",
                                backgroundColor: color.color_code,
                                borderRadius: "50%",
                                cursor: "pointer",
                                margin: "0 auto",
                                padding: "2px",
                              }}
                            >
                              <Stack
                                sx={{
                                  width: "90%",
                                  height: "90%",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  border:
                                    activecolor === color.id
                                      ? "3px solid #ffffff"
                                      : "none",
                                }}
                              ></Stack>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                      <hr />
                    </>
                  ) : (
                    ""
                  )}

                  {products?.p_sizes?.length > 0 ? (
                    <Stack style={{ marginBottom: "1vh" }}>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems="center"
                        style={{ marginBottom: "1vh" }}
                      >
                        <Typography
                          variant="cardHeader3"
                          color="#959595"
                          className="SemiBold"
                        >
                          Sizes
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        // spacing={1}
                        gap={2}
                        alignItems="center"
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                        mb={1}
                      >
                        <Stack
                          direction={"row"}
                          gap={2}
                          flexWrap={"wrap"}
                          justifyContent="flex-start"
                          alignItems={"center"}
                        >
                          {/* {console.log("your log output", products)} */}
                          {products?.p_sizes?.map((size, index) => (
                            <Button
                              key={index}
                              disabled={
                                handleStockAvailability(size.id) ===
                                "outOfStock"
                                  ? true
                                  : false
                              }
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
                              sx={{
                                ".mui-style-wapswz-MuiTypography-root": {
                                  color: `${
                                    activesize === size?.id
                                      ? "#ffffff"
                                      : "black"
                                  }`,
                                },
                              }}
                              style={{
                                boxShadow:
                                  "0px 1px 4px 2px rgba(131 131 133 / 10%)",
                                border: "1px solid #3D5675",
                                backgroundColor: `${
                                  activesize === size?.id
                                    ? "#1B3148"
                                    : "initial"
                                }`,
                              }}
                              /* variant={`${
                                activesize === size?.id ? "outlined" : "primary"
                              }`} */
                              // color="primary"
                              onClick={() =>
                                handleSelectSize(size?.size_name, size?.id)
                              }
                            >
                              {/* {console.log(products?.p_stocks.find((element)=>element.size_id===size.id))} */}
                              <Typography
                                variant="cardHeader"
                                className="SemiBold"
                                sx={{
                                  color: `${
                                    activesize === size?.id
                                      ? "#ffffff"
                                      : "black"
                                  }`,
                                }}
                                /* color={
                                  handleStockAvailability(size?.id) ===
                                  "outOfStock"
                                    ? "#bbb6b6;"
                                    : ""
                                } */
                              >
                                {size?.size_name}
                              </Typography>
                            </Button>
                          ))}
                        </Stack>
                        {products?.p_sizes.length > 0 &&
                        products?.p_sizes.some((item) =>
                          [
                            "s",
                            "m",
                            "lg",
                            "xl",
                            "xxl",
                            "38",
                            "40",
                            "42",
                            "44",
                            "46",
                            "48",
                          ].includes(item.slug)
                        ) ? (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() =>
                              handleSizeGuide(
                                products?.subcat_id,
                                products?.cat_id,
                                products?.p_sizes,
                                products?.p_category?.slug
                              )
                            }
                          >
                            <Typography
                              sx={{
                                textDecoration: "underline",
                                textTransform: "capitalize",
                              }}
                              color="#1B3148"
                              className="SemiBold"
                            >
                              size guide
                            </Typography>
                          </Button>
                        ) : (
                          ""
                        )}
                      </Stack>
                      <hr style={{ width: "100%" }} />
                    </Stack>
                  ) : (
                    ""
                  )}
                  {/* {products?.p_colours?.length > 0 ? (
                    <>
                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <Typography
                          variant="cardHeader3"
                          color="#959595"
                          className="SemiBold"
                        >
                          Colors
                        </Typography>
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
                          alignItems={"center"}
                        >
                          {products?.p_colours?.map((color) => (
                            <Box
                              key={color.id}
                              onClick={() =>
                                handleSelectColor(
                                  color.color_name,
                                  color.color_code,
                                  color.id
                                )
                              }
                              sx={{
                                width: "35px",
                                height: "35px",
                                backgroundColor: color.color_code,
                                borderRadius: "10px",
                                cursor: "pointer",
                                border:
                                  activecolor === color.id
                                    ? "2px solid #3c5676"
                                    : "none",
                              }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                      <hr />
                    </>
                  ) : (
                    ""
                  )} */}
                  {/* <Stack direction={"row"} spacing={1} alignItems="center">
                    <Typography
                      variant="cardHeader3"
                      color="#959595"
                      className="SemiBold"
                    >
                      Quantity
                    </Typography>
                    
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
                  </Stack> */}

                  <br />
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
                        sx={{
                          bgcolor: "#1B3148",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        disabled={disableBtn}
                        onClick={() => handleAddToCart(finalData)}
                      >
                        <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                        <Typography style={{ marginLeft: "1rem" }}>
                          ADD TO CART
                        </Typography>
                      </Button>
                    </Stack>

                    <Button
                      variant="outlined"
                      // sx={{color:"#1B3148"}}
                      aria-label=""
                      style={{ display: `${showHeart}` }}
                      onClick={() => handleAddToWishList(dataForWishList)}
                    >
                      <FiHeart
                        style={{
                          color: "#1B3148",
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
                          color: "#1B3148",
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
                    {/* <Typography
                      variant="cardHeader3"
                      color="#959595"
                      // width="25%"
                      className="SemiBold"
                    >
                      Availability & Specification
                    </Typography> */}
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
                      color="#1B3148"
                      className="SemiBold"
                    >
                      Note: {noteTextForStock}
                    </Typography> */}
                    <Typography
                      variant="cardHeader12"
                      color="#1B3148"
                      className="SemiBold"
                    >
                      {/* {stockAmount > 0 ? "In Stock" : "Out of Stock"} */}
                      {noteTextForStock}
                    </Typography>
                    {/* <Typography
                      variant="cardHeader12"
                      color="#1B3148"
                      className="SemiBold"
                    >
                      Check In Store Availability
                    </Typography> */}
                  </Stack>

                  <Stack direction={"row"} spacing={1}>
                    {" "}
                    <Button
                      variant="outlined"
                      // color="#1B3148"
                      onClick={handleClick}
                      size="small"
                      className="SemiBold"
                      sx={{
                        color: "#1B3148",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textTransform: "capitalize",
                        width: "100%",
                        // maxWidth: "300px",
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
                              color="#1B3148"
                            >
                              Weight
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {products?.p_weight} gm
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
                              color="#1B3148"
                            >
                              Dimensions
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
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
                              color="#1B3148"
                            >
                              SKU
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {productSku}
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
                              color="#1B3148"
                            >
                              Fabric
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  {products?.p_fabric?.map((name) => (
                                    <>
                                      <Typography
                                        key={index}
                                        variant="cardLocation1"
                                        sx={{ width: "50%" }}
                                        className="SemiBold"
                                        color="#1B3148"
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
                              color="#1B3148"
                            >
                              Color
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  <Typography
                                    variant="cardLocation1"
                                    sx={{ width: "50%" }}
                                    className="SemiBold"
                                    color="#1B3148"
                                  >
                                    {products?.p_flat_colour}
                                  </Typography>
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
                              color="#1B3148"
                            >
                              Design Code
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
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
                              color="#1B3148"
                            >
                              Size
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {
                                <Stack direction={"row"} spacing={1}>
                                  {products?.p_sizes?.map((size) => (
                                    <>
                                      <Typography
                                        key={index}
                                        variant="cardLocation1"
                                        sx={{ width: "50%" }}
                                        className="SemiBold"
                                        color="#1B3148"
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
                              color="#1B3148"
                            >
                              Care
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {products?.p_care
                                ? products?.p_care[0]?.care_name
                                : ""}
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
                              color="#1B3148"
                            >
                              Country of origin
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="cardLocation1"
                              sx={{ width: "50%" }}
                              className="SemiBold"
                              color="#1B3148"
                            >
                              {products?.country_of_origin
                                ? products?.country_of_origin
                                : "Bangladesh"}
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
          {RelatedProducts?.length > 0 ? (
            <>
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
                  color="#1B3148"
                  className="SemiBold"
                >
                  Similar Products
                </Typography>

                <Grid container mt={1} spacing={1.5}>
                  {RelatedProducts?.map((data, index) => (
                    <Grid key={index} item lg={3} sm={6}>
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
                      {/* <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        mt={1}
                      >
                        <Typography
                          variant="cardHeader3"
                          color="#1B3148"
                          className="SemiBold"
                        >
                          {data?.p_name}
                        </Typography>
                        <Stack
                          direction={"column"}
                          justifyContent={"space-between"}
                          alignItems={"end"}
                        >
                          {data?.p_stocks[0]?.discount?.discount_type !==
                          undefined ? (
                            <Typography
                              variant="cardHeader3"
                              color="#1B3148"
                              className="bold"
                            >
                              {selectedCurrency}{" "}
                              <span>
                                {
                                  updatedPriceAfterDiscount(
                                    convertPrice(data?.p_stocks[0]?.mrp),
                                    data?.p_stocks[0]?.discount
                                      ?.discount_amount,
                                    data?.p_stocks[0]?.discount?.discount_type
                                  ).updatedPrice
                                }
                              </span>
                            </Typography>
                          ) : (
                            ""
                          )}
                          <Stack direction={"row"} spacing={2}>
                            {data?.p_stocks[0]?.discount?.discount_type !==
                            undefined ? (
                              <Typography
                                variant="cardHeader3"
                                color="#1B3148"
                                className="bold"
                              >
                                -{data?.p_stocks[0]?.discount?.discount_amount}%
                              </Typography>
                            ) : (
                              ""
                            )}

                            <Typography
                              variant="cardHeader3"
                              color="#1B3148"
                              className="bold"
                              style={{
                                textDecorationLine: `${
                                  data?.p_stocks[0]?.discount?.discount_type !==
                                  undefined
                                    ? "line-through"
                                    : "none"
                                }`,
                              }}
                            >
                              {selectedCurrency}{" "}
                              {convertPrice(data?.p_stocks[0]?.mrp)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack> */}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>

        <Footer />
      </Hidden>

      {/* Product Details for tab amd mobile */}
      <Hidden only={["md", "lg", "xl", "sm"]}>
        <Box
          pt={7}
          sx={{ width: "100%", maxWidth: "1500px", mx: "auto" }}
          mb={4}
        >
          <Swiper
            key={Math.random() * 10}
            spaceBetween={50}
            slidesPerView={1}
            pagination={true}
            modules={[Pagination]}
            initialSlide={currentIndex}
          >
            <SwiperSlide
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_one,
                  img2: products?.p_image_two,
                  img3: products?.p_image_three,
                  img4: products?.p_image_four,
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
            ></SwiperSlide>
            <SwiperSlide
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_two,
                  img2: products?.p_image_one,
                  img3: products?.p_image_three,
                  img4: products?.p_image_four,
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
            ></SwiperSlide>
            <SwiperSlide
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_three,
                  img2: products?.p_image_one,
                  img3: products?.p_image_two,
                  img4: products?.p_image_four,
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
            ></SwiperSlide>
            <SwiperSlide
              onClick={() =>
                handleImageForThumble(true, {
                  img1: products?.p_image_four,
                  img2: products?.p_image_one,
                  img3: products?.p_image_two,
                  img4: products?.p_image_three,
                })
              }
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.0001) 62.15%, rgba(0, 0, 0, 0.5) 100%),url(${products?.p_image_four})`,
                backgroundSize: "cover",
                height: "92vh",
                maxHeight: "auto",
                backgroundPosition: "center",
                width: "100%",
              }}
            ></SwiperSlide>
          </Swiper>
          <Grid container>
            <Grid item xl={6} lg={5} md={6} sm={6} width={"100%"}>
              <Stack
                direction={"column"}
                mt={3}
                spacing={1}
                sx={{ width: "85%", maxWidth: "1500px", mx: "auto" }}
              >
                <Stack direction={"column"}>
                  <Typography
                    variant="login2"
                    color="#1B3148"
                    className="exterBold"
                  >
                    {products?.p_name}
                  </Typography>

                  <Typography
                    variant="cardHeader1"
                    color="#1B3148"
                    textTransform={"uppercase"}
                    className="SemiBold"
                  >
                    {/*Home {path}*/}
                  </Typography>
                </Stack>

                <Typography
                  variant="cardHeader3"
                  color="#1B3148"
                  textAlign={"justify"}
                >
                  {description}
                </Typography>
                <Stack
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                    spacing={2}
                    // pt={1}
                  >
                    {discountType !== undefined ? (
                      <Typography
                        variant="cardHeader3"
                        color="#1B3148"
                        className="bold"
                        sx={{
                          border: "1px solid #3D5675",
                          borderRadius: "5px",
                          padding: "1px",
                        }}
                      >
                        -{discountAmount}
                        {discountType === "percentage" ? "%" : ""}
                      </Typography>
                    ) : (
                      ""
                    )}
                    <Typography
                      variant={`${
                        discountType !== undefined ? "homeFlash" : "header1"
                      }`}
                      className="SemiBold"
                      color={discountType !== undefined ? "#8799B1" : "#1B3148"}
                      letterSpacing={0.3}
                      fontWeight={700}
                      style={{
                        opacity: `${discountType !== undefined ? 0.6 : 1}`,
                        textDecorationLine: `${
                          discountType !== undefined ? "line-through" : "none"
                        }`,
                      }}
                    >
                      {/* Price : BDT {productPrice} */}
                      {priceWithoutFragileCharge > 0
                        ? selectedCurrency
                        : ""}{" "}
                      {priceWithoutFragileCharge > 0
                        ? `${convertPrice(priceWithoutFragileCharge)}`
                        : /* "Out of Stock" */ ""}
                    </Typography>
                  </Stack>
                  {discountType !== undefined ? (
                    <Typography
                      variant="header1"
                      className="SemiBold"
                      color="#1B3148"
                      pl={1}
                      letterSpacing={0.3}
                      fontWeight={700}
                    >
                      {/* Price : BDT {productPrice} */}
                      {priceAfterDiscount > 0 ? selectedCurrency : ""}{" "}
                      {priceAfterDiscount > 0
                        ? `${convertPrice(priceAfterDiscount)}`
                        : "Out of Stock"}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Stack>
                <hr />
                {products?.p_colours?.length > 0 ? (
                  <Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
                      <Typography
                        variant="cardHeader3"
                        color="#959595"
                        className="SemiBold"
                      >
                        Colors
                      </Typography>
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
                        alignItems={"center"}
                      >
                        {products?.p_colours?.map((color) => (
                          <Stack
                            key={color.id}
                            onClick={() =>
                              handleSelectColor(
                                color.color_name,
                                color.color_code,
                                color.id
                              )
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "35px",
                              height: "35px",
                              backgroundColor: color.color_code,
                              borderRadius: "50%",
                              cursor: "pointer",
                              margin: "0 auto",
                            }}
                          >
                            <Stack
                              sx={{
                                width: "90%",
                                height: "90%",
                                borderRadius: "50%",
                                cursor: "pointer",
                                border:
                                  activecolor === color.id
                                    ? "3px solid #ffffff"
                                    : "none",
                              }}
                            ></Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </Stack>
                ) : (
                  ""
                )}
                {products?.p_sizes?.length > 0 ? (
                  <Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
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
                      direction={"column"}
                      spacing={2}
                      alignItems="start"
                      justifyContent={"space-between"}
                    >
                      <Stack
                        direction={"row"}
                        sx={{ flexWrap: "wrap", columnGap: 1, rowGap: 1 }}
                      >
                        {products?.p_sizes?.map((size, index) => (
                          <Button
                            key={index}
                            disabled={
                              handleStockAvailability(size.id) === "outOfStock"
                                ? true
                                : false
                            }
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
                            /* style={{
                              boxShadow:
                                "0px 1px 4px 2px rgba(131 131 133 / 20%)",
                            }} */
                            /*  sx={{
                              ".mui-style-wapswz-MuiTypography-root": {
                                color: `${
                                  activesize === size?.id ? "#ffffff" : "black"
                                }`,
                              },
                            }} */
                            style={{
                              boxShadow:
                                "0px 1px 4px 2px rgba(131 131 133 / 10%)",
                              border: "1px solid #3D5675",
                              backgroundColor: `${
                                activesize === size?.id ? "#1B3148" : "initial"
                              }`,
                            }}
                            /* variant={`${
                              activesize === size?.id ? "outlined" : "primary"
                            }`} */
                            color="primary"
                            onClick={() =>
                              handleSelectSize(size?.size_name, size?.id)
                            }
                          >
                            {/* {console.log(products?.p_stocks.find((element)=>element.size_id===size.id))} */}
                            <Typography
                              variant="cardHeader"
                              className="SemiBold"
                              sx={{
                                color: `${
                                  activesize === size?.id ? "#ffffff" : "black"
                                }`,
                              }}
                              /* color={
                                handleStockAvailability(size?.id) ===
                                "outOfStock"
                                  ? "#bbb6b6;"
                                  : ""
                              } */
                            >
                              {size?.size_name}
                            </Typography>
                          </Button>
                        ))}
                      </Stack>
                      {products?.p_sizes.length > 0 &&
                      products?.p_sizes.some((item) =>
                        [
                          "s",
                          "m",
                          "lg",
                          "xl",
                          "xxl",
                          "38",
                          "40",
                          "42",
                          "44",
                          "46",
                          "48",
                          "52",
                          "54",
                          "56",
                        ].includes(item.slug)
                      ) ? (
                        <Button
                          sx={{
                            padding: "6px 0px",
                            textDecoration: "",
                          }}
                          variant="text"
                          color="primary"
                          onClick={() =>
                            handleSizeGuide(
                              products?.subcat_id,
                              products?.cat_id,
                              products?.p_sizes,
                              products?.p_category?.slug
                            )
                          }
                        >
                          <Typography
                            sx={{
                              textDecoration: "underline",
                              textTransform: "capitalize",
                            }}
                            color="#1B3148"
                          >
                            size guide
                          </Typography>
                        </Button>
                      ) : (
                        ""
                      )}
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </Stack>
                ) : (
                  ""
                )}

                {/* {products?.p_colours?.length > 0 ? (
                  <Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
                      <Typography
                        variant="cardHeader3"
                        color="#959595"
                        className="SemiBold"
                      >
                        Colors
                      </Typography>
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
                        alignItems={"center"}
                      >
                        
                        {products?.p_colours?.map((color) => (
                          <Stack
                            key={color.id}
                            onClick={() =>
                              handleSelectColor(
                                color.color_name,
                                color.color_code,
                                color.id
                              )
                            }
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "35px",
                              height: "35px",
                              backgroundColor: color.color_code,
                              borderRadius: "50%",
                              cursor: "pointer",
                              margin: "0 auto",
                            }}
                          >
                            <Stack
                              sx={{
                                width: "90%",
                                height: "90%",
                                borderRadius: "50%",
                                cursor: "pointer",
                                border:
                                  activecolor === color.id
                                    ? "3px solid #ffffff"
                                    : "none",
                              }}
                            ></Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </Stack>
                ) : (
                  ""
                )} */}
                <Stack
                  direction={"row"}
                  sx={{
                    width: "50%",
                    border: "1px solid #D9D9D9",
                    borderRadius: "5px",
                    px: 1,
                  }}
                >
                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <Typography variant="cardHeader3" color="#1B3148" pr={1}>
                      Quantity
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems="center"
                    justifyContent={"space-between"}
                    sx={{ color: "#959595" }}
                  >
                    <IconButton
                      size="small"
                      aria-label="reduce"
                      onClick={() => {
                        setCount(Math.max(count - 1, 1));
                      }}
                    >
                      <KeyboardArrowDownIcon fontSize="small" />
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
                      <KeyboardArrowUpIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

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
                  sx={{
                    bgcolor: "#1B3148",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleAddToCart(finalData)}
                >
                  <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                  <Typography style={{ marginLeft: "1rem" }}>
                    ADD TO CART
                  </Typography>
                </Button>

                <Stack direction={"row"} spacing={1} alignItems="center">
                  {/* <Typography variant="cardHeader3" color="#959595">
                    Availability & Specification
                  </Typography> */}
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
                <Stack direction={"column"} spacing={1} pb={1}>
                  <Typography variant="cardHeader12" color="#1B3148">
                    {noteTextForStock}
                  </Typography>
                  {/* <Typography variant="cardHeader12" color="#1B3148">
                    Check In Store Availability
                  </Typography> */}
                </Stack>
                <hr />
                <br />
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
                        color: "#1B3148",
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
                        color: "#1B3148",
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
                            color="#1B3148"
                          >
                            Weight
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {products?.p_weight} gm
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
                            color="#1B3148"
                          >
                            Dimensions
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
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
                            color="#1B3148"
                          >
                            Fabric
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_fabric?.map((name) => (
                                  <>
                                    <Typography
                                      key={index}
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="#1B3148"
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
                            color="#1B3148"
                          >
                            Color
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_colours?.map((color) => (
                                  <>
                                    <Typography
                                      key={index}
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="#1B3148"
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
                            color="#1B3148"
                          >
                            Design Code
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
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
                            color="#1B3148"
                          >
                            Size
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {
                              <Stack direction={"row"} spacing={1}>
                                {products?.p_sizes?.map((size) => (
                                  <>
                                    <Typography
                                      key={index}
                                      variant="cardLocation1"
                                      sx={{ width: "50%" }}
                                      className="SemiBold"
                                      color="#1B3148"
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
                            color="#1B3148"
                          >
                            Care
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {products?.p_care
                              ? products?.p_care[0]?.care_name
                              : ""}
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
                            color="#1B3148"
                          >
                            Country of origin
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="cardLocation1"
                            sx={{ width: "50%" }}
                            className="SemiBold"
                            color="#1B3148"
                          >
                            {products?.country_of_origin
                              ? products?.country_of_origin
                              : "Bangladesh"}
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
              color="#1B3148"
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
              marginTop: "1rem",
            }}
            spaceBetween={10}
            slidesPerView={2.5}
            modules={[Pagination]}
            className="mySwiper"
          >
            {RelatedProducts?.map((data, index) => (
              <SwiperSlide key={index}>
                <HovarImage
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`${data?.feature_image}`}
                ></HovarImage>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Footer></Footer>
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
        sizes={sizes}
        setSizes={setSizes}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      ></SizeModal>
      <ProductPoPup
        open={productpopup}
        setOpen={setProductpopup}
        product={products}
        count={count}
        Currency={selectedCurrency}
        priceAfterDiscount={convertPrice(priceAfterDiscount)}
        subTotal={subTotal}
        priceBeforeDiscount={convertPrice(priceWithoutFragileCharge)}
      />
    </>
  );
};

export default PorductDetails;
