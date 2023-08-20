import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HovarImage from "../../HovarableImage/HovarImage";
import Blog from "../../Blog/Blog";

const WorkInner = () => {
  const products = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 0];
  return (
    <>
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
        {/* First component for with text */}
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="login2">Our Work In Jessore</Typography>
          <Typography
            sx={{
              width: { xs: "90%", md: "60%" },
              maxWidth: "1500px",
              margin: "0 auto",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Aranya is a committed to addressing the pressing problem of
            environmental degradation and social inequality in the craft and
            fashion industries. The conventional practices in these industries
            are often harmful to both the environment and the workers involved
            in the production process
          </Typography>
        </Stack>
      </Grid>

      {/* latest section for work inner */}
      <Box mt={4}>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          <Typography variant="header1" color="initial" px={1}>
            LATEST IN KURTI
          </Typography>
          <Typography variant="header1" color="initial" pr={1}>
            VIEW ALL
          </Typography>
        </Stack>
        <Grid
          container
          sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          {products?.slice(0, 4).map((data, index) => (
            <Grid item xl={3} lg={3} md={3} sm={6} mt={1} key={index}>
              <Stack direction={"column"} spacing={2} ml={1} mr={1}>
                <HovarImage
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/v1692165926/29_1.png`}
                ></HovarImage>
                {/* <img
                      src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fit,h_1.0,w_1.0/v1676527368/aranya-product/${data?.feature_image?.substring(
                        data?.feature_image?.lastIndexOf("/") + 1
                      )}`}
                      alt=""
                      width={300}
                    /> */}

                <Stack
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "column",
                    xs: "row",
                  }}
                  spacing={2}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="cardHeader2"
                    color="initial"
                    className="SemiBold"
                  >
                    Kurti
                  </Typography>
                  <Typography
                    variant="cardHeader2"
                    className="bold"
                    color="initial"
                  >
                    BDT 1000
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* From our blog section for work inner */}
      <Box
        sx={{
          width: "70%",
          margin: "0 auto",
          marginTop: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          <Typography variant="header1" color="initial" px={1}>
            From Our Blog
          </Typography>
          <Typography variant="header1" color="initial" pr={1}>
            VIEW ALL
          </Typography>
        </Stack>
        <Grid
          container
          sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          {products?.slice(0, 3).map((data, index) => (
            <Grid item xl={4} lg={4} md={4} sm={6} mt={1} key={index}>
              <Stack direction={"column"} spacing={2} ml={1} mr={1}>
                <Blog
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/v1692165926/29_1.png`}
                ></Blog>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default WorkInner;
