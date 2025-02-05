import React from "react";
import BestSelling from "./BestSelling/BestSelling";
import FeatureSide from "./FeatureSide/FeatureSide.js";
import FeatureCenter from "./FeatureCenter/FeatureCenter.js";

// icons
import { FaChevronRight } from "react-icons/fa6";

// import arrays
import { featureLeft } from "./Data/FeaturedData.js";
import { featureRight } from "./Data/FeaturedData.js";

const FeaturedProduct = () => {
  return (
    <div className="featured-product-main-container container flex justify-center items-center w-full mx-auto">
      <div className="featured-product-sub-container flex flex-grow justify-center items-stretch w-full pt-10">
        {/* Best Seller SideBar */}
        <BestSelling />

        {/* Featured Products */}
        <div className="featured-content w-[75%] flex flex-col px-[12px]">
          <div className="max-w-full gap-5 relative flex flex-col">
            {/* Title */}
            <div className="flex items-center flex-wrap gap-3 justify-between">
              <h2 className="text-[26px] flex flex-wrap items-center gap-2 flex-1 mb-[10px] relative leading-[1.4] font-semibold">
                Featured Products
                <span className="flex items-center flex-1 gap-[6px] mt-[3px] text-[#1b8057]">
                  <span className="relative w-[40px] h-1 bg-[#1b8057] rounded-[30px]"></span>
                  <span className="relative w-full h-[1px] bg-[#d7d7d7]"></span>
                </span>
              </h2>
              <div className="mb-[12px]">
                <a
                  href="#!"
                  className="border border-[#d7d7d7] rounded-[4px] py-[6px] px-3 text-[#626571] text-sm font-medium flex items-center justify-center gap-2 leading-[1.4] hover:bg-[#1b8057] hover:text-white transition-all duration-[0.25s]"
                >
                  See More
                  <FaChevronRight className="h-4" />
                </a>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-nowrap gap-[20px]">
              {/* left elements */}
              <div className="flex flex-col flex-1 w-full p-0 h-full">
                {featureLeft.map((item, index) => (
                  <FeatureSide
                    key={index}
                    index={index}
                    id={item.id}
                    image={item.image}
                    category={item.category}
                    priceMin={item.priceMin}
                    priceMax={item.priceMax}
                    discount={item.discount}
                    description={item.description}
                    rating={item.rating}
                  />
                ))}
              </div>
              {/* Center Big */}
              <FeatureCenter />
              {/* Right Element */}
              <div className="flex flex-col flex-1 w-full p-0 h-full">
                {featureRight.map((item, index) => (
                  <FeatureSide
                    key={index}
                    index={index}
                    id={item.id}
                    image={item.image}
                    category={item.category}
                    priceMin={item.priceMin}
                    priceMax={item.priceMax}
                    discount={item.discount}
                    description={item.description}
                    rating={item.rating}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
