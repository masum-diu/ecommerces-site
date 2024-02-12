import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import Head from "next/head";
import style from "../public/assets/css/HomePageIntro.module.css";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRouter } from "next/router";
import HovarImage from "./HovarableImage/HovarImage";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const SingularComponentForShop = ({ homedata }) => {
  const sectionBanner = JSON.parse(homedata.banner);
  const sectionFileType = sectionBanner[0]?.file_type;
  const [slidesPerView, setSlidePreview] = useState(0);
  const swiperRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  // Setting SlidePreview
  const isExtraSmallerScreen = useMediaQuery(theme.breakpoints.down("xms"));
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (isExtraSmallerScreen) {
      setSlidePreview(1);
    } else if (isSmallerScreen) {
      setSlidePreview(1);
    } else if (isMediumScreen) {
      setSlidePreview(2);
    } else if (isLargeScreen) {
      setSlidePreview(3);
    } else if (isExtraLargeScreen) {
      setSlidePreview(4);
    } else {
      setSlidePreview(4);
    }
  }, [
    isExtraSmallerScreen,
    isSmallerScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  ]);

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const handleFirstBanner = () => {
    if (homedata?.use_for === "category") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "sub_cat") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "campaign") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "other") {
      return sectionBanner[0]?.back_link;
    }
  };

  return (
    <>
      {sectionFileType === "video" ? (
        sectionBanner[0]?.back_link && sectionBanner[0]?.back_link !== null ? (
          <Link href={`${handleFirstBanner()}`}>
            <a style={{ lineHeight: 0 }}>
              <Stack
                mb={15}
                dangerouslySetInnerHTML={{
                  __html: `<video className="app__backgroundVideo" autoplay="true" muted="true" preload="auto" loop playsinline="" data-wf-ignore="true" data-object-fit="cover" >
              <source src=${sectionBanner[0]?.banner_uri} type="video/mp4" data-wf-ignore="true" />
              Your browser does not support the video tag.
              </video>`,
                }}
              />
            </a>
          </Link>
        ) : (
          <Stack
            mb={15}
            dangerouslySetInnerHTML={{
              __html: `<video className="app__backgroundVideo" autoplay="true" muted="true" preload="auto" loop playsinline="" data-wf-ignore="true" data-object-fit="cover" >
          <source src=${sectionBanner[0]?.banner_uri} type="video/mp4" data-wf-ignore="true" />
          Your browser does not support the video tag.
          </video>`,
            }}
          />
        )
      ) : sectionFileType === "image" ? (
        <Stack sx={{ position: "relative" }} mb={15}>
          {sectionBanner[0]?.back_link &&
          sectionBanner[0]?.back_link !== null ? (
            <Link href={`${handleFirstBanner()}`}>
              <a style={{ lineHeight: 0 }}>
                <img
                  src={`${sectionBanner[0]?.banner_uri
                    ?.split("/")
                    .slice(0, 6)
                    .join(
                      "/"
                    )}/c_lfill,g_auto,h_900,w_1920/${sectionBanner[0]?.banner_uri
                    ?.split("/")
                    .slice(6)
                    .join("/")}`}
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </a>
            </Link>
          ) : (
            <img
              src={`${sectionBanner[0]?.banner_uri
                ?.split("/")
                .slice(0, 6)
                .join(
                  "/"
                )}/c_lfill,g_auto,h_900,w_1920/${sectionBanner[0]?.banner_uri
                ?.split("/")
                .slice(6)
                .join("/")}`}
              alt=""
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
          <Stack
            direction={"row"}
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              className={style.menu3}
              // variant="occasionHeader"
              // color="white"
              textAlign={"center"}
              fontWeight={"900"}
              textTransform="uppercase"
              onClick={() =>
                router.push({
                  pathname: `/new-collections`,
                })
              }
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                // pt: 4,
                // fontFamily:"cursive",
                cursor: "pointer",
                px: 4,
                color: "#ffffff",
                fontSize: {
                  xs: "2rem",
                  xms: "3rem",
                  sm: "3rem",
                  md: "5rem",
                  lg: "5rem",
                  xl: "5rem",
                },
              }}
            >
              {sectionBanner[0]?.name}
              {/* <li>
                {homedata?.back_url_two?.includes("campaign")
                  ? homedata?.back_url_two
                    ? /cat_name=([^&]+)/.exec(homedata?.back_url_two)[1]
                    : ""
                  : homedata?.back_url_two
                  ? /^(.*?)\?/.exec(homedata?.back_url_two)[1]
                  : ""}
                  {sectionBanner[0]?.name}
              </li> */}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        ""
      )}
      {homedata?.product.length > 0 && (
        <Box mb={15}>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <Typography
              variant="tabText"
              // color="#1B3148"
              sx={{ color: "#1B3148", fontWeight: "900" }}
              px={1}
              mb={3}
            >
              WHAT'S NEW
            </Typography>

            <ArrowRightAltOutlinedIcon
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={handleNextSlide}
            ></ArrowRightAltOutlinedIcon>
          </Stack>
          <Swiper
            key={Math.random() * 10}
            loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            className="mySwiper"
            style={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
          >
            {homedata?.product?.map((data, index) => (
              <SwiperSlide
                key={index}
                style={{ maxWidth: "318px", width: "100%" }}
              >
                <HovarImage
                  url={`/products/${
                    data?.p_subcategory?.slug === "unknown"
                      ? data?.p_category?.slug
                      : data?.p_subcategory?.slug
                  }/${data?.id}`}
                  data={data}
                  imageURL={`${data?.p_image_one}`}
                ></HovarImage>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default SingularComponentForShop;
