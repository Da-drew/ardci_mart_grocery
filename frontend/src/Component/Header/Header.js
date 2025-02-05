import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

import logo from "../Assets/mart-log.png";
import { LuPhoneCall } from "react-icons/lu";
import { FaFacebookF, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";

const Header = () => {
  const [showFacebookTooltip, setShowFacebookTooltip] = useState(false);
  const [showMailTooltip, setShowMailTooltip] = useState(false);
  const [showWebsiteTooltip, setShowWebsiteTooltip] = useState(false);
  const [showLocationTooltip, setShowLocationTooltip] = useState(false);

  return (
    <div className="header-header sticky top-[0] z-[100] bg-[#1b8057]">
      <div className="header-main-container px-[21px] py-[20px] m-[0px]">
        <div className="header-sub-container container mx-auto flex justify-between items-center w-[100%]">
          <div className="logo">
            {/* logo */}
            <img src={logo} alt="" className="w-[250px]" />
          </div>

          <div className="navigation-container">
            {/* Navigation */}
            <div className="navigation">
              <nav>
                <ul className="flex gap-[36px] text-white">
                  <li>
                    <NavLink to="/" exact className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop" className="nav-link">
                      Shop
                    </NavLink>
                  </li>
                  <li>
                    <a href="#!" className="nav-link">
                      Categories
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="nav-link">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="nav-link">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="hotline-social-container flex items-center gap-[30px]">
            {/* hotline and social */}
            <div className="hotline-container flex justify-center items-center gap-[10px] text-white">
              <div className="text-[22px]">
                <LuPhoneCall />
              </div>

              <div className="hotline-text text-[16px] font-[600] leading-[1.4]">
                <span className="block text-[13px] font-[500]">
                  Hotline Number
                </span>
                <a className="number-hotline" href="#!">
                  +63912-345-6789
                </a>
              </div>
            </div>

            <div className="social-container">
              <ul className="flex flex-wrap items-center gap-[15px]">
                <li>
                  <a
                    href="https://www.facebook.com/ardcimartvirac"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setShowFacebookTooltip(true)}
                    onMouseLeave={() => setShowFacebookTooltip(false)}
                  >
                    <FaFacebookF />
                    {showFacebookTooltip && (
                      <span className="tooltip">Facebook</span>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ardcicenter@gmail.com"
                    onMouseEnter={() => setShowMailTooltip(true)}
                    onMouseLeave={() => setShowMailTooltip(false)}
                  >
                    <FaEnvelope />
                    {showMailTooltip && <span className="tooltip">Email</span>}
                  </a>
                </li>
                <li>
                  <a
                    href="https://ardcicenter.com/"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setShowWebsiteTooltip(true)}
                    onMouseLeave={() => setShowWebsiteTooltip(false)}
                  >
                    <SlGlobe />
                    {showWebsiteTooltip && (
                      <span className="tooltip">Website</span>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/place/ARDCIMart+Inc./@13.5850599,124.2185822,17z/data=!3m1!4b1!4m6!3m5!1s0x33a017c0cd2ef359:0xd8765b853ba17d47!8m2!3d13.5850547!4d124.2211625!16s%2Fg%2F11s4w43g37?entry=ttu"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setShowLocationTooltip(true)}
                    onMouseLeave={() => setShowLocationTooltip(false)}
                  >
                    <FaMapMarkerAlt />
                    {showLocationTooltip && (
                      <span className="tooltip">Location</span>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
