import React from "react";
// import Header from "../Header/Header";
// import HeaderBottom from "../HeaderBottom/HeaderBottom";
import Banner from "../../Banner/Banner";
import BannerSlider from "../../BannerBottomSlider/BannerSlider";
import FeaturedProduct from "../../FeaturedProduct/FeaturedProduct";
import FirstAdvertisement from "../../Advertisment/FirstAdvertsiement/FirstAdvertisement";
import PopularProduct from "../../PopularProduct/PopularProduct";
import AdvertisementImg from "../../Advertisment/AdvertisementImg";
import News from "../../News/News";
import AdvertisementOffers from "../../Advertisment/AdvertismentOffers/AdvertisementOffers";

const Home = () => {
  return (
    <div>
      <Banner />
      <BannerSlider />
      <FeaturedProduct />
      <FirstAdvertisement />
      <PopularProduct />
      <AdvertisementImg />
      <News />
      <AdvertisementOffers />
    </div>
  );
};

export default Home;
