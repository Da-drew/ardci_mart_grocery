import React from "react";
import "./FeatureCenter.css";
import { featureCenter } from "../Data/FeaturedData";

import { GoHeart } from "react-icons/go";
import { BsBasket2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

const FeatureCenter = () => {
  return (
    <div className="flex-1 max-w-full">
      {featureCenter.map((product, index) => (
        <div key={index} className="mx-auto feature-center-sizing">
          <div className="feature-center-sub-con">
            <div className="m-0 mb-[7px] flex box-border">
              <ul className="list-none m-0 p-0 inline-flex items-center flex-wrap gap-[10px]">
                <li className=" list-none">
                  <a
                    href="#!"
                    className="p-0 pt-[7px] border-none rounded-none h-auto text-xs text-[#626571] flex items-center font-normal justify-center leading-none"
                  >
                    {product.category}
                  </a>
                </li>
              </ul>
            </div>

            <div className="h-auto absolute right-[18px] top-[18px] z-10">
              <ul className="flex flex-wrap gap-[7px] justify-start h-full flex-col">
                <li>
                  <a
                    href="#!"
                    className="feature-small-navi bg-white text-[#b0b2b8] text-[19px] h-8 w-8 leading-none transition-all duration-[0.21s] ease-in-out inline-flex justify-center items-center p-2 rounded-[6px]"
                  >
                    <GoHeart />
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="feature-small-navi bg-white text-[#b0b2b8] text-[16px] h-8 w-8 leading-none transition-all duration-[0.21s] ease-in-out inline-flex justify-center items-center p-2 rounded-[5px]"
                  >
                    <BsBasket2 />
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="feature-small-navi bg-white text-[#b0b2b8] text-[16px] h-8 w-8 leading-none transition-all duration-[0.21s] ease-in-out inline-flex justify-center items-center p-2 rounded-[5px]"
                  >
                    <FiSearch />
                  </a>
                </li>
              </ul>
            </div>

            <div className=" my-[30px] mx-0 overflow-hidden relative">
              <figure className="m-0 rounded-[5px] overflow-hidden text-center w-full relative">
                <a
                  href="#!"
                  className="block text-center relative transition-all"
                >
                  <img
                    className="feature-center-img transition-all duration-[0.25s]"
                    src={product.image}
                    alt={`Product ${index + 1}`}
                  />
                </a>
              </figure>
            </div>

            {/* Product Details */}
            <div className="box-border transition-all ">
              {/* flavor */}
              <div className="relative mb-[5px] min-h-[29px]">
                <div className="inline-flex justify-start gap-[5px] flex-wrap relative">
                  <div className="bg-white rounded-full text-center w-auto h-auto p-[5px] cursor-pointer relative flex justify-center flavor-shadow">
                    <span className="px-[5px] text-[#626571] text-[11px] leading-none tracking-[0.3px]">
                      {product.flavor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="my-[5px] transition-all">
              <div className="inline-flex items-center flex-wrap gap-2 text-base font-semibold leading-[1.2]">
                <p className=" text-[16px] font-semibold gap-[5px] inline-flex flex-wrap mb-0 gap-y-1.5">
                  <del className="text-[14px] font-normal text-[#626571] order-2 flex flex-col justify-center">
                    <span>{product.priceDiscount}</span>
                  </del>
                  <ins className="text-[16px] font-semibold leading-[1.2] no-underline">
                    <span>{product.priceOrig}</span>
                  </ins>
                </p>
                <div className=" text-[16px] font-semibold">
                  <ul className="m-0 p-0 list-none flex flex-wrap gap-[10px] items-center">
                    <li className="m-0 p-0 list-none">
                      <span className="polygon text-white relative m-0 rounded top-0 right-auto h-[18px] text-[12px] font-medium py-[3px] px-[8px] bg-[#e00000]">
                        {product.discount}%
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
                    index < product.rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
              <span className="text-[#989ba2] text-xs font-normal ml-2">
                ({product.rating}.00)
              </span>
            </div>

            {/* description */}
            <div className="mt-[12px]">
              <h3 className=" text-sm font-medium mb-3 leading-6 text-[#161925]">
                <a
                  href="#!"
                  className="transition-all duration-200 hover:text-[#1b8057]"
                >
                  {product.description}
                </a>
              </h3>
            </div>
            {/* end */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCenter;
