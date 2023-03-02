import React, { useState } from "react";
import { Stack } from "@mui/system";
import { Box, IconButton, Modal, cancelOpen, Hidden } from "@mui/material";
import { MdClose } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import { FreeMode, Navigation, Thumbs, Zoom } from "swiper";
const ThumbsGallery1 = ({ open, setOpen }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          ".mui-style-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "#ffff",
          },
          "*": {
            outline: "none",
          },
        }}

        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box>
          <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
            <IconButton aria-label="" onClick={() => setOpen(false)}>
              <MdClose
                fontSize={"32px"}
                style={{ color: cancelOpen ? "#f00" : "#000" }}
              />
            </IconButton>
          </Stack>

          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "red",
              // marginTop: "3rem",
            }}
            loop={true}
            zoom={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Zoom]}
            className="mySwiper2"
          >
            <SwiperSlide
            // style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="swiper-zoom-container">
                <img
                  src="https://aranya.com.bd/wp-content/uploads/2023/02/1-2-768x768.jpg"
                  width={600}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
            // style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="swiper-zoom-container">
                <img
                  src="https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg"
                  width={600}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
            // style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="swiper-zoom-container">
                <img
                  src="https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg"
                  width={600}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
            // style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="swiper-zoom-container">
                <img
                  src="https://aranya.com.bd/wp-content/uploads/2023/02/4-2.jpg"
                  width={600}
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
             loop={true}
            spaceBetween={0}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            // className="mySwiper"
            style={{
              marginTop: "1rem",
              width:"35%"
              // backgroundColor: "red",
              // width: "100%",
            }}
          >
            <SwiperSlide>
              <img
                src="https://aranya.com.bd/wp-content/uploads/2023/02/1-2-768x768.jpg"
                width={200}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg"
                width={200}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg"
                width={200}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://aranya.com.bd/wp-content/uploads/2023/02/4-2.jpg"
                width={200}
              />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Modal>
    </>
  );
};

export default ThumbsGallery1;
