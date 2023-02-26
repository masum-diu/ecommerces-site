import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import style from "./HovarImage.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/features/cart/cartSlice";
import Link from "next/link";
import HeartBrokenOutlinedIcon from "@mui/icons-material/HeartBrokenOutlined";
import {
  addToWishList,
  removeFromWishList,
} from "../../src/features/wishlist/wishListSlice";
const HovarImage = ({ url, data, imageURL, width, height }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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

  // console.log("jits my product", myProduct);
  useEffect(() => {
    if (data?.p_colours?.length > 0 && data?.p_sizes?.length > 0) {
      // console.log(sizeSelected);
      // console.log(colorSelected);
      if (sizeSelected === true && colorSelected === true) {
        const selectedProduct = data?.p_stocks?.find(
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
        // setDisableBtn(false);
        // console.log("your stock", stockDetails);
        // console.log("your log outputsdfsdfsdds");
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
  const handleAddToWishList = (data) => {
    dispatch(addToWishList(data));
    setShowBrokenHeart("block");
    setShowHeart("none");
  };
  const handleRemoveFromList = (data) => {
    dispatch(removeFromWishList(data));
    setShowBrokenHeart("none");
    setShowHeart("block");
  };
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
    color: data?.p_colours,
    price: data?.p_sale_price,
    amount: 1,
    stock: data?.p_stocks,
    totalAmount: 1,
    showHeart: "none",
    showBrokenHeart: "block",
  };
  // console.log("ami kas", dataForWishList);
  // console.log(imageURL);
  return (
    <div>
      <div class={style.uicard}>
        <Link href={url}>
          <img
            src={imageURL}
            style={{ maxWidth: "100%", height: "fit-content" }}
            width={width}
            height={height}
          />
        </Link>
        <div class={style.description}>
          <Stack direction={"column"} spacing={1}>
            {/* <Stack className={style.size} direction={"row"} spacing={1} mx={1}>
              {data?.p_sizes?.map((size, index) => (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleSelectSize(size?.size_name, size?.id)}
                >
                  {size?.size_name}
                </Button>
              ))}
            </Stack>
            <Stack className={style.size} direction={"row"}>
              {data?.p_colours?.map((color, index) => (
                <Box
                  mx={1}
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
            </Stack> */}
            <Stack
              direction={"row"}
              justifyContent="space-between"
              className={style.size}
            >
              <IconButton
                style={{ display: `${showHeart}` }}
                aria-label=""
                onClick={() => handleAddToWishList(dataForWishList)}
              >
                <FiHeart style={{ color: "#fff" }} />
              </IconButton>
              <IconButton
                style={{ display: `${showBrokenHeart}` }}
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
              <Button
                onClick={() => router.push(url)}
                sx={{ backgroundColor: "none", color: "#fff" }}
                variant="text"
                // color="secondary"
              >
                View Details
              </Button>
              {/* <Button
                variant="secondary"
                style={{ color: "white", border: "1px solid white" }}
                disabled={disableBtn}
                onClick={() => handleAddToCart(finalData)}
              >
                Add to cart
              </Button> */}
            </Stack>
          </Stack>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod.
          </p> */}
          {/* <a href="#">Read More</a> */}
        </div>
      </div>
    </div>
  );
};

export default HovarImage;
