import React from "react";
import "./BannerSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import beverages from "../Assets/beverage-r.png";
import frozenGoods from "../Assets/frozen-r.png";
import fruit from "../Assets/fruits-r.png";
import juice from "../Assets/juices-r.png";
import vegetable from "../Assets/veges-r.png";
import toys from "../Assets/toys-r.png";
import dessert from "../Assets/icecream-r.png";
import rice from "../Assets/rice-r.png";

const cards = [
  { id: 1, title: "Beverages", imageUrl: beverages, quantity: 5 },
  { id: 2, title: "Desserts", imageUrl: dessert, quantity: 10 },
  { id: 3, title: "Juices", imageUrl: juice, quantity: 7 },
  { id: 4, title: "Frozen Goods", imageUrl: frozenGoods, quantity: 20 },
  { id: 5, title: "Rice", imageUrl: rice, quantity: 15 },
  { id: 6, title: "Fresh Fruits", imageUrl: fruit, quantity: 16 },
  { id: 7, title: "Vegetables", imageUrl: vegetable, quantity: 11 },
  { id: 8, title: "Toys", imageUrl: toys, quantity: 21 },
];

const BannerSlider = () => {
  return (
    <div className="swiper-container px-[12px] container mx-auto overflow-hidden">
      <div className="swiper-sub-container relative">
        <Swiper
          slidesPerView={6}
          spaceBetween={24}
          loop={false}
          navigation={{
            prevEl: ".banner-slider-prev",
            nextEl: ".banner-slider-next",
          }}
          modules={[Navigation]}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="card flex items-center justify-center relative text-center overflow-hidden rounded-xl bg-[#f3f9f5] py-[18px] px-[20px]">
                <div className="card-sub-container">
                  <div className="card-img-container h-[120px] w-[120px] bg-[#fff] inline-flex items-center justify-center rounded-full mb-[15px] relative card-shadow card-transition">
                    <a
                      href="#!"
                      className="card-img-link card-transition no-underline"
                    >
                      <span className="img-card-span">
                        <img
                          className="w-[70px] card-transition card-img"
                          src={card.imageUrl}
                          alt={card.title}
                        />
                      </span>
                    </a>
                  </div>
                  <div className="card-title-container leading-none">
                    <h3 className="text-[18px] font-semibold mb-[3px] leading-snug">
                      <a href="#!">{card.title}</a>
                    </h3>
                    <span className="text-[14px] text-[#626571]">
                      {card.quantity} products
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="banner-navi banner-slider-prev swiper-button-prev left-0 !important "></div>
        <div className="banner-navi banner-slider-next swiper-button-next right-0"></div>
      </div>
    </div>
  );
};

export default BannerSlider;
