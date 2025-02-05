import React from "react";
// animation
import Marquee from "react-fast-marquee";
// icon
import { FaAsterisk } from "react-icons/fa";
// data
import { annoucementData } from "../AdvertisementData/AdvertisementData";

const AdvertisementOffers = () => {
  return (
    <div className="w-full relative">
      <div className="p-3 pt-5 bg-white">
        <Marquee speed={100} pauseOnHover>
          {annoucementData.map((list) => (
            <h3
              key={list.id}
              className="inline-flex items-center font-normal text-[17px] leading-[1.6] relative mb-0 text-[#161925]"
            >
              <span className="text-[#1b8057] px-[25px]">
                <FaAsterisk />
              </span>
              <a
                href="#!"
                className="transition-all duration-200 ease-in-out hover:text-[#1b8057]"
              >
                {list.annouce}
              </a>
            </h3>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AdvertisementOffers;
