import React from "react";
// import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <BsChevronRight
        size={24}
        className="text-black opacity-10 hover:opacity-75 transition-all"
      />
    </div>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <BsChevronLeft
        size={24}
        className="text-black opacity-10 hover:opacity-75 transition-all"
      />
    </div>
  );
};
