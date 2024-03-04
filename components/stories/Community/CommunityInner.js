import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HovarImage from "../../HovarableImage/HovarImage.js";
import Blog from "../../Blog/Blog.js";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@emotion/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import homedata from "../../../public/assets/data/demoProduct.js";
import FromOurShop from "./FromOurShop.js";
import OurBlog from "./OurBlog.js";
import OurProcess from "./OurProcess.js";
import Intro from "./Intro.js";

const CommunityInner = () => {
  const [slidesPerView, setSlidePreview] = useState(0);
  const swiperRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
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
  const handleSecondBanner = (path) => {
    router.push(path);
  };
  const products = [
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process1.jpg",
    "/assets/community_process2.jpg",
    "/assets/community_process.jpg",
  ];

  return (
    <>
      <Box
        mb={4}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center", py: 10 }}
        >
          <Stack
            direction={"row"}
            spacing={0.5}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant="cardHeader1"
              color="#1B3148"
              className="bold"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/story")}
            >
              Community
            </Typography>
            <MdOutlineKeyboardArrowRight />
            <Typography
              variant="cardHeader1"
              sx={{ cursor: "pointer" }}
              color="#1B3148"
              className="bold"
            >
              Jessore
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"column"} width={"100%"} alignItems={"flex-start"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Typography className="bold" color="#1B3148" variant="login1">
              Community
            </Typography>
            <Typography
              ml={3}
              className="bold"
              color="#1B3148"
              variant="legend"
            >
              Jessore
            </Typography>
          </Stack>
          <Typography color="#1B3148" className="bold" variant="productName">
            Nakshi Katha
          </Typography>
        </Stack>
      </Box>
      <Intro></Intro>
      {/* <Box mt={4}>
        <Stack mb={4}>
          <Typography color="#1B3148" className="bold" variant="CategoryName">
            Our Process
          </Typography>
        </Stack>

        <Grid
          container
          // spacing={1}
          justifyContent={{
            xs: "center",
            xms: "center",
            sm: "center",
            md: "space-between",
            lg: "space-between",
            xl: "space-between",
          }}
          // sx={{ border: "1px solid red" }}
        >
          {products?.slice(0, 3).map((data, index) => (
            <Grid
              item
              mt={1}
              xs={12}
              xms={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
              key={index}
            >
              <Stack
                direction={"column"}
                sx={{
                  maxWidth: { xs: "100%", lg: "fit-content" },
                }}
                justifyContent={"center"}
              >
                <img
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={data}
                  alt=""
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box> */}
      <OurProcess products={products}></OurProcess>

      <FromOurShop homedata={homedata}></FromOurShop>

      <OurBlog products={products}></OurBlog>
    </>
  );
};

export default CommunityInner;
