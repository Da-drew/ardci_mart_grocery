import React from "react";
// import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { GrBasket } from "react-icons/gr";
import { Link } from "react-router-dom";

const RecommendedProducts = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div className="recommended-products pt-5 bg-gray-100 pb-16">
      <h2 className="text-xl font-semibold mb-4 pl-4">You May Also Like</h2>
      <div className="grid grid-cols-4 gap-[15px] px-6">
        {products.map((product) => (
          <Link to={`/shop/${product.slug}`} key={product.id}>
            <div
              key={product.id}
              className="border border-[#d7d7d7] rounded-lg shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] p-4 relative bg-white"
            >
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

              <div className="main-product-details-container">
                {/* product size(ml) button selector */}
                <div className="mt-0 block mx-[5px]">
                  <div className="relative mb-[5px] min-h-[29px]">
                    <div className=" inline-flex justify-start gap-[5px] flex-wrap relative">
                      {product.topOption.map((size, sizeIndex) => (
                        <div
                          key={sizeIndex}
                          className="text-[#626571] shadow bg-white rounded-full text-center w-auto h-auto p-[5px] relative flex justify-center"
                        >
                          <span className="px-[5px] text-[11px] leading-none tracking-[0.3px]">
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
                    <p className="inline-flex flex-wrap mb-0 text-[14px] font-semibold gap-[5px]">
                      {product.discountPrice === null ? (
                        <>
                          {Array.isArray(product.price) ? (
                            <>
                              <span className="text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                ₱{product.price[0]}.00
                              </span>
                              {product.price.length > 1 && (
                                <>
                                  <span className="text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                    {" "}
                                    -{" "}
                                  </span>
                                  <span className="text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                    ₱{product.price[1]}.00
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <span className="text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                              ₱{product.price}.00
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <del className="font-normal text-[#626571] order-2 flex flex-col justify-center">
                            <span>₱{product.discountPrice}.00</span>
                          </del>
                          <ins className="text-[#161925d8] hover:text-[#161925] transition-all font-semibold no-underline pr-2">
                            <span>
                              ₱
                              {Array.isArray(product.price)
                                ? product.price[0]
                                : product.price}
                              .00
                            </span>
                          </ins>
                        </>
                      )}
                    </p>
                    <div className="best-seller-sale-container absolute top-[-3px] right-[-50px]">
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
                  <a
                    className="line-clamp-2 transition-all duration-200 hover:text-[#1b8057]"
                    href="#!"
                  >
                    {product.description}
                  </a>
                </h3>
                {/* button */}
                <div>
                  <button className="flex items-center justify-center gap-[10px] rounded-full py-[15px] px-[18px] h-auto text-[#1b8057] bg-[#f3f9f5] text-sm font-medium leading-none z-20 overflow-hidden relative cursor-pointer hover:text-white hover:bg-[#1b8057] transition-all duration-300 w-full">
                    <span>
                      <GrBasket />
                    </span>
                    <span>View Product</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
