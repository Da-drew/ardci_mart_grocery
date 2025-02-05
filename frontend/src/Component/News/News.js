import React from "react";
import "./News.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

// data
import { newsPost } from "./NewsPost";

// icon
import { MdOutlineCalendarToday } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";

const News = () => {
  return (
    // delete the height after adding proper content
    <div className="bg-[#f7f7f7] w-full">
      <div className="container mx-auto relative">
        <div className=" py-10 relative">
          <div className="flex flex-col px-3 w-full gap-4">
            {/* title */}
            <div className="news-title m-0 -mt-2 ">
              <div className="relative">
                <h2 className=" text-[26px] font-semibold leading-[1.4] flex items-center gap-2 flex-wrap relative mb-[10px]">
                  News & Updates
                  <span className="flex items-center flex-1 gap-[6px] mt-3px text=[#1b8057]">
                    <span className="relative w-10 h-1 bg-[#1b8057] rounded-full"></span>
                    <span className="w-[89%] relative h-[1px] bg-[#d7d7d7]"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* post */}
            <div className="max-w-full h-full relative">
              <Swiper
                slidesPerView={3}
                spaceBetween={24}
                loop={false}
                navigation={{
                  prevEl: ".news-swiper-prev",
                  nextEl: ".news-swiper-next",
                }}
                modules={[Navigation]}
              >
                {newsPost.map((news) => (
                  <SwiperSlide key={news.id}>
                    <div className="relative p-[10px] bg-white rounded-lg transition-all duration-200 ease-in-out shadow-hover">
                      {/* image */}
                      <div className="relative overflow-hidden rounded-md text-center">
                        <a href="#!" className="text-center">
                          <img
                            className="w-full h-[330px] max-h-full object-cover scale-[1.001] transition-all duration-200 ease-out hover:scale-105"
                            src={news.image}
                            alt={`News ${news.id}`}
                          />
                        </a>
                      </div>
                      {/* content */}
                      <div className="p-6 ">
                        {/* tags */}
                        <div className="mb-[15px]">
                          {news.tags &&
                            news.tags.map((tag, index) => (
                              <>
                                <a
                                  href="#!"
                                  className="bg-[#f7f7f7] text-[#1b8057] mb-[5px] py-1 px-3 rounded-full font-normal text-sm leading-[1.4] inline-block mr-2 transition-all duration-200 ease-in-out hover:text-white hover:bg-[#1b8057]"
                                  key={index}
                                >
                                  {tag}
                                </a>
                              </>
                            ))}
                        </div>
                        {/* title */}
                        <h3 className=" text-xl leading-[1.4] mb-4 font-semibold">
                          <a
                            href="#!"
                            className="text-[#161925] transition-all duration-300 ease-in-out hover:text-[#1b8057]"
                          >
                            {news.title}
                          </a>
                        </h3>
                        {/* post excerpt */}
                        <div className="mb-[15px]">
                          <p className="line-clamp-2 mb-6 text-[#54595FBC] leading-8 text-justify">
                            {news.details}
                          </p>
                        </div>
                        {/* bottom date and see more */}
                        <ul className="flex flex-wrap justify-between gap-3 leading-[1.5]">
                          <li className="mr-0 text-sm leading-none tracking-[0.2px] flex justify-center items-center gap-1 text-[#54595f] font-medium">
                            <span className=" opacity-55">
                              <MdOutlineCalendarToday />
                            </span>
                            {news.postedDate}
                          </li>
                          <li className="mr-0 text-sm leading-none tracking-[0.2px]">
                            <a
                              href="#!"
                              className="flex justify-center items-center gap-1 text-[13px] text-[#0000ee] hover:text-[#0000EEC6] active:text-[#551a8b] hover:underline transition-all duration-200 ease-in-out"
                            >
                              See More{" "}
                              <span>
                                <BsChevronRight />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="news-swiper-navi-con absolute right-0 -top-[42px]">
                <div className="news-swiper-next swiper-button-next absolute !right-0 hover:text-white hover:bg-[#1b8057]"></div>
                <div className="news-swiper-prev swiper-button-prev absolute !-left-[75px] hover:text-white hover:bg-[#1b8057]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
