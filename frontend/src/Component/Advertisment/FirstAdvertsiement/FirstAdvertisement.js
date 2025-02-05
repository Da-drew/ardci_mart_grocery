import React from "react";
import "./FirstAdvertisement.css";

// array import
import { firstAdvertise } from "../AdvertisementData/AdvertisementData";

const FirstAdvertisement = () => {
  return (
    <div className="flex container mx-auto pt-[25px] pb-[40px]">
      {firstAdvertise.map((item, index) => (
        <div key={item.id} className="flex flex-1 w-full">
          <div className="relative text-right">
            <div className="py-0 px-[12px] text-right">
              <div className="relative overflow-hidden rounded-lg advertisement-one-box">
                {/* image cover */}
                <span className="ad-one-image-box">
                  <img
                    className=" min-h-[250px] w-full object-cover h-auto max-w-full border-none rounded-none transition-all"
                    src={item.image}
                    alt={`Product ${index + 1}`}
                  />
                </span>
                {/* content here */}
                <div
                  className={` absolute top-[30px] left-0 right-0 z-[2] pt-0 px-10 ${
                    item.id > 1 ? "text-left text-white" : "text-[#161925]"
                  }`}
                >
                  <h2
                    className={` signika-font font-bold  mb-[5px] leading-[1.1] ${
                      item.id === 3
                        ? "text-[24px] underline"
                        : "text-[30px] no-underline"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  ></h2>
                  <div className="font-semibold text-sm leading-[1.3] tracking-[0.2px] mb-[24px]">
                    {item.subname && <>{item.subname}</>}
                  </div>
                  <div className="text-[26px] font-bold mb-[20px]">
                    <span className="block text-sm leading-none mb-[2px] font-bold">
                      Only
                    </span>
                    {item.price}
                  </div>
                  {/* button */}
                  <div
                    className={`${item.id > 1 ? "text-left" : "text-right"}`}
                  >
                    <a
                      href="#!"
                      className="bg-white text-[#161925] relative text-[15px] leading-none font-medium tracking-[0.5px] rounded-full inline-flex justify-center items-center py-[17px] px-[36px] overflow-hidden text-right transition-all hover:bg-[#F8C519]"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FirstAdvertisement;
