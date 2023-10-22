import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HovarImage from "./HovarableImage/HovarImage";

import { useRouter } from "next/router";
import Loader from "./Loader/Loader";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";

const ProductsLayoutWithStaticImage = ({
  productsDataChunk,
  staticData,
  isLoading,
}) => {
  const router = useRouter();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  /* if (isLoading) {
    return <Loader />;
  } */
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
            data={productsDataChunk[0]}
            imageURL={`${productsDataChunk[0]?.feature_image}`}
            width={550}
            height={850}
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
            <Typography
              variant="cardHeader3"
              color="initial"
              className="SemiBold"
            >
              {productsDataChunk[0]?.p_name}
            </Typography>
            <Typography variant="cardHeader3" color="initial" className="bold">
              {/* BDT {productsDataChunk[0]?.p_stocks[0]?.mrp} */}
              {selectedCurrency}{" "}
              {convertPrice(productsDataChunk[0]?.p_stocks[0]?.mrp)}
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
          marginTop: "1rem",
        }}
      >
        {productsDataChunk?.slice(1, 4).map((product) => (
          <Grid item lg={4} sm={6} key={product?.id}>
            <HovarImage
              url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
              data={product}
              imageURL={`${product?.feature_image}`}
              width={568}
              height={827}
            />
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              mt={2}
            >
              <Typography
                variant="cardHeader3"
                color="initial"
                className="SemiBold"
              >
                {product?.p_name}
              </Typography>
              <Typography
                variant="cardHeader3"
                color="initial"
                className="bold"
              >
                {/* BDT {product?.p_stocks[0]?.mrp} */}
                {selectedCurrency} {convertPrice(product?.p_stocks[0]?.mrp)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack direction={"row"} sx={{ width: "100%" }} mt={4}>
        <img
          src={`${staticData?.cat_img_one
            ?.split("/")
            .slice(0, 6)
            .join("/")}/c_fill,g_auto,h_828,w_720/${staticData?.cat_img_two
            ?.split("/")
            .slice(6)
            .join("/")}`}
          alt=""
          width={"50%"}
        />
        <img
          src={`${staticData?.cat_img_one
            ?.split("/")
            .slice(0, 6)
            .join("/")}/c_fill,g_auto,h_828,w_720/${staticData?.cat_img_three
            ?.split("/")
            .slice(6)
            .join("/")}`}
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
          <Grid item lg={4} sm={6} key={product?.id}>
            <HovarImage
              url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
              data={product}
              imageURL={`${product?.feature_image}`}
              width={568}
              height={827}
            />
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              mt={2}
            >
              <Typography
                variant="cardHeader3"
                color="initial"
                className="SemiBold"
              >
                {product?.p_name}
              </Typography>
              <Typography
                variant="cardHeader3"
                color="initial"
                className="bold"
              >
                {/* BDT {product?.p_stocks[0]?.mrp} */}
                {selectedCurrency} {convertPrice(product?.p_stocks[0]?.mrp)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductsLayoutWithStaticImage;
