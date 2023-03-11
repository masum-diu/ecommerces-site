import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HovarImage from "./HovarableImage/HovarImage";

import { useRouter } from "next/router";
import Loader from "./Loader/Loader";

const ProductsLayoutWithStaticImage = ({ productsDataChunk, staticData, isLoading }) => {
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }
  if (productsDataChunk.length === 0) return <></>;
  return (
    <>
      {productsDataChunk[0] && (
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 1, lg: 2 },
          }}
        >
          <HovarImage
            url={`${router?.asPath?.split("?")[0]}/${productsDataChunk[0]?.id}`}
            data={productsDataChunk}
            imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_565,w_586/v1676527368/aranya/${productsDataChunk[0]?.feature_image?.substring(
              productsDataChunk[0]?.feature_image?.lastIndexOf("/") + 1
            )}`}
            width={568}
            height={827}
          />
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              maxWidth: "565px",
              mt: 2,
            }}
          >
            <Typography variant="cardHeader3" color="initial">
              {productsDataChunk[0]?.p_name}
            </Typography>
            <Typography variant="cardHeader3" color="initial">
              BDT {productsDataChunk[0]?.p_sale_price} ৳
            </Typography>
          </Stack>
        </Stack>
      )}
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{
          width: "90%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: "3rem",
        }}
      >
        {productsDataChunk?.slice(1, 4).map((product) => (
          <>
            <Grid item lg={4} sm={6} key={product?.id}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/v1676527368/aranya/${product?.feature_image?.substring(
                  product?.feature_image?.lastIndexOf("/") + 1
                )}`}
                width={568}
                height={827}
              />
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="cardHeader3" color="initial">
                  {product?.p_name}
                </Typography>
                <Typography variant="cardHeader3" color="initial">
                  BDT {product?.p_sale_price} ৳
                </Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
      <Stack direction={"row"} sx={{ width: "100%" }} mt={4}>
        <img
          src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_two?.substring(
            staticData?.cat_img_two?.lastIndexOf("/") + 1
          )}`}
          alt=""
          width={"50%"}
        />
        <img
          src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_828,w_720/v1676527368/aranya/${staticData?.cat_img_three?.substring(
            staticData?.cat_img_three?.lastIndexOf("/") + 1
          )}`}
          alt=""
          width={"50%"}
        />
      </Stack>
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{
          width: "90%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: "3rem",
        }}
      >
        {productsDataChunk?.slice(4, 7).map((product) => (
          <>
            <Grid item lg={4} sm={6} key={product?.id}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/v1676527368/aranya/${product?.feature_image?.substring(
                  product?.feature_image?.lastIndexOf("/") + 1
                )}`}
                width={568}
                height={827}
              />
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
              >
                <Typography variant="cardHeader3" color="initial">
                  {product?.p_name}
                </Typography>
                <Typography variant="cardHeader3" color="initial">
                  BDT {product?.p_sale_price} ৳
                </Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default ProductsLayoutWithStaticImage;
