import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
import { NextArrow, PrevArrow } from "./CustomArrows";

const ProductImageSlider = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const thumbnailHeight = 80;
  const thumbnailsToShow = 4;
  const mainSliderHeight = thumbnailHeight * thumbnailsToShow;

  // Update activeSlide when the main slider changes
  const handleBeforeChange = (_, newIndex) => {
    setActiveSlide(newIndex);
  };

  const thumbnailSliderSettings = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: Math.min(images.length, thumbnailsToShow),
    swipeToSlide: true,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    infinite: images.length > thumbnailsToShow,
  };

  const mainSliderSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    arrows: true,
    nextArrow: <NextArrow />, // Use custom next arrow
    prevArrow: <PrevArrow />, // Use custom previous arrow
    beforeChange: handleBeforeChange, // Update activeSlide here
  };

  // Synchronize the thumbnail slider's active state
  useEffect(() => {
    if (nav2) {
      nav2.slickGoTo(activeSlide);
    }
  }, [activeSlide, nav2]);

  return (
    <div className="container mx-auto p-5 flex">
      {images.length > 1 ? (
        <>
          <div className="thumbnail-slider mr-5 w-1/5">
            <Slider {...thumbnailSliderSettings}>
              {images.map((image, index) => (
                <div key={index} className="p-3">
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className={classNames(
                      "object-contain w-full h-full cursor-pointer p-2 shadow-sm hover:shadow-md transition-all duration-300 rounded-sm",
                      {
                        "bg-[#358bd1]": activeSlide === index,
                      }
                    )}
                    style={{ height: thumbnailHeight }}
                    onClick={() => {
                      if (nav1) {
                        nav1.slickGoTo(index);
                      }
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="main-slider w-4/5 relative">
            <Slider {...mainSliderSettings}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-full overflow-hidden mx-auto !flex justify-center items-center bg-white outline-none"
                  style={{ height: mainSliderHeight }}
                >
                  <img
                    src={image}
                    alt={`Product ${index}`}
                    className="object-cover w-full h-full rounded-lg mx-auto my-auto p-12"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <div className="w-full overflow-hidden mx-auto !flex justify-center items-center bg-white outline-none">
          <img
            src={images[0]}
            alt="Product"
            className="object-cover w-full h-full rounded-lg mx-auto my-auto p-12"
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageSlider;
