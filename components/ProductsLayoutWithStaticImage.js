import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HovarImage from "./HovarableImage/HovarImage";

import { useRouter } from "next/router";
import Loader from "./Loader/Loader";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";
import useDiscountCount from "../src/hooks/useDiscountCount";

const ProductsLayoutWithStaticImage = ({
  productsDataChunk,
  staticData,
  isLoading,
}) => {
  const router = useRouter();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const { updatedPriceAfterDiscount } = useDiscountCount();
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
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              alignItems={"end"}
            >
              {productsDataChunk[0]?.p_stocks[0]?.discount?.discount_type !==
              undefined ? (
                <Typography
                  variant="cardHeader3"
                  color="initial"
                  className="bold"
                >
                  {/* BDT {product?.p_stocks[0]?.mrp} */}
                  {selectedCurrency}{" "}
                  <span>
                    {
                      updatedPriceAfterDiscount(
                        convertPrice(productsDataChunk[0]?.p_stocks[0]?.mrp),
                        productsDataChunk[0]?.p_stocks[0]?.discount
                          ?.discount_amount,
                        productsDataChunk[0]?.p_stocks[0]?.discount
                          ?.discount_type
                      ).updatedPrice
                    }
                  </span>
                </Typography>
              ) : (
                ""
              )}
              <Stack direction={"row"} spacing={2}>
                {productsDataChunk[0]?.p_stocks[0]?.discount?.discount_type !==
                undefined ? (
                  <Typography
                    variant="cardHeader3"
                    color="initial"
                    className="bold"
                  >
                    -
                    {
                      productsDataChunk[0]?.p_stocks[0]?.discount
                        ?.discount_amount
                    }
                    %
                  </Typography>
                ) : (
                  ""
                )}

                <Typography
                  variant="cardHeader3"
                  color="initial"
                  className="bold"
                  style={{
                    textDecorationLine: `${
                      productsDataChunk[0]?.p_stocks[0]?.discount
                        ?.discount_type !== undefined
                        ? "line-through"
                        : "none"
                    }`,
                  }}
                >
                  {/* BDT {product?.p_stocks[0]?.mrp} */}
                  {selectedCurrency}{" "}
                  {convertPrice(productsDataChunk[0]?.p_stocks[0]?.mrp)}
                </Typography>
              </Stack>
            </Stack>
            {/* <Typography variant="cardHeader3" color="initial" className="bold">
              {selectedCurrency}{" "}
              {convertPrice(productsDataChunk[0]?.p_stocks[0]?.mrp)}
            </Typography> */}
          </Stack>
        </Stack>
      )}
      <Grid
        container
        justifyContent={"center"}
        spacing={0}
        sx={{
          width: "95%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: "1rem",
        }}
      >
        {productsDataChunk?.slice(1, 4).map((product) => (
          <Grid item lg={4} sm={6} key={product?.id}>
            <Stack direction={"column"} spacing={2} ml={1} mr={1} mt={2}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`${product?.feature_image}`}
                // width={568}
                // height={827}
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
                <Stack
                  direction={"column"}
                  justifyContent={"space-between"}
                  alignItems={"end"}
                >
                  {product?.p_stocks[0]?.discount?.discount_type !==
                  undefined ? (
                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="bold"
                    >
                      {/* BDT {product?.p_stocks[0]?.mrp} */}
                      {selectedCurrency}{" "}
                      <span>
                        {
                          updatedPriceAfterDiscount(
                            convertPrice(product?.p_stocks[0]?.mrp),
                            product?.p_stocks[0]?.discount?.discount_amount,
                            product?.p_stocks[0]?.discount?.discount_type
                          ).updatedPrice
                        }
                      </span>
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Stack direction={"row"} spacing={2}>
                    {product?.p_stocks[0]?.discount?.discount_type !==
                    undefined ? (
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        className="bold"
                      >
                        -{product?.p_stocks[0]?.discount?.discount_amount}%
                      </Typography>
                    ) : (
                      ""
                    )}

                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="bold"
                      style={{
                        textDecorationLine: `${
                          product?.p_stocks[0]?.discount?.discount_type !==
                          undefined
                            ? "line-through"
                            : "none"
                        }`,
                      }}
                    >
                      {/* BDT {product?.p_stocks[0]?.mrp} */}
                      {selectedCurrency}{" "}
                      {convertPrice(product?.p_stocks[0]?.mrp)}
                    </Typography>
                  </Stack>
                </Stack>
                {/* <Typography
                  variant="cardHeader3"
                  color="initial"
                  className="bold"
                >
                  {selectedCurrency} {convertPrice(product?.p_stocks[0]?.mrp)}
                </Typography> */}
              </Stack>
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
        // spacing={2}
        sx={{
          width: "95%",
          maxWidth: "1500px",
          margin: "0 auto",
          marginTop: "3rem",
        }}
      >
        {productsDataChunk?.slice(4, 7).map((product) => (
          <Grid item lg={4} sm={6} key={product?.id}>
            <Stack direction={"column"} spacing={2} ml={1} mr={1} mt={2}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`${product?.feature_image}`}
                // width={568}
                // height={827}
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
                <Stack
                  direction={"column"}
                  justifyContent={"space-between"}
                  alignItems={"end"}
                >
                  {product?.p_stocks[0]?.discount?.discount_type !==
                  undefined ? (
                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="bold"
                    >
                      {/* BDT {product?.p_stocks[0]?.mrp} */}
                      {selectedCurrency}{" "}
                      <span>
                        {
                          updatedPriceAfterDiscount(
                            convertPrice(product?.p_stocks[0]?.mrp),
                            product?.p_stocks[0]?.discount?.discount_amount,
                            product?.p_stocks[0]?.discount?.discount_type
                          ).updatedPrice
                        }
                      </span>
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Stack direction={"row"} spacing={2}>
                    {product?.p_stocks[0]?.discount?.discount_type !==
                    undefined ? (
                      <Typography
                        variant="cardHeader3"
                        color="initial"
                        className="bold"
                      >
                        -{product?.p_stocks[0]?.discount?.discount_amount}%
                      </Typography>
                    ) : (
                      ""
                    )}

                    <Typography
                      variant="cardHeader3"
                      color="initial"
                      className="bold"
                      style={{
                        textDecorationLine: `${
                          product?.p_stocks[0]?.discount?.discount_type !==
                          undefined
                            ? "line-through"
                            : "none"
                        }`,
                      }}
                    >
                      {/* BDT {product?.p_stocks[0]?.mrp} */}
                      {selectedCurrency}{" "}
                      {convertPrice(product?.p_stocks[0]?.mrp)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductsLayoutWithStaticImage;
