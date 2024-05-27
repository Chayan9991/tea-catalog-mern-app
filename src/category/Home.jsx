import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import { Products } from "../data/Product";
import TopSeller from "./TopSeller";
import ProductCategory from "./ProductCategory";
import Footer from "./Footer";

export const Home = () => {
  const { productCategory, topSellingProduct } = Products();

  return (
    <>
      <Carousel />

      <ProductCategory productCategory={productCategory}/>
    
      <TopSeller topSellingProduct={topSellingProduct} />

      <Contact />

      <Footer/>

    </>
  );
};
