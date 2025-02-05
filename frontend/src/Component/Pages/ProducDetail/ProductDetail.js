import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shopData } from "../Shop/ShopData";
import ProductImageSlider from "../../ProductImageSlider/ProductImageSlider";
import { IoIosStar } from "react-icons/io";
import QuantityInput from "./QuantityInput";
import RecommendedProducts from "./RecommendedProducts";
import ProductInfo from "./ProductInfo";
import AddingCartModal from "../../Modal/AddingCartModal";
import { useCart } from "../Cart/CartContext";

// Import User
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { BsCartPlus } from "react-icons/bs";

const getRecommendedProducts = (currentProduct, productArray, limit = 15) => {
  const recommended = productArray.filter(
    (product) =>
      product.category === currentProduct.category &&
      product.id !== currentProduct.id
  );
  return recommended.slice(0, limit);
};

const ProductDetail = () => {
  const { slug } = useParams();
  const product = shopData.find((item) => item.slug === slug);
  const { addToCart } = useCart();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // user
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleAddToCart = () => {
    const selectedSize = selectedOptions[product.id];
    const selectedPrice = selectedPrices[product.id];

    if (!selectedSize) {
      setModalMessage("Please select a size before adding to cart.");
      setIsModalOpen(true);
      return;
    }

    if (selectedPrice === undefined || selectedPrice === null) {
      setModalMessage("Price is not available for the selected size.");
      setIsModalOpen(true);
      return;
    }

    if (!user) {
      localStorage.setItem("pendingSlug", product.slug);
      navigate("/login");
      return;
    }

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
      quantity: quantity,
    });

    setModalMessage(`This ${product.description} has been added to cart.`);
    setIsModalOpen(true);

    setSelectedOptions(false);
    setSelectedPrices(false);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.image;
  const recommendedProducts = getRecommendedProducts(product, shopData);

  const handleSizeClick = (postId, size) => {
    const isSelected = selectedOptions[postId] === size;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [postId]: isSelected ? null : size,
    }));

    const post = shopData.find((post) => post.id === postId);
    if (Array.isArray(post.price)) {
      const sizeIndex = post.topOption.indexOf(size);
      const newPrice = sizeIndex !== -1 ? post.price[sizeIndex] : null;
      setSelectedPrices((prevState) => ({
        ...prevState,
        [postId]: isSelected ? null : newPrice,
      }));
    } else {
      setSelectedPrices((prevState) => ({
        ...prevState,
        [postId]: isSelected ? null : post.price,
      }));
    }
  };
  const formatPrice = (price) => {
    if (price === null || price === undefined) return "";

    // Format price with commas and .00 for whole numbers
    const formattedPrice = Number(price).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `₱${formattedPrice}`;
  };

  return (
    <div className="w-full py-6 bg-[whitesmoke]">
      <div className="container mx-auto w-[75%] bg-white rounded-sm">
        <div className="product-detail">
          <div className="flex w-full px-5 border border-[#eaeaea] rounded-sm">
            <div className="w-1/2">
              <ProductImageSlider images={images} />
            </div>
            <div className="w-1/2 py-10 px-2 pl-10">
              <span className="text-sm italic opacity-85 flex justify-end font-normal mb-8">
                {product.category}
              </span>
              <h1 className="font-semibold text-2xl text-[#1b8057] hover:text-[#116b47] transition-all cursor-pointer my-4 leading-10 pr-4">
                {product.description}
              </h1>
              <div className="flex items-center gap-1.5 mb-3">
                {[...Array(5)].map((_, index) => (
                  <IoIosStar
                    key={index}
                    className={
                      index < product.rating
                        ? "text-yellow-400 h-[20px] w-[20px]"
                        : "text-gray-300 h-[20px] w-[20px]"
                    }
                  />
                ))}
                <span className="text-[#989ba2] text-sm font-medium m-0">
                  ({product.rating})
                </span>
              </div>
              <span className="border-b-2 border-[#f0f0f0] w-full h-1 my-5 mx-0 block"></span>
              <p className="bg-gray-50 py-4 px-2">
                <div className="relative w-max flex">
                  {product.discountPrice === null ? (
                    <>
                      {selectedPrices[product.id] !== null &&
                      selectedPrices[product.id] !== undefined ? (
                        <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                          {formatPrice(selectedPrices[product.id])}
                        </span>
                      ) : Array.isArray(product.price) &&
                        product.price.length > 1 ? (
                        <>
                          {selectedOptions[product.id] ? (
                            <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                              {formatPrice(selectedPrices[product.id])}
                            </span>
                          ) : (
                            <>
                              <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                {formatPrice(Math.min(...product.price))}
                              </span>
                              <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                -
                              </span>
                              <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                {formatPrice(Math.max(...product.price))}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <del className="text-lg font-normal text-[#626571] order-2 flex flex-col justify-center">
                        <span>{formatPrice(product.discountPrice)}</span>
                      </del>
                      <ins className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold no-underline pr-2">
                        <span>
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
                              <span className="text-2xl text-[#161925d8] hover:text-[#161925] transition-all font-semibold">
                                -
                              </span>
                              <span>
                                {formatPrice(Math.max(...product.price))}
                              </span>
                            </>
                          )}
                      </ins>
                    </>
                  )}
                  <div className="best-seller-sale-container absolute top-[6px] -right-14">
                    <ul>
                      <li>
                        {product.discount && (
                          <span className="best-seller-price-sale text-white relative m-0 rounded right-auto flex text-xs font-medium py-0.5 px-2 bg-[#e00000]">
                            {product.discount}%
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </p>

              <div className="flex justify-center items-center gap-3 p-4 pt-8 border rounded-md w-auto min-w-56 max-w-max my-6 relative">
                <span className="m-0 text-xs absolute top-1.5 left-2">
                  Option/s:
                </span>
                <p className="flex gap-4">
                  {product.topOption.map((size, sizeIndex) => (
                    <div
                      key={sizeIndex}
                      className={`text-[#626571] shadow-md bg-white rounded-md text-center w-auto h-auto p-[5px] cursor-pointer relative flex justify-center transition-all hover:shadow-sm hover:bg-gray-100 ${
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
                      <span className="px-3 py-2 text-sm leading-none tracking-[0.3px]">
                        {size}
                      </span>
                    </div>
                  ))}
                </p>
              </div>
              <div className="mt-5 flex gap-3 items-center">
                <span className="font-normal text-base pr-2">Quantity:</span>
                <QuantityInput quantity={quantity} onChange={setQuantity} />
              </div>
              <div className="mt-5">
                <span className="font-normal text-base pr-2">
                  Shipping Option:
                </span>
                <span className="text-sm italic text-red-400">
                  Currently we offer store pickup
                </span>
              </div>
              <div className="flex gap-5 mt-10">
                <button
                  className="bg-[#1d9e6a] text-white py-3 w-56 rounded-md transition-all hover:bg-[#1b8057] flex gap-2 justify-center items-center"
                  onClick={handleAddToCart}
                >
                  <BsCartPlus size={25} />
                  Add To Cart
                </button>
                <button className="bg-blue-500 text-white py-3 w-56 rounded-md transition-all hover:bg-blue-700">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-10 bg-[whitesmoke]"></div>
          <div className="p-6 bg-white border border-[#eaeaea] rounded-md">
            {/* <h3 className="text-lg font-semibold mb-4">Store Information</h3> */}
            <div className="flex gap-8">
              <img
                src={product.store.profile}
                alt="profile"
                className="w-20 h-20 rounded-full shadow-[1px_1px_3px_0px_#00000033]"
              />
              <p className="text-sm flex flex-col gap-2">
                <div>
                  <strong>Store Name:</strong> {product.store.name}
                </div>
                <div>
                  <strong>Location:</strong> {product.store.location}
                </div>
                <div>
                  <strong>Contact:</strong> {product.store.contact}
                </div>
              </p>
            </div>
          </div>
          {product.productInfo && (
            <>
              <div className="w-full h-10 bg-[whitesmoke]"></div>
              <ProductInfo details={product.productInfo} />
            </>
          )}
          <div className="w-full h-8 bg-[whitesmoke]"></div>
          <RecommendedProducts products={recommendedProducts} />
        </div>
        {isModalOpen && (
          <AddingCartModal message={modalMessage} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
