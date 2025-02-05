import React, { useState, useEffect } from "react";
import logo from "../Assets/mart-log.png";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { FaFacebookF, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";
import { MdOutlineCallMade } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      return year;
    };

    setCurrentDate(getCurrentDate());
  }, []);
  return (
    <div className="w-full relative z-50">
      <div className="w-full bg-[#161925]">
        <div className="relative container px-3 pb-20 py-8 mx-auto border-b border-[#2a2f41]">
          <div className="flex gap-4">
            {/* first column */}
            <div className="flex-1 flex flex-col gap-5 items-start p-2 overflow-hidden text-[#b0b2b8]">
              {/* ardci logo */}
              <div className="logo">
                <figure>
                  <a href="#!">
                    <img
                      className="m-w-full w-[250px] opacity-80 transition-all ease-in-out duration-200 hover:opacity-100 hover:scale-105"
                      src={logo}
                      alt="martLogo"
                    />
                  </a>
                </figure>
              </div>
              <div className="details flex mt-4 flex-col gap-6">
                <h2 className="flex items-center gap-3">
                  <FiMapPin className=" w-7 h-7 mr-2" />
                  <span className="leading-7 text-sm">
                    ARDCI MART, Mooonwalk Road, Calatagan Proper, Virac,
                    Catanduanes
                  </span>
                </h2>
                <h3 className="flex items-center gap-3">
                  <FiPhoneCall className=" w-5 h-5 mr-2" />
                  <span>
                    <a className="text-sm" href="#!">
                      +63912-345-6789
                    </a>
                  </span>
                </h3>
              </div>
              {/* reserve for map */}
            </div>
            {/* second column */}
            <div className="flex-1 flex flex-col items-start p-2 overflow-hidden text-[#b0b2b8]">
              <h2 className="font-semibold mb-5 text-2xl text-white">
                Quick Links
              </h2>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Third column */}
            <div className="flex-1 flex flex-col items-start p-2 overflow-hidden text-[#b0b2b8]">
              <h2 className="font-semibold mb-5 text-2xl text-white">
                Privacy Policy
              </h2>
              <ul className="inline-flex flex-col gap-4">
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Returns & Exchange
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Payment Terms
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Pick Up Terms
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Payment & Pricing
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a
                    className="transition-all duration-200 ease-in-out hover:underline"
                    href="#!"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* fourth column */}
            <div className="flex-1 flex flex-col gap-10 items-start p-2 overflow-hidden text-[#b0b2b8]">
              <div className="social">
                <h2 className="font-semibold mb-5 text-2xl text-white">
                  Social
                </h2>
                <ul className="inline-flex gap-3">
                  <li>
                    <a
                      href="#!"
                      className="transition-all ease-out duration-200 hover:text-white"
                    >
                      <FaFacebookF className="w-8 h-8 p-2 rounded-full bg-[#b0b2b8] text-[#161925] transition-all ease-in-out duration-200 hover:bg-white hover:p-2.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="transition-all ease-out duration-200 hover:text-white"
                    >
                      <FaEnvelope className="w-8 h-8 p-2 rounded-full bg-[#b0b2b8] text-[#161925] transition-all ease-in-out duration-200 hover:bg-white hover:p-2.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="transition-all ease-out duration-200 hover:text-white"
                    >
                      <SlGlobe className="w-8 h-8 p-2 rounded-full bg-[#b0b2b8] text-[#161925] transition-all ease-in-out duration-200 hover:bg-white hover:p-2.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="transition-all ease-out duration-200 hover:text-white"
                    >
                      <FaMapMarkerAlt className="w-8 h-8 p-2 rounded-full bg-[#b0b2b8] text-[#161925] transition-all ease-in-out duration-200 hover:bg-white hover:p-2.5" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="signup flex flex-col items-start gap-3">
                <h2 className="font-semibold mt-7 text-2xl text-white">
                  Sign Up
                </h2>
                <div className="flex text-[#161925]">
                  <div className="flex-1 p-2 rounded-l-md bg-white">
                    <input className="focus:outline-none" type="email" />
                  </div>
                  <button className="flex-1 bg-[#f8c519] px-4 rounded-r-md">
                    <MdOutlineCallMade className="h-5 w-5 hover:cursor-pointer hover:scale-110 transition-all ease-in-out duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full p-5 bg-[#1e212d] text-[#b0b2b8] container mx-auto">
          <span>
            <FaRegCopyright className="mr-1 w-3 h-3" />
          </span>
          <span> {currentDate}. All Rights Resevered by ARDCI Mart</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
