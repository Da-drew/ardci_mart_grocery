import React, { useState } from "react";
import "./PopularProduct.css";
import SideBanner from "../Assets/popular-banner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

// Import Data
import { dessert, vegetables, freshFruits } from "./PopularProductsData";

// icons
import { GoHeart } from "react-icons/go";
import { GrBasket } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

const PopularProduct = () => {
  // category shows in slider
  const [products, setProducts] = useState(dessert);
  // category in span button
  const [currentCategory, setCurrentCategory] = useState("Desserts");

  const handleCategoryChange = (category) => {
    switch (category) {
      case "desserts":
        setProducts(dessert);
        setCurrentCategory("Desserts");
        break;
      case "vegetables":
        setProducts(vegetables);
        setCurrentCategory("Vegetables");
        break;
      case "fruits":
        setProducts(freshFruits);
        setCurrentCategory("Fresh Fruits");
        break;
      default:
        setProducts(dessert);
        setCurrentCategory("Desserts");
    }
  };

  // get how many are in array element display in span buttons
  const getItemCount = (category) => {
    switch (category) {
      case "Desserts":
        return dessert.length;
      case "Vegetables":
        return vegetables.length;
      case "Fresh Fruits":
        return freshFruits.length;
      default:
        return dessert.length;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-5">
        {/* header */}
        <div className="header-popular ralative max-w-full mt-[-6px] px-3">
          <h2 className=" text-[26px] flex items-center gap-2 flex-wrap relative mb-[10px] leading-[1.4] font-semibold">
            Popular Products
            <span className="flex items-center flex-1 gap-[6px] mt-[3px] text-[#1b8057] leading-[1.4]">
              <span className="relative w-10 h-1 bg-[#1b8057] rounded-[30px] "></span>
              <span className="w-[62%] relative h-[1px] bg-[#d7d7d7]"></span>
            </span>
          </h2>
        </div>
        {/* content */}
        <div className="flex flex-col">
          <div className="flex">
            {/* banner image */}
            <div className="w-[18%] flex flex-col flex-shrink ps-3 pe-[15px]">
              <div className="h-full relative">
                <img
                  className="w-full h-[418px] rounded-lg max-w-full border-none"
                  src={SideBanner}
                  alt="Banner"
                />
              </div>
            </div>
            {/* slider */}
            <div className="flex flex-col flex-shrink w-[82%]">
              {/* navigation and button */}
              <div className="flex justify-end flex-wrap z-10">
                <div className="m-0 mt-[-64px] mr-[100px]">
                  <span
                    onClick={() => handleCategoryChange("desserts")}
                    // className="text-[#1b8057] bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px]"
                    className={`bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px] ${
                      currentCategory === "Desserts"
                        ? "text-[#1b8057]"
                        : "text-[#161925]"
                    }`}
                  >
                    Desserts{" "}
                    <span className="ml-[3px]">
                      ({getItemCount("Desserts")})
                    </span>
                  </span>
                  <span
                    onClick={() => handleCategoryChange("fruits")}
                    // className="text-[#161925] bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px]"
                    className={`bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px] ${
                      currentCategory === "Fresh Fruits"
                        ? "text-[#1b8057]"
                        : "text-[#161925]"
                    }`}
                  >
                    Fresh Fruits{" "}
                    <span className="ml-[3px]">
                      ({getItemCount("Fresh Fruits")})
                    </span>{" "}
                  </span>
                  <span
                    onClick={() => handleCategoryChange("vegetables")}
                    // className="text-[#161925] bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px]"
                    className={`bg-[#02010100] text-[14px] border-none p-0 inline-flex items-center justify-center cursor-pointer font-semibold mx-[5px] ${
                      currentCategory === "Vegetables"
                        ? "text-[#1b8057]"
                        : "text-[#161925]"
                    }`}
                  >
                    Vegetables{" "}
                    <span className="ml-[3px]">
                      ({getItemCount("Vegetables")})
                    </span>
                  </span>
                </div>
              </div>

              {/* slider */}
              <div className="pr-3 relative">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  loop={false}
                  navigation={{
                    prevEl: ".popular-swiper-prev",
                    nextEl: ".popular-swiper-next",
                  }}
                  modules={[Navigation]}
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div className=" min-h-[400px] flex flex-col justify-between relative bg-white border border-solid border-[#d7d7d7] rounded-lg py-[18px] px-[24px] h-full transition-all">
                        <div className="absolute left-[18px] right-[18px] top-[18px] flex items-baseline justify-between text-[12px] z-10">
                          {/* category */}
                          <div class="flex m-0 ">
                            <ul class="inline-flex items-center flex-wrap gap-[10px]">
                              <li class="m-0 p-0 list-none">
                                <a
                                  class="p-0 h-auto text-[12px] text-[#626571] hover:text-[#1b8057] transition-all flex font-normal justify-center leading-[3]"
                                  href="#!"
                                  rel="tag"
                                >
                                  {product.category}
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* icons */}
                          <ul className="flex flex-col items-center flex-wrap gap-[5px]">
                            <li>
                              <a
                                href="#!"
                                className="text-[#b0b2b8] bg-white rounded-[6px] text-[18px] leading-none h-8 w-8 p-2 transition-all duration-300 inline-flex items-center justify-center hover:shadow-md hover:text-[#888c9a] hover:scale-105"
                              >
                                <GoHeart />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                className="text-[#b0b2b8] bg-white rounded-[6px] text-[18px] leading-none h-8 w-8 p-2 transition-all duration-300 inline-flex items-center justify-center hover:shadow-md hover:text-[#888c9a] hover:scale-105"
                              >
                                <GrBasket />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                className="text-[#b0b2b8] bg-white rounded-[6px] text-[18px] leading-none h-8 w-8 p-2 transition-all duration-300 inline-flex items-center justify-center hover:shadow-md hover:text-[#888c9a] hover:scale-105"
                              >
                                <FiSearch />
                              </a>
                            </li>
                          </ul>
                        </div>
                        {/* image */}
                        <div className="m-0 mt-[30px] mb-[7px] overflow-hidden">
                          <figure className="m-0 rounded-[5px]">
                            <a href="#!" className="block">
                              <img
                                className="h-[150px] max-h-full w-auto max-w-full mx-auto block hover:scale-110 transition-all duration-200 text-center"
                                src={product.image}
                                alt={`Product ${index + 1}`}
                              />
                            </a>
                          </figure>
                        </div>

                        <div className="main-product-details-container">
                          {/* product size(ml) button selector */}
                          <div className="mt-0 block mx-[5px]">
                            <div className="relative mb-[5px] min-h-[29px]">
                              <div className=" inline-flex justify-start gap-[5px] flex-wrap relative">
                                {product.topOption.map((size, index) => (
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
                          <div className="mx-[3px] my-[5px]">
                            <div className="best-seller-price inline-flex items-center flex-wrap gap-2 text-[16px] font-semibold leading-[1.2] relative">
                              <p className="inline-flex flex-wrap mb-0 text-[14px] font-semibold gap-[5px]">
                                {product.discountPrice === null ? (
                                  <>
                                    <span>{product.price[0]}</span> -{" "}
                                    <span>{product.price[1]}</span>{" "}
                                  </>
                                ) : (
                                  <>
                                    <del className="text-[14px] font-normal text-[#626571] order-2 flex flex-col justify-center">
                                      <span>{product.discountPrice}</span>
                                    </del>
                                    <ins className="text-[15px] font-semibold leading-[1.2] no-underline">
                                      <span>{product.price}</span>
                                    </ins>
                                  </>
                                )}
                              </p>
                              <div className="best-seller-sale-container absolute top-[-3px] right-[-50px]">
                                <ul>
                                  <li>
                                    {product.discount && (
                                      <>
                                        <span className="best-seller-price-sale text-white relative m-0 rounded t-0 right-auto leading-none text-[11px] font-medium py-[1px] px-[8px] bg-[#e00000]">
                                          {" "}
                                          {product.discount}%
                                        </span>
                                      </>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* description */}
                          <h3 className=" text-sm font-medium mb-3 leading-6 text-[#161925]">
                            <a
                              className="line-clamp-2 transition-all duration-200 hover:text-[#1b8057]"
                              href="#!"
                            >
                              {product.description}
                            </a>
                          </h3>
                          {/* rating */}
                          <div className="mt-[12px] flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <IoIosStar
                                key={index}
                                className={
                                  index < product.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-[#989ba2] text-xs font-normal ml-2">
                              ({product.rating}.00)
                            </span>
                          </div>
                          {/* button */}
                          <ul className="mt-[12px]">
                            <li>
                              <div>
                                <a
                                  href="#!"
                                  className="flex items-center justify-center gap-[10px] rounded-full py-[15px] px-[18px] h-auto text-[#1b8057] bg-[#f3f9f5] text-sm font-medium leading-none z-20 overflow-hidden relative cursor-pointer hover:text-white hover:bg-[#1b8057] transition-all duration-300"
                                >
                                  <span>
                                    <GrBasket />
                                  </span>
                                  <span>Select Options</span>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                        {/* end */}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="popular-swiper-navi-con absolute right-2 -top-11">
                  <div className="popular-swiper-next swiper-button-next absolute !right-0 hover:text-white hover:bg-[#1b8057]"></div>
                  <div className="popular-swiper-prev swiper-button-prev absolute !-left-[75px] hover:text-white hover:bg-[#1b8057]"></div>
                </div>
              </div>

              {/* end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
