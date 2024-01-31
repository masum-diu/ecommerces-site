import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import style from "./HovarImage.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/features/cart/cartSlice";
import Link from "next/link";
import toast from "react-hot-toast";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import {
  addToWishList,
  removeFromWishList,
} from "../../src/features/wishlist/wishListSlice";
import { useCurrencyConversion } from "../../src/hooks/useCurrencyConversion";
import * as fbq from "../../lib/fpixel";
import useDiscountCount from "../../src/hooks/useDiscountCount";
const HovarImage = ({ url, data, imageURL, width, height }) => {
  const router = useRouter();
  const innerPage = router?.query?.productId;
  
  const dispatch = useDispatch();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const cart = useSelector((state) => state.cart.cart);
  const showHeartred = useSelector((state) => state.wishList.toggleShowHeart);
  const showBrokenHeartred = useSelector(
    (state) => state.wishList.toggleShowBrokenHeart
  );
  const wishListArray = useSelector((state) => state.wishList.wishList);
  const myProduct = wishListArray.find((product) => product.id === data.id);
  const [colorSelected, setColorSelected] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [sizeId, setSizeId] = useState(0);
  const [showHeart, setShowHeart] = useState(
    myProduct?.showHeart ? myProduct?.showHeart : "block"
  );
  const [showBrokenHeart, setShowBrokenHeart] = useState(
    myProduct?.showBrokenHeart ? myProduct?.showBrokenHeart : "none"
  );
  const [colorId, setColorId] = useState(0);
  const [stockDetails, setStockDetails] = useState([]);
  const [stockAmount, setStockAmount] = useState(0);

  const { updatedPriceAfterDiscount } = useDiscountCount();

  useEffect(() => {
    if (data?.p_colours?.length > 0 && data?.p_sizes?.length > 0) {
      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = data?.p_stocks?.find(
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
      (data?.p_colours?.length == 0 || data?.p_sizes?.length == 0) &&
      (data?.p_colours?.length > 0 || data?.p_sizes?.length > 0)
    ) {
      if (sizeSelected == true || colorSelected == true) {
        const selectedProduct = data?.p_stocks?.find(
          (stock) => stock?.size_id === sizeId || stock?.colour_id === colorId
        );
        setStockAmount(selectedProduct?.stock);
        if (stockAmount > 0) {
          setDisableBtn(false);
        }
        if (stockAmount === undefined) {
          setDisableBtn(true);
        }
        // setDisableBtn(false);
      }
    }
  }, [sizeSelected, colorSelected, stockDetails, colorId, sizeId, stockAmount]);

  /* useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); */

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
  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
    setColorSelected(false);
    setSizeSelected(false);
  };
  const handleAddToWishList = async (data) => {
    dispatch(addToWishList(data));
    setShowBrokenHeart("block");
    setShowHeart("none");
    await toast.success("Added To WishList!");
    fbq.event("AddToWishlist");
  };
  const handleRemoveFromList = async (data) => {
    dispatch(removeFromWishList(data));
    setShowBrokenHeart("none");
    setShowHeart("block");
    await toast.error("Removed From Wishlist!");
  };
  const firstCombinationPrice = data?.p_stocks?.[0]?.mrp;
  const finalData = {
    id: data.id,
    image: data.feature_image,
    name: data?.p_name,
    size: size,
    size_id: sizeId,
    text: data?.p_description,
    color: color,
    color_id: colorId,
    colorCode: colorCode,
    price: data?.p_sale_price,
    amount: 1,
    stock: stockAmount,
    totalAmount: 1,
    totalPrice: parseFloat(data?.p_sale_price),
  };
  const dataForWishList = {
    id: data.id,
    image: data.feature_image,
    name: data?.p_name,
    size: data?.p_sizes,
    text: data?.p_description,
    colors: data?.p_colours,
    price: convertPrice(firstCombinationPrice),
    priceOrg: firstCombinationPrice,
    amount: 1,
    stock: data?.p_stocks,
    totalAmount: 1,
    category: data?.p_category,
    sub_category: data?.p_subcategory,
    showHeart: "none",
    showBrokenHeart: "block",
  };

  let productStyles = {};
  if (innerPage) {
    productStyles = {};
  }
  return (
    <div>
      <div className={style.uicard}>
        <Link href={url}>
          <a>
            <img
              src={imageURL}
              style={{ maxWidth: "100%", height: "auto" }}
              width={width}
              height={height}
            />
          </a>
        </Link>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack
            direction={"column"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // maxWidth: "565px",
              mt: 2,
            }}
          >
            <Typography
              variant="cardHeader3"
              color="#1B3148"
              className="SemiBold"
            >
              {data?.p_name}
            </Typography>
            <Stack
              direction={innerPage ? { xs: "column", sm: "row" } : "row"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              {data?.p_stocks[0]?.discount?.discount_type !== undefined ? (
                <Typography
                  variant="cardHeader1"
                  color="#1B3148"
                  className="bold"
                >
                  {/* BDT {product?.p_stocks[0]?.mrp} */}
                  {selectedCurrency}{" "}
                  <span>
                    {
                      updatedPriceAfterDiscount(
                        convertPrice(data?.p_stocks[0]?.mrp),
                        data?.p_stocks[0]?.discount?.discount_amount,
                        data?.p_stocks[0]?.discount?.discount_type
                      ).updatedPrice
                    }
                  </span>
                </Typography>
              ) : (
                ""
              )}
              <Stack
                direction={"row"}
                spacing={innerPage ? { xs: 1, sm: 2 } : 2}
              >
                {data?.p_stocks[0]?.discount?.discount_type !== undefined ? (
                  <Typography
                    variant="cardHeader3"
                    color="#1B3148"
                    className="bold"
                    pl={innerPage ? { xs: 0, sm: 2 } : 2}
                    style={{
                      textDecorationLine: "line-through",
                    }}
                  >
                    {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                  </Typography>
                ) : (
                  <Typography
                    variant="cardHeader1"
                    color="#1B3148"
                    className="bold"
                    style={{
                      textDecorationLine: "none",
                    }}
                  >
                    {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                  </Typography>
                )}
                {/* <Typography
                  variant="cardHeader1"
                  color="initial"
                  className="bold"
                  pl={2}
                  style={{
                    textDecorationLine: `${
                      data?.p_stocks[0]?.discount?.discount_type !== undefined
                        ? "line-through"
                        : "none"
                    }`,
                  }}
                >
                  {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                </Typography> */}
                {data?.p_stocks[0]?.discount?.discount_type !== undefined ? (
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
              </Stack>
            </Stack>
            {/* <Typography variant="cardHeader3" color="initial" className="bold">
              {selectedCurrency}{" "}
              {convertPrice(data?.p_stocks[0]?.mrp)}
            </Typography> */}
          </Stack>

          <Stack>
            <Stack style={{ display: `${showHeart}` }}>
              <IconButton
                // size="medium"
                // size={innerPage ? { xs: "small", sm: "medium" } : "medium"}
                className="hartIcon"
                aria-label=""
                onClick={() => handleAddToWishList(dataForWishList)}
              >
                <FiHeart style={{ color: "#fff" }} />
              </IconButton>
            </Stack>
            <Stack style={{ display: `${showBrokenHeart}` }}>
              <IconButton
                // size={innerPage ? { xs: "small", sm: "medium" } : "medium"}
                className="hartIcon"
                aria-label=""
                onClick={() =>
                  handleRemoveFromList({
                    id: data.id,
                    amount: 1,
                    showHeart: "block",
                    showBrokenHeart: "none",
                  })
                }
              >
                <HeartBrokenOutlinedIcon style={{ color: "#fff" }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default HovarImage;
