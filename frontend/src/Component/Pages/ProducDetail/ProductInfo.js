import React from "react";

const ProductInfo = ({ details }) => {
  if (!details || details.length === 0) {
    return <div></div>;
  }

  return (
    <div className="mt-4 w-11/12 pl-10 py-8 pt-5">
      <h3 className="font-semibold text-lg mb-2">Product Information:</h3>
      <ul className="list-disc ml-5">
        {details.map((detail, index) => (
          <li key={index} className="mb-3 leading-8 text-justify text-[15px]">
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInfo;
