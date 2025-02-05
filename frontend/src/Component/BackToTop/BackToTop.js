import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBackToTop = () => {
    scrollToTop();
    window.history.pushState({}, "", "/"); // Navigate to the root route
  };

  return (
    <div className="z-20">
      {isVisible && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-16 -right-10 z-[101] bg-[#1b8057] text-white py-2.5 px-3.5 text-sm font-light leading-none rounded-md rotate-90 hover:bg-[#27976a] focus:outline-none flex items-center gap-2 transition-all ease-in-out duration-200"
        >
          <FaArrowLeft /> Back To Top
        </button>
      )}
    </div>
  );
};

export default BackToTop;
