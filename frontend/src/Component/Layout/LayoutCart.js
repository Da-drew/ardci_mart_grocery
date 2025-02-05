import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";

const LayoutCart = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BackToTop />
      <Footer />
    </>
  );
};

export default LayoutCart;
