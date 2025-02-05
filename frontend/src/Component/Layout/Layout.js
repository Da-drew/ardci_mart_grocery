// src/Component/Layout/Layout.js
import React from "react";
import Header from "../Header/Header";
import HeaderBottom from "../HeaderBottom/HeaderBottom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import FloatingCart from "../FloatingCart/FloatingCart";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import ScrollToTop from "../ScrollTop/ScrollToTop";

const Layout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <HeaderBottom />
      <Breadcrumbs />
      <FloatingCart />
      <main>{children}</main>
      <BackToTop />
      <Footer />
    </>
  );
};

export default Layout;
