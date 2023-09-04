import { Box, Stack, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePageIntro from "../components/HomePageIntro";
import HovarImage from "../components/HovarableImage/HovarImage";
import Loader from "../components/Loader/Loader";
import {
  useGetProductsQuery,
  useGetHomePageProductsQuery,
} from "../src/features/api/apiSlice";

import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import style from "../public/assets/css/HomePageIntro.module.css";
import { useCurrencyConversion } from "../src/hooks/useCurrencyConversion";

const shop = () => {
  const [homedata, setHomeData] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  const {
    data: landingdata,
    isSuccess: isLandingSuccess,
    isLoading: isLandingLoading,
    isError: isLandingError,
    error: landingError,
  } = useGetHomePageProductsQuery();
  useEffect(() => {
    if (isSuccess) {
      const handleSuccess = async () => {
        await setProducts(data?.data);
      };
      handleSuccess();
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (isLandingSuccess) {
      const handleSuccess = async () => {
        await setHomeData(landingdata);
      };
      handleSuccess();
    }
  }, [isLandingSuccess, landingdata]);
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (isLandingLoading) {
    return <Loader></Loader>;
  }
  // const products = data?.data;
  // The way of getting data by transforming
  const slicedData = homedata?.image_two?.split("/").slice(-4).join("/");
  const slicedDats = homedata?.image_two?.split("/");
  

  return (
    <>
      <Head>
        <meta name="keywords" content="Aranya online shop" />
        <meta name="twitter:card" content="Shop" />
        <meta
          name="twitter:title"
          content="Aranya Bangladesh- Sustainable and Ethical Fashion and Lifestyle Brand"
        />
        <meta
          name="description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        ></meta>
        <meta name="twitter:site" content="@webable_digital" />
        <meta name="twitter:creator" content="@webable_digital" />
        <meta
          name="twitter:description"
          content=" Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />
        <meta name="twitter:image" content={homedata?.image_two} />

        <meta
          property="og:title"
          content="Aranya Bangladesh- Sustainable and Ethical Fashion and Lifestyle Brand"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={router.pathname} />
        <meta property="og:image" content={homedata?.image_two} />
        <meta
          property="og:description"
          content="Aranya produces sustainable and fair trade craft products that ranges from Men, Women and Children's wear to lifestyle luxury products using natural dyes, azo free dyes,natural fibres and textiles and other biodegradable materials."
        />
      </Head>
      <HomePageIntro title={"Shop "} />
      <Box sx={{ width: "100%", mb: 4, pt: { lg: 8, xs: 7 } }}>
        <Stack sx={{ position: "relative" }}>
          {/* <video
            src="https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-party/subhome-xmedia-47-2//w/1920/IMAGE-landscape-fill-90388659-c9ad-44c0-8fbc-3e049adef8d9-default_0.jpg?ts=1669457847606"
            alt=""
            width="100%"
          /> */}

          {/* <video
            width={"100%"}
            autoPlay
            // playsinline
            type="video/mp4"
            loop
            muted={true}
            src={homedata?.image_one}
          /> */}

          {/* <div
          
        /> */}
          <Stack
            dangerouslySetInnerHTML={{
              __html: `<video className="app__backgroundVideo" autoplay loop muted playsinline>
              <source src=${homedata?.image_one} type="video/mp4" />
              Your browser does not support the video tag.
              </video>`,
            }}
          />

          {/* <Image
            src=
            {repo.image_two}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
            height={700}
          /> */}
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_900,w_1920/${homedata?.image_two
              ?.split("/")
              .slice(-3)
              .join("/")}`}
            alt=""
            // style={{ width: "1920px", height: "900px" }}
          />
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={style.menu3}
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `/products/${homedata?.back_url_two}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                pb: 4,
                cursor: "pointer",
                px: 4,
              }}
            >
              <li>Latest Collection</li>
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={{ width: "100%", position: "relative" }}>
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_900,w_900/${homedata?.image_three
              ?.split("/")
              .slice(-3)
              .join("/")}`}
            style={{ cursor: "pointer" }}
            alt=""
            width={"50%"}
            onClick={() =>
              router.push({
                pathname: `/products/${homedata?.back_url_three}`,
                query: { cat: 2, sub_cat: 13 },
              })
            }
          />

          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_900,w_900/${homedata?.image_four
              ?.split("/")
              .slice(-3)
              .join("/")}`}
            style={{ cursor: "pointer" }}
            alt=""
            width={"50%"}
            onClick={() =>
              router.push({
                pathname: `/products/${homedata?.back_url_two}`,
                query: { cat: 1, sub_cat: 7 },
              })
            }
          />
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={style.menu3}
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `/products/${homedata?.back_url_three}`,
                  query: { cat: 2, sub_cat: 13 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                pb: 4,
                cursor: "pointer",
                px: 4,
              }}
            >
              <li>{homedata?.back_url_three}</li>
            </Typography>
            <Typography
              className={style.menu3}
              variant="cardHeader"
              color="initial"
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `/products/${homedata?.back_url_two}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                pb: 4,
                cursor: "pointer",
                px: 4,
              }}
            >
              <li>{homedata?.back_url_two}</li>
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Typography variant="tabText" color="initial" px={1}>
              WHAT'S NEW
            </Typography>
            <Typography variant="tabText" color="initial" pr={1}>
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
                    imageURL={`${data?.p_image_one}`}
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
                      {data?.p_name}
                    </Typography>
                    <Typography
                      variant="cardHeader2"
                      className="bold"
                      color="initial"
                    >
                      {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* <Image
          src="/assets/f1.png"
          width={1900}
          style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
          height={700}
        /> */}
        <Stack direction={"row"} sx={{ width: "100%", position: "relative" }}>
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_lfill,g_auto,h_900,w_1920/${homedata?.image_five
              ?.split("/")
              .slice(-3)
              .join("/")}`}
            alt=""
            style={{ width: "100%", height: "auto", marginTop: "25px" }}
          />
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={style.menu3}
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push(
                  {
                    pathname: "/products/kurti-fatua",
                    query: { cat: 1, sub_cat: 9 },
                  },
                  "/products/kurti-fatua?cat=1&sub_cat=9"
                )
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                pb: 4,
                cursor: "pointer",
                px: 4,
              }}
            >
              <li>Kurti & Fatua</li>
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Typography variant="tabText" color="initial" px={1}>
              WHAT'S NEW
            </Typography>
            <Typography variant="tabText" color="initial" pr={1}>
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
                    imageURL={`${data?.p_image_one}`}
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
                      {data?.p_name}
                    </Typography>
                    <Typography
                      variant="cardHeader2"
                      className="bold"
                      color="initial"
                    >
                      {selectedCurrency} {convertPrice(data?.p_stocks[0]?.mrp)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default shop;
