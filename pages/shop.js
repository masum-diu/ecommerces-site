import { Box, Stack, Typography } from "@mui/material";
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

const shop = () => {
  const [homedata, setHomeData] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
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
      <HomePageIntro title={"Shop "} />
      <Box mt={10} sx={{ width: "100%", mb: 4 }}>
        <Stack sx={{ position: "relative" }}>
          {/* <video
            src="https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-party/subhome-xmedia-47-2//w/1920/IMAGE-landscape-fill-90388659-c9ad-44c0-8fbc-3e049adef8d9-default_0.jpg?ts=1669457847606"
            alt=""
            width="100%"
          /> */}
          <video
            width={"100%"}
            autoPlay
            // playsinline
            loop
            muted={true}
            src={homedata?.image_one}
          />
          {/* <Image
            src=
            {repo.image_two}
            width={1900}
            style={{ width: "100%", height: "fit-content" }}
            height={700}
          /> */}
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/${homedata?.image_two
              ?.split("/")
              .slice(-4)
              .join("/")}`}
            alt=""
            style={{ width: "100%", height: "fit-content" }}
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
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  // pathname: `${homedata?.back_url_one}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
                width: "100%",
                pb: 4,
                cursor: "pointer",
              }}
            >
              Latest Collection
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} sx={{ width: "100%", position: "relative" }}>
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fit,h_1000,w_900/${homedata?.image_three
              ?.split("/")
              .slice(-4)
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
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fit,h_1000,w_900/${homedata?.image_four
              ?.split("/")
              .slice(-4)
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
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `${homedata?.back_url_three}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
                width: "100%",
                pb: 4,
                cursor: "pointer",
              }}
            >
              {homedata?.back_url_three}
            </Typography>
            <Typography
              variant="cardHeader"
              color="initial"
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `${homedata?.back_url_two}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
                width: "100%",
                pb: 4,
                cursor: "pointer",
              }}
            >
              {homedata?.back_url_two}
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="tabText" color="initial">
                YOU MAY ALSO LIKE
              </Typography>
              <Typography variant="tabText" color="initial">
                VIEW ALL
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={"center"}
              columnGap={3}
              rowGap={3}
            >
              {products?.slice(0, 4).map((data) => (
                <>
                  <Stack direction={"column"} spacing={2} key={data?.id}>
                    <HovarImage
                      url={`/products/${
                        data?.p_subcategory?.slug === "unknown"
                          ? data?.p_category?.slug
                          : data?.p_subcategory?.slug
                      }/${data?.id}`}
                      data={data}
                      imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_550,w_550/${data?.feature_image
                        ?.split("/")
                        .slice(-3)
                        .join("/")}`}
                      width={350}
                      height={827}
                    ></HovarImage>
                    {/* <img
                      src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fit,h_1.0,w_1.0/v1676527368/aranya-product/${data?.feature_image?.substring(
                        data?.feature_image?.lastIndexOf("/") + 1
                      )}`}
                      alt=""
                      width={300}
                    /> */}

                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="cardHeader2" color="initial">
                        {data?.p_name}
                      </Typography>
                      <Typography
                        variant="cardHeader2"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        BDT {data?.p_sale_price} ৳
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* <Image
          src="/assets/f1.png"
          width={1900}
          style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
          height={700}
        /> */}
        <Stack direction={"row"} sx={{ width: "100%", position: "relative" }}>
          <img
            src={`https://res.cloudinary.com/diyc1dizi/image/upload/c_limit,h_900,w_1920/${homedata?.image_five
              ?.split("/")
              .slice(-4)
              .join("/")}`}
            alt=""
            style={{ width: "100%", height: "fit-content", marginTop: "25px" }}
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
              variant="cardHeader"
              color="initial"
              textAlign={"center"}
              fontWeight={"600"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  // pathname: `${homedata?.back_url_one}`,
                  query: { cat: 1, sub_cat: 7 },
                })
              }
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "Center",
                width: "100%",
                pb: 4,
                cursor: "pointer",
              }}
            >
              Home & Décor
            </Typography>
          </Stack>
        </Stack>
        <Box mt={4}>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="tabText" color="initial">
                WHAT'S NEW
              </Typography>
              <Typography variant="tabText" color="initial">
                VIEW ALL
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={"center"}
              columnGap={3}
              rowGap={3}
            >
              {products?.slice(0, 4).map((data) => (
                <>
                  <Stack direction={"column"} spacing={2} key={data?.id}>
                    <HovarImage
                      url={`/products/${
                        data?.p_subcategory?.slug === "unknown"
                          ? data?.p_category?.slug
                          : data?.p_subcategory?.slug
                      }/${data?.id}`}
                      data={data}
                      imageURL={`https://res.cloudinary.com/diyc1dizi/image/upload/c_fill,g_auto,h_550,w_550/${data?.feature_image
                        ?.split("/")
                        .slice(-3)
                        .join("/")}`}
                      width={350}
                      height={827}
                    ></HovarImage>

                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="cardHeader2" color="initial">
                        {data?.p_name}
                      </Typography>
                      <Typography
                        variant="cardHeader2"
                        fontWeight={"bold"}
                        color="initial"
                      >
                        BDT {data?.p_sale_price} ৳
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default shop;
