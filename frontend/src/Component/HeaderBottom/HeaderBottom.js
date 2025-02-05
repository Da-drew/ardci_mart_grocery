import React, { useState, useEffect, useContext } from "react";
import "./HeaderBottom.css";
import { useCart } from "../Pages/Cart/CartContext";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext/UserContext";

import { FaFacebookF, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SlGlobe } from "react-icons/sl";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { SlArrowDown } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { TbHeartPlus } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

import logo from "../Assets/mart-log.png";
import beverages from "../Assets/beverages.png";
import meat from "../Assets/meat.png";
import fruit from "../Assets/fruits.png";
import juice from "../Assets/juice.png";
import vegetable from "../Assets/vegetables.png";
import toys from "../Assets/toys.png";
import dessert from "../Assets/dessert.png";

const HeaderBottom = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // cart
  const { cartItems } = useCart();
  const [showCartToolkit, setShowCartToolkit] = useState(false);
  const [showWishlistToolkit, setShowWishlistToolkit] = useState(false);

  // sidebarclose effect
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // overlay effect
  const [sideOverlayOpen, setSideOverlayOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
    setSideOverlayOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);

    setTimeout(() => {
      setSideOverlayOpen(false);
    }, 580);
  };

  // cart
  const totalItems = cartItems.length;

  // sidenav
  const [sideshowCartToolkit, sidesetShowCartToolkit] = useState(false);
  const [sideshowWishlistToolkit, sidesetShowWishlistToolkit] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  // sidebar search
  const [showsideDropdownCat, setShowSideDropdownCat] = useState(false);
  const toogleSideDropdownCat = () => {
    setShowSideDropdownCat(!showsideDropdownCat);
  };

  const [sideSelectedCategory, setSideSelectedCategory] =
    useState("All Categories");
  const handleSideCategoryClick = (sidecategory) => {
    setSideSelectedCategory(sidecategory);
    setShowSideDropdownCat(false);
  };

  // date
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObj.getDate()).slice(-2);
      return `${month}.${day}.${year}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  // Access user context
  const { user } = useContext(UserContext);

  return (
    <div className="bg-[#1b8057]">
      <div className="container mx-auto">
        {/* overlay of sidebar when open*/}
        <div
          className={`sidebar-overlay ${sideOverlayOpen ? "open" : ""}`}
        ></div>

        <div className="header-bottom-container px-[18px] pb-[20px] m-[0px] text-white flex gap-[30px] justify-between items-center w-[100%]">
          <div className="all-categories relative">
            <div className="all-categories-btn bg-[white] font-[600] inline-flex items-center gap-[15px] text-[#161925]">
              <HiOutlineMenuAlt2 className="icon-menu-btn text-[25px] font-[600]" />
              All Categories
              <SlArrowDown className="icon-menu-btn text-[23px] pl-[9px]" />
            </div>

            <div class="dropdown-container-cat">
              <ul>
                <li class="">
                  <img width="22" height="22" src={beverages} class="" alt="" />
                  <a href="#!">Beverage</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={dessert} class="" alt="" />
                  <a href="#!">Desserts</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={juice} class="" alt="" />
                  <a href="#!">Drinks Juice</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={meat} class="" alt="" />
                  <a href="#!">Fish Meats</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={fruit} class="" alt="" />
                  <a href="#!">Fresh Fruits</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={vegetable} class="" alt="" />
                  <a href="#!">Vegetables</a>
                </li>

                <li class="">
                  <img width="22" height="22" src={toys} class="" alt="" />
                  <a href="#!">Toys</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="search-contain grow">
            <form>
              <div>
                <ul className="flex m-0 p-0 items-center">
                  <li className="search-categories-btn">
                    <div className="dropdown-search relative">
                      <input type="hidden" name="product_cat" value="" />
                      <div className="block">
                        <button
                          type="button"
                          className="all-category-search-btn px-[25px] text-[14px] relative flex justify-center items-center gap-[10px]"
                          onClick={toggleDropdown}
                        >
                          <span>{selectedCategory}</span>
                          <span>
                            <SlArrowDown />
                          </span>
                        </button>
                        {showDropdown && (
                          <ul className="dropdown-cat-search absolute left-0 mt-2 bg-white rounded text-[#161925] p-[20px]">
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() =>
                                handleCategoryClick("All Categories")
                              }
                            >
                              All Categories
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() => handleCategoryClick("Beverage")}
                            >
                              <span>Beverage</span>
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() => handleCategoryClick("Dessert")}
                            >
                              <span>Desserts</span>
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() =>
                                handleCategoryClick("Drinks Juice")
                              }
                            >
                              <span>Drinks Juice</span>
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() => handleCategoryClick("Fish Meats")}
                            >
                              <span>Fish Meats</span>
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() =>
                                handleCategoryClick("Fresh Fruits")
                              }
                            >
                              <span>Fresh Fruits</span>
                            </li>
                            <li
                              className="text-[14px] mb-[19px] leading-none cursor-pointer relative text-[#161925]"
                              onClick={() => handleCategoryClick("Vegetables")}
                            >
                              <span>Vegetables</span>
                            </li>
                            <li
                              className="text-[14px] mb-0 leading-none cursor-pointer relative text-[#161925]"
                              onClick={() => handleCategoryClick("Toys")}
                            >
                              <span>Toys</span>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                  <li className="search-input-textbox grow">
                    <div className="search-product-container relative">
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Type Your Products . . ."
                      />
                      <div className="right-search-btn">
                        <input type="hidden" value="product" />
                        <button>
                          Search <FiSearch className="text-[17px]" />{" "}
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>

          <div class="header-account relative mr-[20px]">
            {/* User Profile */}
            {user ? (
              <div className="user-profile">
                <Link to="/profile">
                  <div className="flex items-center gap-2 text-white">
                    {user.avatar ? (
                      <div className="account-anchor flex items-center gap-3 text-[#f7f7f7]">
                        <div className="user-icon-container bg-white !h-9 !w-9 !border-none">
                          <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-full h-full rounded-full border-2 "
                          />
                        </div>
                        <span className="font-medium">{user.full_name}</span>
                      </div>
                    ) : (
                      <>
                        <span className="account-anchor flex items-center gap-[7px] text-[#f7f7f7]">
                          <div className="user-icon-container">
                            <BiUser className="user-icon flex items-center justify-center" />
                          </div>
                          Accounts
                        </span>
                      </>
                    )}
                    <span>{user.name}</span>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <a
                  href="#!"
                  className="account-anchor flex items-center gap-[7px] text-[#f7f7f7]"
                >
                  <div className="user-icon-container">
                    <BiUser className="user-icon flex items-center justify-center" />
                  </div>
                  Accounts
                </a>
              </Link>
            )}
          </div>

          <div className="header-order-icons relative flex items-center gap-[20px]">
            <div className="header-cart-icon relative">
              <Link
                to={"/shop/cart"}
                href="#!"
                className="text-[20px] leading-none"
                onMouseEnter={() => setShowCartToolkit(true)}
                onMouseLeave={() => setShowCartToolkit(false)}
              >
                <BsCart2 className="text-[25px] leading-none" />
                <span className="icons-span flex items-center justify-center w-[20px] h-[20px]">
                  {totalItems}
                </span>
                {showCartToolkit && (
                  <span className="tooltip-bottom">Cart</span>
                )}
              </Link>
            </div>

            <div className="header-wishlist-icon relative">
              <a
                href="#!"
                className="text-[20px] leading-none"
                onMouseEnter={() => setShowWishlistToolkit(true)}
                onMouseLeave={() => setShowWishlistToolkit(false)}
              >
                <TbHeartPlus className="text-[25px] leading-none" />
                <span className="icons-span flex items-center justify-center w-[20px] h-[20px]">
                  0
                </span>
                {showWishlistToolkit && (
                  <span className="tooltip-bottom">Wishlist</span>
                )}
              </a>
            </div>

            <div className="header-sidebar-icon relative">
              <div className={`sidenav ${sidebarOpen ? "open" : ""}`}>
                <div className="sidenav-header-container">
                  <div className="sidenav-header-icon">
                    <a
                      href="#!"
                      className="close-btn-side"
                      onClick={closeSidebar}
                    >
                      <FaTimes />
                    </a>
                    <div className="header-cart-icon relative">
                      <a
                        href="#!"
                        className="text-[20px] leading-none"
                        onMouseEnter={() => sidesetShowCartToolkit(true)}
                        onMouseLeave={() => sidesetShowCartToolkit(false)}
                      >
                        <BsCart2 className="text-[25px] leading-none" />
                        <span className="icons-span flex items-center justify-center w-[20px] h-[20px]">
                          0
                        </span>
                        {sideshowCartToolkit && (
                          <span className="tooltip-bottom">Cart</span>
                        )}
                      </a>
                    </div>

                    <div className="header-wishlist-icon relative">
                      <a
                        href="#!"
                        className="text-[20px] leading-none"
                        onMouseEnter={() => sidesetShowWishlistToolkit(true)}
                        onMouseLeave={() => sidesetShowWishlistToolkit(false)}
                      >
                        <TbHeartPlus className="text-[25px] leading-none" />
                        <span className="icons-span flex items-center justify-center w-[20px] h-[20px]">
                          0
                        </span>
                        {sideshowWishlistToolkit && (
                          <span className="tooltip-bottom">Wishlist</span>
                        )}
                      </a>
                    </div>

                    <div className="side-user relative">
                      <a href="#!">
                        <BiUser className="text-[25px]" />
                      </a>
                    </div>

                    <div className="side-search relative">
                      <a href="#!">
                        <FiSearch className="text-[20px]" />
                      </a>
                    </div>
                  </div>

                  <div className="sidenav-logo flex-col text-center gap-[15px] h-[auto]">
                    <a href="#!">
                      <img src={logo} className="sidebar-img-logo" alt="" />
                    </a>
                  </div>

                  <div class="sidenav-social flex flex-col text-center gap-[22px] leading-none">
                    <span className="inline-block text-[20px] text-center">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="#!"
                        className="relative text-white"
                      >
                        <FaFacebookF />
                      </a>
                    </span>
                    <span className="inline-block text-[20px] text-center">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="#!"
                        className="relative text-white"
                      >
                        <FaEnvelope />
                      </a>
                    </span>
                    <span className="inline-block text-[20px] text-center">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="#!"
                        className="relative text-white"
                      >
                        <SlGlobe />
                      </a>
                    </span>
                    <span className="inline-block text-[20px] text-center">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="#!"
                        className="relative text-white"
                      >
                        <FaMapMarkerAlt />
                      </a>
                    </span>
                  </div>
                </div>

                {/* working content of sidebar */}
                <div className="sidebar-content flex flex-col justify-between">
                  <div className="search-box-sidebar">
                    <form>
                      <div>
                        <ul className="flex items-center">
                          <li className="li-side-dropdown">
                            <div className="searchbar-dropdown relative">
                              <input
                                type="hidden"
                                name="sidebar-product-category"
                                value={""}
                              />
                              <div className="relative">
                                <button
                                  onClick={toogleSideDropdownCat}
                                  type="button"
                                  className="side-cat-btn flex justify-around items-center"
                                >
                                  <span className="category-label text-[#212529]">
                                    {sideSelectedCategory}
                                  </span>
                                  <span className="text-[11px]">
                                    <SlArrowDown />
                                  </span>
                                </button>
                                {showsideDropdownCat && (
                                  <ul className="sidebar-drop-menu absolute text-[1rem] top-[20px] pt-[25px] rounded-[6px]block">
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick(
                                          "All Categories"
                                        )
                                      }
                                    >
                                      All Categories
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Beverage")
                                      }
                                    >
                                      Beverage
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Dessert")
                                      }
                                    >
                                      Dessert
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Drinks Juice")
                                      }
                                    >
                                      Drinks Juice
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Fish Meats")
                                      }
                                    >
                                      Fish Meats
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Fresh Fruits")
                                      }
                                    >
                                      Fresh Fruits
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Vegetables")
                                      }
                                    >
                                      Vegetables
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleSideCategoryClick("Toys")
                                      }
                                    >
                                      Toys
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </li>
                          <li className="grow-1">
                            <div className="relative">
                              <input
                                type="text"
                                autoComplete="off"
                                name="s"
                                placeholder="Type Your Products ..."
                                className="side-input-search"
                              />

                              <div className="absolute right-[3px] top-[50%] translate-y-[-50%]">
                                <input
                                  type="hidden"
                                  name="post_type"
                                  value="product"
                                  className="leading-none"
                                />
                                <button className="side-search-btn">
                                  <FiSearch />
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>

                  <div className="mb-[1.5em]">
                    <div>
                      <ul className="nav-sidebar pt-[15px]">
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            Home{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            Shop{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            Categories{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            News{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            FAQ{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="!#" target="_blank" rel="noreferrer">
                            Contact{" "}
                            <span className="text-[18px] text-[#16131961]">
                              <MdOpenInNew />
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidenav-address text-[#626571] flex flex-col">
                    <span>{currentDate}</span>
                    <span className="leading-[2]">
                      Ardci Business Center, Moonwalk Road, Calatagan Proper,
                      Virac, Catanduanes
                    </span>
                    <span>
                      <a
                        href="#!"
                        className="transition-all hover:text-[#1b8057]"
                      >
                        ardicmart@gmail.com
                      </a>
                    </span>
                    <span>
                      <a
                        href="#!"
                        className="transition-all hover:text-[#1b8057]"
                      >
                        +63912-345-6789
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={openSidebar}>
                <span class="menu-btn" id="menuBtn">
                  <span class="menu-btn-icon">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
