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

const FromOurShop = ({ homedata }) => {
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
  return (
    <Box sx={{ width: "100%", pt: { lg: 8, xs: 7 } }}>
      <Stack>
        <Typography color="#1B3148" className="bold" variant="CategoryName">
          From Our Shop
        </Typography>
      </Stack>

      {homedata?.length > 0 && (
        <Box mt={4}>
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
            // loop={true}
            modules={[Pagination, Navigation, Autoplay]}
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            className="mySwiper"
            style={{ width: "100%", margin: "0 auto", maxWidth: "1500px" }}
          >
            {homedata?.map((data, index) => (
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
    </Box>
  );
};

export default FromOurShop;
