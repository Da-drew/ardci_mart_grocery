import React from "react";
// css
import "./BestSelling.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { GoHeart } from "react-icons/go";
import { GrBasket } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

import slide1 from "../../Assets/bs-slide1.png";
import slide2 from "../../Assets/bs-slide2.png";
import slide3 from "../../Assets/bs-slide3.png";
import slide4 from "../../Assets/bs-slide4.png";

const bestSellingProduct = [
  {
    category: "Dessert",
    images: [slide1, slide2, slide3, slide4],
    sizes: ["375ml", "500ml"],
    price: ["₱900.50 - ₱1,200.00"],
    rating: 2,
    discountPercentage: -20,
    description: "Aptamil Gold+ ProNuntra Biotik Stage 1 Infant Formnula-31.7",
  },
];

const BestSelling = () => {
  return (
    <div className="best-selling-container bg-white w-[25%] flex flex-col px-3 flex-grow-0 container relative">
      {/* header */}
      <div className="max-w-full m-0 relative">
        <div className="p-[30px] pb-[25px] bg-[#fffdf8] border-solid border-2 border-b-0 border-[#e00000] rounded-xl rounded-b-none">
          <div>
            <div className="relative block">
              <div>
                <h2 className="text-xl font-semibold mb-[17px] relative leading-[1.4]">
                  Best Selling
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative h-1 w-10 bg-[#1b8057] rounded-[30px]"></span>
                <span className="relative w-full h-[1px] bg-[#d7d7d7] flex-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="container m-0">
        <div className="h-full">
          {bestSellingProduct.map((bestSell, index) => (
            <div key={index}>
              <div
                className="grid grid-cols-1 mx-[calc(-15px / 2)]"
                style={{
                  marginLeft: "calc(-15px / 2)",
                  marginRight: "calc(-15px / 2)",
                }}
              >
                <div
                  className="mb-[15px] relative w-full"
                  style={{
                    paddingLeft: "calc(15px / 2)",
                    paddingRight: "calc(15px / 2)",
                  }}
                >
                  <div className="p-[30px] pt-0 border-solid border-2 border-t-0 border-[#e00000] rounded-xl rounded-t-none overflow-hidden relative h-full bg-[#fffdf8]">
                    <div className="flex m-0 mt-[3px]">
                      <ul className="m-0 p-0 list-none">
                        <li className="m-0 p-0 list-none">
                          <a
                            className="p-0 pt-5 text-[12px] text-[#989ba2]"
                            href="#!"
                            rel="tag"
                          >
                            {bestSell.category}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute top-[18px] right-[18px] z-10 ">
                      <ul className="flex flex-wrap flex-col gap-[10px] justify-start items-end h-[100%]">
                        <li>
                          <a
                            href="#!"
                            className="feature-small-navi icon flex text-[#b0b2b8] bg-white rounded-md text-[14px] font-medium p-2 h-8 w-8 leading-none transition-all duration-200"
                          >
                            <span className="text-base flex items-center">
                              <GoHeart />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            className="feature-small-navi icon flex text-[#b0b2b8] bg-white rounded-md text-[14px] font-medium p-2 h-8 w-8 leading-none transition-all duration-200"
                          >
                            <span className="text-base flex items-center">
                              <GrBasket />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            className="feature-small-navi icon flex text-[#b0b2b8] bg-white rounded-md text-[14px] font-medium p-2 h-8 w-8 leading-none transition-all duration-200"
                          >
                            <span className="text-base flex items-center">
                              <FiSearch />
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-[10px] overflow-hidden relative">
                      <div className="overflow-hidden w-full relative">
                        <Swiper
                          slidesPerView={1}
                          loop={false}
                          pagination={{
                            dynamicMainBullets: true,
                            clickable: true,
                          }}
                          modules={[Pagination]}
                          className="best-selling-swiper"
                        >
                          {bestSell.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <figure>
                                <a href="#!">
                                  <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                  />
                                </a>
                              </figure>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                    <div className="main-product-details-container">
                      {/* product size(ml) button selector */}
                      <div className="mt-0 block mx-[5px]">
                        <div className="relative mb-[5px] min-h-[29px]">
                          <div className=" inline-flex justify-start gap-[5px] flex-wrap relative">
                            {bestSell.sizes.map((size, index) => (
                              <div
                                key={index}
                                className="best-seller-size bg-white rounded-full text-center w-auto h-auto p-[5px] cursor-pointer relative flex justify-center"
                              >
                                <span className="px-[5px] text-[#626571] text-[11px] leading-none tracking-[0.3px]">
                                  {size}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* price */}
                      <div className="mx-[5px]">
                        <div className="best-seller-price inline-flex items-center flex-wrap gap-2 text-[16px] font-semibold leading-[1.2]">
                          <p className="inline-flex flex-wrap mb-0 text-[16px] font-semibold gap-[5px]">
                            <span>{bestSell.price}</span>
                          </p>
                          <div className="best-seller-sale-container">
                            <ul>
                              <li>
                                <span className="best-seller-price-sale text-white relative m-0 rounded t-0 right-auto leading-none text-[12px] font-medium py-[3px] px-[8px] bg-[#e00000]">
                                  {bestSell.discountPercentage}%
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* rating */}
                      <div className="mt-[12px] flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <IoIosStar
                            key={index}
                            className={
                              index < bestSell.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-[#989ba2] text-xs font-normal ml-2">
                          ({bestSell.rating}.00)
                        </span>
                      </div>
                      {/* description */}
                      <div className="mt-[12px]">
                        <h3 className=" text-sm font-medium mb-3 leading-6 text-[#161925]">
                          <a
                            className="transition-all duration-200 hover:text-[#1b8057]"
                            href="#!"
                          >
                            {bestSell.description}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
