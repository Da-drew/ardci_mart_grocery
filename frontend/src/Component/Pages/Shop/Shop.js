import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";

// Import user
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

// Import Data
import { shopData } from "./ShopData";
// import CartContext
import { useCart } from "../Cart/CartContext";

// modal
import AddingCartModal from "../../Modal/AddingCartModal";

// Icons
import { IoIosStar } from "react-icons/io";
import { BsSliders2 } from "react-icons/bs";
import { GrBasket } from "react-icons/gr";
import { IoChevronDown } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";

const fetchProduct = async (page, filters) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  let filteredProducts = shopData.filter((product) => {
    return (
      (filters.category.length === 0 ||
        filters.category.includes(product.category)) &&
      (filters.rating.length === 0 ||
        filters.rating.includes(product.rating)) &&
      (filters.saleStatus.length === 0 ||
        filters.saleStatus.includes(product.saleStatus))
    );
  });

  // Sorting based on price
  if (filters.sortByPrice === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sortByPrice === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts.slice((page - 1) * 4, page * 4);
};

const Page = () => {
  const [filters, setFilters] = useState({
    category: [],
    rating: [],
    saleStatus: [],
    sortByPrice: "default",
  });

  // user
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // cart
  const { addToCart } = useCart();

  const toggleFilter = (filterType, value) => {
    const newFilters = { ...filters };
    if (filterType === "sortByPrice") {
      newFilters[filterType] = value;
    } else {
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    }
    setFilters(newFilters);
  };

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ["query", filters],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchProduct(pageParam, filters);
        return response;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _products = data?.pages.flatMap((page) => page);

  // State to keep track of selected options and prices for each post
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});

  const handleSizeClick = (productId, size) => {
    const isSelected = selectedOptions[productId] === size;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [productId]: isSelected ? null : size,
    }));

    const product = shopData.find((product) => product.id === productId);
    if (Array.isArray(product.price)) {
      const sizeIndex = product.topOption.indexOf(size);
      const newPrice = sizeIndex !== -1 ? product.price[sizeIndex] : null;
      setSelectedPrices((prevState) => ({
        ...prevState,
        [productId]: isSelected ? null : newPrice,
      }));
    } else {
      setSelectedPrices((prevState) => ({
        ...prevState,
        [productId]: isSelected ? null : product.price,
      }));
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleAddToCart = (product) => {
    const selectedSize = selectedOptions[product.id];
    const selectedPrice = selectedPrices[product.id];

    if (!selectedSize) {
      setModalMessage("Please select a size before adding to cart.");
      setShowModal(true);
      return;
    }
    if (selectedPrice === undefined || selectedPrice === null) {
      setModalMessage("Price is not available for the selected size.");
      setShowModal(true);
      return;
    }

    if (!user) {
      // Store product information in local storage if user is not logged in
      localStorage.setItem("pendingSlug", product.slug);
      navigate("/login");
      return;
    }

    // Add product to cart if user is logged in
    const uniqueId = `${product.id}-${selectedSize}`;

    addToCart({
      uniqueId,
      id: product.id,
      slug: product.slug,
      ...product.store,
      description: product.description,
      image: product.image[0],
      price: selectedPrice,
      size: selectedSize,
      quantity: 1,
    });

    setModalMessage(`This ${product.description} has been added to cart.`);
    setShowModal(true);

    setSelectedOptions(false);
    setSelectedPrices(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === 0) return ""; // Handle null, undefined, or zero values
    const formattedPrice = Number.isInteger(price)
      ? price.toFixed(0) + ".00" // Add .00 to whole numbers
      : price.toFixed(2).replace(/\.00$/, ""); // Keep 2 decimals, remove if unnecessary

    // Add commas to the formatted price
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container mx-auto px-3 relative">
      <div className="relative">
        <div className="pt-[60px] pb-20 flex">
          <div className="relative w-1/4 pl-3 pr-5 pb-4">
            <div className="static pb-0">
              {/* category */}
              <div className="m-0 mb-6 border border-solid border-[#d7d7d7] rounded-lg shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] p-[30px]">
                {/* title */}
                <div className="mb-5">
                  <h3 className="text-[#161925] text-lg font-semibold pb-4 relative flex gap-2.5 items-center">
                    <span>
                      <BsSliders2 />
                    </span>
                    <span>Categories</span>
                  </h3>
                  <div className="line relative w-full overflow-hidden">
                    <span className="absolute left-0 bottom-0 h-1 w-10 bg-[#1b8057] rounded-full"></span>
                    <span className="absolute left-[45px] bottom-[1px] h-[1px] w-full bg-[#d7d7d7]"></span>
                  </div>
                </div>
                {/* categories select */}
                <div>
                  {Array.from(
                    new Set(shopData.map((item) => item.category))
                  ).map((category) => (
                    <div key={category} className="mb-2 flex justify-between">
                      <div>
                        <input
                          className="w-[15px] h-[15px] focus:outline-none"
                          type="checkbox"
                          id={category}
                          onChange={() => toggleFilter("category", category)}
                        />
                        <label htmlFor={category} className="ml-2">
                          {category}
                        </label>
                      </div>
                      <div>
                        <span className="ml-2 text-gray-500 text-sm leading-none">
                          (
                          {
                            shopData.filter(
                              (item) => item.category === category
                            ).length
                          }
                          )
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* rating */}
              <div className="m-0 mb-6 border border-solid border-[#d7d7d7] rounded-lg shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] p-[30px]">
                {/* title */}
                <div className="mb-5">
                  <h3 className="text-[#161925] text-lg font-semibold pb-4 relative flex gap-2.5 items-center">
                    <span>
                      <BsSliders2 />
                    </span>
                    <span>Rating</span>
                  </h3>
                  <div className="line relative w-full overflow-hidden">
                    <span className="absolute left-0 bottom-0 h-1 w-10 bg-[#1b8057] rounded-full"></span>
                    <span className="absolute left-[45px] bottom-[1px] h-[1px] w-full bg-[#d7d7d7]"></span>
                  </div>
                </div>
                <div>
                  {Array.from(new Set(shopData.map((item) => item.rating)))
                    .sort((a, b) => a - b)
                    .map((rating) => (
                      <div key={rating} className="mb-2 flex justify-between">
                        <div className="flex items-center gap-1">
                          <input
                            className="w-[15px] h-[15px] focus:outline-none"
                            type="checkbox"
                            id={rating}
                            value={rating}
                            onChange={() => toggleFilter("rating", rating)}
                          />
                          <label htmlFor={rating} className="ml-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, index) => (
                                <IoIosStar
                                  key={index}
                                  className={
                                    index < rating
                                      ? "text-yellow-400 h-[18px] w-[18px]"
                                      : "text-gray-300 h-[18px] w-[18px]"
                                  }
                                />
                              ))}
                            </div>
                          </label>
                        </div>
                        <span className="text-gray-500 text-sm font-normal">
                          ({rating})
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              {/* on sale */}
              <div className="m-0 mb-6 border border-solid border-[#d7d7d7] rounded-lg shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] p-[30px]">
                {/* title */}
                <div className="mb-5">
                  <h3 className="text-[#161925] text-lg font-semibold pb-4 relative flex gap-2.5 items-center">
                    <span>
                      <BsSliders2 />
                    </span>
                    <span>On Sale</span>
                  </h3>
                  <div className="line relative w-full overflow-hidden">
                    <span className="absolute left-0 bottom-0 h-1 w-10 bg-[#1b8057] rounded-full"></span>
                    <span className="absolute left-[45px] bottom-[1px] h-[1px] w-full bg-[#d7d7d7]"></span>
                  </div>
                </div>
                <div>
                  {Array.from(
                    new Set(shopData.map((item) => item.saleStatus))
                  ).map((saleStatus) => (
                    <div key={saleStatus} className="mb-2 flex justify-between">
                      <div>
                        <input
                          className="w-[15px] h-[15px] focus:outline-none"
                          type="checkbox"
                          id={saleStatus}
                          onChange={() =>
                            toggleFilter("saleStatus", saleStatus)
                          }
                        />
                        <label htmlFor={saleStatus} className="ml-2">
                          {saleStatus}
                        </label>
                      </div>
                      <div>
                        <span className="ml-2 text-gray-500 text-sm leading-none">
                          (
                          {
                            shopData.filter(
                              (item) => item.saleStatus === saleStatus
                            ).length
                          }
                          )
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="relative w-3/4 flex flex-col gap-6 pt-16">
            <div className="sort-price absolute right-3 top-0">
              <div className="relative">
                <select
                  className="py-[5px] pr-9 pl-[10px] rounded-md text-[14px] font-medium leading-none border border-[#d7d7d7] focus:outline-none text-[#161925c7] align-middle capitalize h-11 w-full appearance-none"
                  value={filters.sortByPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, sortByPrice: e.target.value })
                  }
                >
                  <option value="default">Sort items by price (Default)</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
                <IoChevronDown className="absolute top-[13px] right-3 pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[15px] px-3">
              {_products?.map((product, index) => (
                <div
                  key={`${product.id}-${filters.category}-${filters.rating}-${filters.saleStatus}-${filters.sortByPrice}`}
                  className="border border-[#d7d7d7] rounded-lg shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] p-4 relative"
                  ref={index === _products.length - 1 ? ref : null}
                >
                  <Link to={`/shop/${product.slug}`}>
                    <div className="absolute left-[18px] right-[18px] top-[18px] flex items-baseline justify-between text-xs leading-none z-10">
                      {/* category */}
                      <div class="flex m-0 w-full">
                        <ul class="flex justify-between items-center w-full">
                          <li class="m-0 p-0 list-none">
                            <span class="p-0 h-auto text-[12px] text-[#626571] hover:text-[#1b8057] transition-all flex font-normal justify-center leading-[3]">
                              {product.category}
                            </span>
                          </li>
                          <li>
                            {/* rating */}
                            <div className="flex gap-1 text-sm">
                              {[...Array(5)].map((_, index) => (
                                <IoIosStar
                                  key={index}
                                  className={
                                    index < product.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                              <span className="text-[#989ba2] text-xs font-medium m-0">
                                ({product.rating})
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* image */}
                    <div className="m-0 mt-[50px] mb-[7px] overflow-hidden">
                      <figure className="m-0 rounded-[5px]">
                        <a href="#!" className="block">
                          <img
                            className="h-[150px] max-h-full w-auto max-w-full mx-auto block hover:scale-110 transition-all duration-200 text-center"
                            src={product.image[0]}
                            alt={`Product ${product.id + 1}`}
                          />
                        </a>
                      </figure>
                    </div>
                  </Link>

                  <div className="main-product-details-container">
                    {/* product size(ml) button selector */}
                    <div className="mt-0 block mx-[5px]">
                      <div className="relative mb-[5px] min-h-[29px]">
                        <div className=" inline-flex justify-start gap-[5px] flex-wrap relative">
                          {product.topOption.map((size, sizeIndex) => (
                            <div
                              key={sizeIndex}
                              className={`text-[#626571] drop-shadow bg-white rounded-full text-center w-auto h-auto p-[7px] cursor-pointer relative flex justify-center transition-all hover:shadow-md ${
                                selectedOptions[product.id] === size
                                  ? "!bg-[#1b8057] !text-white"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSizeClick(
                                  product.id,
                                  size,
                                  product.price[sizeIndex]
                                )
                              }
                              style={{ userSelect: "none" }}
                            >
                              <span className="px-[5px] text-xs font-semibold leading-none tracking-[0.3px]">
                                {size}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* price */}
                    <div className="mx-[3px] my-[5px]">
                      <div className="best-seller-price inline-flex items-center flex-wrap gap-2 text-[16px] font-semibold leading-[1.2] relative">
                        <p className="inline-flex flex-wrap mb-0 font-semibold gap-[5px]">
                          {product.discountPrice === null ? (
                            <>
                              {selectedPrices[product.id] !== null &&
                              selectedPrices[product.id] !== undefined ? (
                                <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                  {formatPrice(selectedPrices[product.id])}
                                </span>
                              ) : Array.isArray(product.price) &&
                                product.price.length > 1 ? (
                                <>
                                  {selectedOptions[product.id] ? (
                                    <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                      {formatPrice(selectedPrices[product.id])}
                                    </span>
                                  ) : (
                                    <>
                                      <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                        {formatPrice(
                                          Math.min(...product.price)
                                        )}
                                      </span>
                                      <span className="text-sm text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                        {" - "}
                                      </span>
                                      <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                        {formatPrice(
                                          Math.max(...product.price)
                                        )}
                                      </span>
                                    </>
                                  )}
                                </>
                              ) : (
                                // price of direct price sample id 1
                                <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <ins className="text-[#161925d8] hover:text-[#161925] transition-all no-underline pr-1">
                                {/* price id 4 sample */}
                                <span className="text-base font-bold">
                                  {formatPrice(
                                    selectedPrices[product.id] !== null &&
                                      selectedPrices[product.id] !== undefined
                                      ? selectedPrices[product.id]
                                      : Array.isArray(product.price)
                                      ? Math.min(...product.price)
                                      : product.price
                                  )}
                                </span>
                                {Array.isArray(product.price) &&
                                  product.price.length > 1 &&
                                  !selectedOptions[product.id] && (
                                    <>
                                      <span className="text-[14px] text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                        {" - "}
                                      </span>
                                      <span className="text-base text-[#161925d8] hover:text-[#161925] transition-all font-bold">
                                        {formatPrice(
                                          Math.max(...product.price)
                                        )}
                                      </span>
                                    </>
                                  )}
                              </ins>
                              <del className="text-[14px] font-normal text-[#626571] flex flex-col justify-center">
                                <span>
                                  {formatPrice(product.discountPrice)}
                                </span>
                              </del>
                            </>
                          )}
                        </p>
                        {/* discount price */}
                        <div className="best-seller-sale-container absolute top-0 -right-14">
                          <ul>
                            <li>
                              {product.discount && (
                                <span className="best-seller-price-sale text-white relative m-0 rounded t-0 right-auto leading-none text-[11px] font-medium py-[1px] px-[8px] bg-[#e00000]">
                                  {product.discount}%
                                </span>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <h3 className=" text-sm font-medium mb-3 leading-6 text-[#161925]">
                      <Link
                        to={`/shop/${product.slug}`}
                        className="line-clamp-2 transition-all duration-200 hover:text-[#1b8057]"
                      >
                        {product.description}
                      </Link>
                    </h3>
                    {/* button */}
                    <ul className="mt-[12px] flex justify-between items-center">
                      <li>
                        <div>
                          <button
                            className="flex items-center justify-center gap-[10px] rounded-full py-[15px] px-[18px] h-auto text-[#1b8057] bg-[#f3f9f5] text-sm font-medium leading-none z-20 overflow-hidden relative cursor-pointer hover:text-white hover:bg-[#1b8057] hover:drop-shadow-none transition-all drop-shadow"
                            onClick={() => handleAddToCart(product)}
                          >
                            <span>
                              <GrBasket />
                            </span>
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </li>
                      <li>
                        <span>
                          <button className=" text-pink-300 text-lg transition-all hover:scale-110 hover:text-pink-500">
                            <FaHeartCirclePlus />
                          </button>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {isFetchingNextPage && (
              <div className="text-center text-gray-500">Loading more...</div>
            )}
            {_products && _products.length === 0 && (
              <div className="text-center text-gray-500">Nothing to show.</div>
            )}
            {!isFetchingNextPage && _products && _products.length > 0 && (
              <div className="text-center text-gray-500">
                Nothing more to load.
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <AddingCartModal message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default Page;
