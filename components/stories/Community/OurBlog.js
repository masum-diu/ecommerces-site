import {
  Box,
  Stack,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HovarImage from "../../HovarableImage/HovarImage";
import Blog from "../../Blog/Blog";
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

const OurBlog = ({ products }) => {
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
      setSlidePreview(3);
    } else {
      setSlidePreview(3);
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
  return (
    <Box sx={{ width: "100%", mb: 4, pt: { lg: 8, xs: 7 } }} mt={5}>
      <Stack>
        <Typography color="#1B3148" className="bold" variant="productName">
          Our Blog
        </Typography>
      </Stack>

      {products?.length > 0 && (
        <Box mb={15}>
          <Stack
            direction={"row"}
            justifyContent="end"
            sx={{ width: "100%", margin: "0 auto", maxWidth: "1500px" }}
          >
            <ArrowRightAltOutlinedIcon
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={handleNextSlide}
            ></ArrowRightAltOutlinedIcon>
          </Stack>
          <Swiper
            key={Math.random() * 10}
            loop={false}
            modules={[Pagination, Navigation, Autoplay]}
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            className="mySwiper"
            style={{ width: "100%", margin: "0 auto", maxWidth: "1500px" }}
          >
            {products?.map((data, index) => (
              <SwiperSlide
                key={index}
                style={{ maxWidth: "318px", width: "100%" }}
              >
                <Blog data={data} imageURL={data}></Blog>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default OurBlog;
