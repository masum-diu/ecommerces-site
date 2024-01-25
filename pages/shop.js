import { Box, Stack, Typography, Grid, Button } from "@mui/material";
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
import useDiscountCount from "../src/hooks/useDiscountCount";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import SingularComponentForShop from "../components/SingularComponentForShop";
import CategoryComponentForShop from "../components/CategoryComponentForShop";

const shop = () => {
  const [homedata, setHomeData] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { selectedCurrency, convertPrice } = useCurrencyConversion();
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();
  const { updatedPriceAfterDiscount } = useDiscountCount();
  const {
    data: landingdata,
    isSuccess: isLandingSuccess,
    isLoading: isLandingLoading,
    isError: isLandingError,
    error: landingError,
  } = useGetHomePageProductsQuery();
  // console.log("sizes", homedata);
  useEffect(() => {
    if (isSuccess) {
      const handleSuccess = () => {
        setProducts(data?.data);
      };
      handleSuccess();
    }
  }, [data, isLoading]);
  useEffect(() => {
    if (isLandingSuccess) {
      const handleSuccess = () => {
        setHomeData(landingdata);
      };
      handleSuccess();
    }
  }, [isLandingSuccess, landingdata]);
  const handleFirstBanner = () => {
    /* router.push({
      pathname: `/new-collections`,
    }); */

    const backUrl = homedata?.back_url_two;

    const pathname = `/products/${backUrl?.split("?")[0]}`;
    const pathname_campaign = `/${backUrl?.split("?")[0]}`;
    const isCampaign = homedata?.back_url_two?.includes("campaign");

    const query = {};

    const catMatch = /cat=(\d+)/.exec(backUrl);
    if (catMatch) {
      query.cat = catMatch[1];
    }

    const subCatMatch = /sub_cat=(\d+)/.exec(backUrl);
    if (subCatMatch) {
      query.sub_cat = subCatMatch[1];
    }
    const sub_cat_name = /cat_name=([^&]+)/.exec(backUrl);
    if (sub_cat_name) {
      query.sub_cat_name = sub_cat_name[1];
    }

    if (subCatMatch && catMatch) {
      if (isCampaign) {
        return `${pathname_campaign}/cat=${query.cat}&cat_name=${query.sub_cat_name}`;
      }
      return `${pathname}?cat=${query.cat}&sub_cat=${query.sub_cat}`;
    }
    if (!subCatMatch) {
      if (isCampaign) {
        return `${pathname_campaign}/cat=${query.cat}&cat_name=${query.sub_cat_name}`;
      }
      return `${pathname}?cat=${query.cat}`;
    }
  };

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
        <Stack>
          {homedata.map((data, index) => {
            if (data?.pattern === "single") {
              return (
                <SingularComponentForShop
                  homedata={data}
                ></SingularComponentForShop>
              );
            } else if (data?.pattern === "double") {
              return (
                <CategoryComponentForShop
                  homedata={data}
                ></CategoryComponentForShop>
              );
            }
            // console.log("your log output", data);
          })}
        </Stack>
        {/* {homedata.map((data, index) => {
          if (data?.pattern === "double") {
            return (
              <CategoryComponentForShop
                homedata={data}
              ></CategoryComponentForShop>
            );
          } else {
            return;
          }
          // console.log("your log output", data);
        })} */}

        {/* <Image
          src="/assets/f1.png"
          width={1900}
          style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
          height={700}
        /> */}
        {/* <Stack
          // onClick={() => handleFourthBanner()}
          direction={"row"}
          sx={{ width: "100%", position: "relative" }}
        >
          <img
            src={`${homedata?.image_five
              ?.split("/")
              .slice(0, 6)
              .join("/")}/c_lfill,g_auto,h_900,w_1920/${homedata?.image_five
              ?.split("/")
              .slice(6)
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
              
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Typography
              variant="tabText"
              // color="#1B3148"
              style={{ color: "#1B3148", fontWeight: "900" }}
              px={1}
            >
              WHAT'S NEW
            </Typography>
            
            <ArrowRightAltOutlinedIcon
              style={{ fontSize: "2rem" }}
            ></ArrowRightAltOutlinedIcon>
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
                  
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Box>
      <Footer />
    </>
  );
};

export default shop;
