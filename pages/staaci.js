import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper";

export default function staaci() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "red",
        }}
        loop={true}
        zoom={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs,Zoom]}
        className="mySwiper2"
      >
        
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <div className="swiper-zoom-container">
        <img src="https://aranya.com.bd/wp-content/uploads/2023/02/1-2-768x768.jpg" />
          </div>
         
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <div className="swiper-zoom-container">
        <img src="https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg" />
          </div>
        
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <div className="swiper-zoom-container">
        <img src="https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg" />
          </div>
          
        </SwiperSlide>
        <SwiperSlide  style={{display:"flex",justifyContent:"center"}}>
        <div className="swiper-zoom-container">
        <img src="https://aranya.com.bd/wp-content/uploads/2023/02/4-2.jpg" />
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
        className="mySwiper"
        style={{ display: "flex", justifyContent: "center",alignItems:"center", }}
      >
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://aranya.com.bd/wp-content/uploads/2023/02/1-2-768x768.jpg" width={500} />
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://aranya.com.bd/wp-content/uploads/2023/02/3-2.jpg" width={500} />
        </SwiperSlide>
        <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://aranya.com.bd/wp-content/uploads/2023/02/2-2.jpg" width={500} />
        </SwiperSlide>
        <SwiperSlide  style={{display:"flex",justifyContent:"center"}}>
          <img src="https://aranya.com.bd/wp-content/uploads/2023/02/4-2.jpg" width={500} />
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}
