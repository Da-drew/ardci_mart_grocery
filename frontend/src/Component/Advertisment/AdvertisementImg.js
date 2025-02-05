import React from "react";
import advertisementLong from "../Assets/advertisement-long.jpg";

const AdvertisementImg = () => {
  return (
    <div className="container px-3 mx-auto">
      <div className="pt-[25px] pb-[40px]">
        <img
          className="w-full"
          src={advertisementLong}
          alt="banner-advertisment"
        />
      </div>
    </div>
  );
};

export default AdvertisementImg;
