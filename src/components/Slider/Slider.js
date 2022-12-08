import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";
import { useSelector } from "react-redux";
const Img = styled.img`
  width: 300px !important;
  height: 300px !important;
  object-fit: cover;
`;
function Slider() {
  const nightMode = useSelector((state) => state.mode.night);
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-image-3_e934902f-345b-4cc4-80b9-9ef3d77a1f34.png?v=1661272676"></Img>
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://www.90mobiles.com/dataup/2022/07/httpswwwboat-lifestylecomproductswave-select-smartwatch.png"></Img>
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://www.pngmart.com/files/13/Bluetooth-Smartwatch-PNG-Image.png"></Img>
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main-image-3_e934902f-345b-4cc4-80b9-9ef3d77a1f34.png?v=1661272676"></Img>
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://www.90mobiles.com/dataup/2022/07/httpswwwboat-lifestylecomproductswave-select-smartwatch.png"></Img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;
