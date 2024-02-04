import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import HovarImage from "./HovarableImage/HovarImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@emotion/react";
import { Pagination } from "swiper";
import { useRouter } from "next/router";
const CategoryComponentForShop = ({ homedata }) => {
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [slidesPerView, setSlidePreview] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const sectionBanner = JSON.parse(homedata.banner);
  // console.log("aresdse", homedata);

  const sectionFileType = sectionBanner[0]?.file_type;

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

  const handleSecondBanner = (path) => {
    router.push(path);
    /* if (homedata?.use_for === "category") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "sub_cat") {
      return sectionBanner[0]?.back_link;
    }
    if (homedata?.use_for === "campaign") {
      return sectionBanner[0]?.back_link;
    } */
  };
  /* const handleThirdBanner = () => {
    const backUrl = homedata?.back_url_four;
    const pathname = `/products/${backUrl?.split("?")[0]}`;
    const query = {};

    const catMatch = /cat=(\d+)/.exec(backUrl);
    if (catMatch) {
      query.cat = catMatch[1];
    }

    const subCatMatch = /sub_cat=(\d+)/.exec(backUrl);
    if (subCatMatch) {
      query.sub_cat = subCatMatch[1];
    }

    if (subCatMatch && catMatch) {
      return `${pathname}?cat=${query.cat}&sub_cat=${query.sub_cat}`;
    }
    if (!subCatMatch) {
      return `${pathname}?cat=${query.cat}`;
    }
  };
  const handleSecondBannerForA = () => {
    const backUrl = homedata?.back_url_three;
    const pathname = `/products/${backUrl?.split("?")[0]}`;
    const query = {};

    const catMatch = /cat=(\d+)/.exec(backUrl);
    if (catMatch) {
      query.cat = catMatch[1];
    }

    const subCatMatch = /sub_cat=(\d+)/.exec(backUrl);
    if (subCatMatch) {
      query.sub_cat = subCatMatch[1];
    }

    if (subCatMatch && catMatch) {
      return `${pathname}?cat=${query.cat}&sub_cat=${query.sub_cat}`;
    }
    if (!subCatMatch) {
      return `${pathname}?cat=${query.cat}`;
    }
  };
  const handleThirdBannerForA = () => {
    const backUrl = homedata?.back_url_four;
    const pathname = `/products/${backUrl?.split("?")[0]}`;
    const query = {};

    const catMatch = /cat=(\d+)/.exec(backUrl);
    if (catMatch) {
      query.cat = catMatch[1];
    }

    const subCatMatch = /sub_cat=(\d+)/.exec(backUrl);
    if (subCatMatch) {
      query.sub_cat = subCatMatch[1];
    }

    if (subCatMatch && catMatch) {
      return `${pathname}?cat=${query.cat}&sub_cat=${query.sub_cat}`;
    }
    if (!subCatMatch) {
      return `${pathname}?cat=${query.cat}`;
    }
  };

  const handleFourthBanner = () => {
    const backUrl = homedata?.back_url_five;
    const pathname = `/products/${backUrl?.split("?")[0]}`;
    const query = {};

    const catMatch = /cat=(\d+)/.exec(backUrl);
    if (catMatch) {
      query.cat = catMatch[1];
    }

    const subCatMatch = /sub_cat=(\d+)/.exec(backUrl);
    if (subCatMatch) {
      query.sub_cat = subCatMatch[1];
    }

    router.push({
      pathname,
      query,
    });
  }; */
  return (
    <>
      <Stack
        spacing={{
          xs: 2,
          xms: 2,
          sm: 3,
          md: 4,
          lg: 4,
          xl: 5,
        }}
        // px={{ xs: 1, xl: 1 }}
        direction={"row"}
        justifyContent={"space-around"}
        sx={{
          maxWidth: "1500px",
          width: "95%",
          position: "relative",
          margin: "0 auto",
          marginBottom: homedata?.product.length > 0 ? "0" : "8rem",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => setIsHoveredLeft(false)}
        >
          <Link href={`${sectionBanner[0]?.back_link}`}>
            <a style={{ lineHeight: 0 }}>
              <Stack
                style={{
                  position: "absolute",
                  right: isHoveredLeft ? 0 : "100%",
                  top: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .8s ease-in-out", // Adjust the duration and easing as needed
                  transform: isHoveredLeft
                    ? "translateX(0)"
                    : "translateX(-100%)",
                }}
              >
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  columnGap={5}
                  rowGap={5}
                >
                  <Typography
                    variant="CategoryName"
                    sx={{
                      color: "white",
                      textAlign: "center",
                    }}
                    textTransform="uppercase"
                  >
                    {sectionBanner[0]?.name}
                  </Typography>

                  <Button
                    style={{
                      backgroundColor: "#1B3148",
                      padding: ".5rem",
                      width: {
                        xs: "8rem",
                        xms: "10rem",
                        sm: "15rem",
                        md: "15rem",
                      },
                    }}
                    variant="contained"
                    size="large"
                    onClick={() =>
                      handleSecondBanner(sectionBanner[0]?.back_link)
                    }
                  >
                    <Typography variant="tabText">
                      Shop all {sectionBanner[0]?.name}
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            </a>
          </Link>
          <img
            src={`${sectionBanner[0]?.banner_uri
              ?.split("/")
              .slice(0, 6)
              .join(
                "/"
              )}/c_lfill,g_auto,h_900,w_900/${sectionBanner[0]?.banner_uri
              ?.split("/")
              .slice(6)
              .join("/")}`}
            style={{ cursor: "pointer", objectFit: "cover" }}
            alt=""
            width={"100%"}
            height={" 100%"}
          />
        </Stack>
        <Stack
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => setIsHoveredRight(false)}
        >
          <Link href={`${sectionBanner[1]?.back_link}`}>
            <a style={{ lineHeight: 0 }}>
              <Stack
                style={{
                  position: "absolute",
                  right: isHoveredRight ? 0 : "-100%", // Adjust to '0' for right to left effect
                  top: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.8s ease-in-out", // Adjust the duration and easing as needed
                  transform: isHoveredRight
                    ? "translateX(0)"
                    : "translateX(100%)",
                }}
              >
                {/* Add your content inside this box */}
                {/* <p style={{ color: "#fff" }}>Your Content Here</p> */}
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  columnGap={5}
                  rowGap={5}
                >
                  <Typography
                    variant="CategoryName"
                    sx={{
                      color: "white",
                      textAlign: "center",
                    }}
                    textTransform="uppercase"
                  >
                    {sectionBanner[1]?.name}
                  </Typography>

                  <Button
                    style={{
                      backgroundColor: "#1B3148",
                      padding: ".5rem",
                      width: {
                        xs: "8rem",
                        xms: "10rem",
                        sm: "15rem",
                        md: "15rem",
                      },
                    }}
                    variant="contained"
                    size="large"
                    onClick={() =>
                      handleSecondBanner(sectionBanner[1]?.back_link)
                    }
                  >
                    <Typography variant="tabText">
                      Shop all {sectionBanner[1]?.name}
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            </a>
          </Link>
          <img
            src={`${sectionBanner[1]?.banner_uri
              ?.split("/")
              .slice(0, 6)
              .join(
                "/"
              )}/c_lfill,g_auto,h_900,w_900/${sectionBanner[1]?.banner_uri
              ?.split("/")
              .slice(6)
              .join("/")}`}
            style={{ cursor: "pointer", objectFit: "cover" }}
            alt=""
            width={"100%"}
            height={" 100%"}
          />
        </Stack>
      </Stack>

      {homedata?.product.length > 0 && (
        <Box mt={4} mb={15}>
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
              style={{ fontSize: "2rem" }}
            ></ArrowRightAltOutlinedIcon>
          </Stack>
          <Swiper
            key={Math.random() * 10}
            loop={true}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            modules={[Pagination]}
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
          {/* <Swiper
          spaceBetween={20}
          slidesPerView={slidesPerView}
          modules={[Pagination]}
          className="mySwiper"
          style={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          {homedata?.product?.map((data, index) => (
            <SwiperSlide item xl={3} lg={3} md={3} sm={6} mt={1} key={index}>
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
            </SwiperSlide>
          ))}
        </Swiper> */}
          {/* <Grid
          container
          sx={{ width: "95%", margin: "0 auto", maxWidth: "1500px" }}
        >
          {homedata?.product?.slice(0, 4).map((data, index) => (
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
        </Grid> */}
        </Box>
      )}
    </>
  );
};

export default CategoryComponentForShop;
