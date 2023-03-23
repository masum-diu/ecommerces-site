import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HovarImage from "./HovarableImage/HovarImage";
import { useRouter } from "next/router";

const ProductsLayout = ({ productsDataChunk, isLoading }) => {
  const router = useRouter();

  if (productsDataChunk.length === 0) return <></>;
  return (
    <>
      {productsDataChunk[0] && (
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 1, lg: 4 },
          }}
        >
          <HovarImage
            url={`${router?.asPath?.split("?")[0]}/${productsDataChunk[0]?.id}`}
            data={productsDataChunk[0]}
            /* src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/${homedata?.image_five
              ?.split("/")
              .slice(-4)
              .join("/")}`} */
            imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_850,w_550/${productsDataChunk[0]?.feature_image?.split("/")
            .slice(-3)
            .join("/")}`}
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
            <Typography variant="cardHeader3" color="initial" className="SemiBold">
              {productsDataChunk[0]?.p_name}
            </Typography>
            <Typography variant="cardHeader3" color="initial"  className="bold">
              BDT {productsDataChunk[0]?.p_sale_price} 
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
          <>
            <Grid item lg={4} sm={6} key={product?.id}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/${product?.feature_image?.split("/")
                .slice(-3)
                .join("/")}`}
                width={568}
                height={827}
              />
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
                mt={2}
              >
                <Typography variant="cardHeader3" color="initial">
                  {product?.p_name}
                </Typography>
                <Typography variant="cardHeader3" color="initial">
                  BDT {product?.p_sale_price} 
                </Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
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
        {productsDataChunk?.slice(4, 6).map((product) => (
          <>
            <Grid item lg={4} sm={6} key={product?.id}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/${product?.feature_image?.split("/")
                .slice(-3)
                .join("/")}`}
                width={568}
                height={827}
              />
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
                mt={2}
              >
                <Typography variant="cardHeader3" color="initial">
                  {product?.p_name}
                </Typography>
                <Typography variant="cardHeader3" color="initial">
                  BDT {product?.p_sale_price} 
                </Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
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
        {productsDataChunk?.slice(6, 9).map((product) => (
          <>
            <Grid item lg={4} sm={6} key={product?.id}>
              <HovarImage
                url={`${router?.asPath?.split("?")[0]}/${product?.id}`}
                data={product}
                imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_855,w_586/${product?.feature_image?.split("/")
                .slice(-3)
                .join("/")}`}
                width={568}
                height={827}
              />
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"space-between"}
                mt={2}
              >
                <Typography variant="cardHeader3" color="initial">
                  {product?.p_name}
                </Typography>
                <Typography variant="cardHeader3" color="initial">
                  BDT {product?.p_sale_price} 
                </Typography>
              </Stack>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default ProductsLayout;
