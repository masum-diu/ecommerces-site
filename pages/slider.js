import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
const slider = () => {
  const data = [
    {  id:1,
      image:
        "https://aranya.com.bd/wp-content/uploads/2023/02/1-9.jpg",
    },
    { id:2,
      image:
        "https://aranya.com.bd/wp-content/uploads/2023/02/2-9.jpg",
    },
    { id:3,
      image:
        "https://aranya.com.bd/wp-content/uploads/2023/02/3-9.jpg",
    },
    { id:4,
      image:
        "https://aranya.com.bd/wp-content/uploads/2023/02/4-9.jpg",
    },
  ];
  const [activeThumb, setActiveThumb] = useState();
  console.log(activeThumb)

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        // className='product-images-slider'
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt="product images" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) =>setActiveThumb(swiper)}
        // onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        // className='product-images-slider-thumbs'
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div>
              <img src={item.image} alt="product images" width={400} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};



export default slider;
