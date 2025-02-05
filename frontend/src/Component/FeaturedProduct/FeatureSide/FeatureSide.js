import React from "react";
import "./FeatureSide.css";

import { GoHeart } from "react-icons/go";
import { BsBasket2 } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";

const FeatureSide = ({
  index,
  id,
  image,
  category,
  priceMin,
  priceMax,
  discount,
  description,
  rating,
}) => {
  return (
    <div key={id} className="flex flex-col">
      <div className="max-w-full">
        <div className="mb-[15px] relative w-full transition-all">
          {/* image */}
          <div className="parent-hover pt-[18px] pr-[15px] pl-[10px] pb-[20px] flex gap-3 relative bg-white border border-solid border-[#d7d7d7] rounded-lg h-full transition-all duration-[0.21s] ease-in-out hover">
            <div className="product-img w-[125px] mb-0 overflow-hidden">
              <figure className="rounded-[5px] overflow-hidden text-center w-full">
                <a href="#!" className="text-center flex justify-center">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="featured-img w-[100px] h-[100px] transition-all duration-200"
                  />
                </a>
              </figure>
            </div>
            {/* content */}
            <div className="flex-1">
              {/* caegory */}
              <div className="prod-desc flex items-baseline justify-between text-[12px]">
                <div className="flex box-border">
                  <ul className="m-0 p-0 items-center inline-flex wrap gap-[10px]">
                    <li>
                      <a
                        href="#!"
                        className="p-0 pt-[7px] text-[#626571] text-[12px]"
                      >
                        {category}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="absolute right-[12px] top-[12px] z-10 text-[12px]">
                  <ul className="flex flex-wrap flex-col h-full items-end justify-start gap-[5px]">
                    <li>
                      <a
                        href="#!"
                        className="feature-small-navi bg-white text-[#b0b2b8] text-[16px] h-8 w-8 leading-none transition-all duration-[0.21s] ease-in-out inline-flex justify-center items-center p-2 rounded-[5px]"
                      >
                        <GoHeart />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        className="feature-small-navi bg-white text-[#b0b2b8] text-[16px] h-8 w-8 leading-none transition-all duration-[0.5s] ease-in-out inline-flex justify-center items-center p-2 rounded-[5px] opacity-0 child-hover"
                      >
                        <BsBasket2 />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* price */}
              <div className="my-[5px] transition-all duration-[.21s] ease-in-out">
                <div className="inline-flex items-center flex-wrap gap-2 text-base font-semibold leading-[1.2] text-[#111]">
                  <p className="text-base font-semibold gap-[5px] items-center inline-flex flex-wrap mb-0">
                    <span>{priceMin}</span>
                    {priceMax && (
                      <>
                        {" - "} <span>{priceMax}</span>
                      </>
                    )}
                  </p>
                  <div>
                    <ul className="flex items-center flex-wrap p-0">
                      <li>
                        <span className="best-seller-price-sale text-white relative m-0 rounded-[4px] top-0 right-auto h-[18px] leading-none text-[12px] font-medium py-[3px] px-[8px] bg-[#e00000]">
                          {discount}%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* description */}
              <div>
                <h3 className="text-[14px] font-semibold mb-[12px] leading-[1.5] text-[#161925] transition-all duration-[.21s] ease-in-out ">
                  <a
                    href="#!"
                    className="line-clamp-2 transition-all duration-200 hover:text-[#1b8057]"
                  >
                    {description}
                  </a>
                </h3>
              </div>
              {/* rating */}
              <div className="my-[5px] flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <IoIosStar
                    key={index}
                    className={
                      index < rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-[#989ba2] text-xs font-normal ml-2">
                  ({rating}.00)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSide;
