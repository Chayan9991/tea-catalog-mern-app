import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import { Products} from "../data/Product";
import TopSeller from "./TopSeller";

export const Home = () => {


  const {products, topSellingProduct} = Products(); 

  const [showProducts, setShowProducts] = useState(4); // Number of products to show
  const [currentProducts, setCurrentProducts] = useState(products.slice(0, showProducts));
  const [animationClass, setAnimationClass] = useState('');

  const handleNext = () => {
    if (showProducts < products.length) {
      setAnimationClass('slide-out-left');
      setTimeout(() => {
        setShowProducts(showProducts + 4);
        setCurrentProducts(products.slice(showProducts, showProducts + 4));
        setAnimationClass('slide-in-right');
      }, 500);
    }
  };

  const handlePrev = () => {
    if (showProducts > 4) {
      setAnimationClass('slide-out-right');
      setTimeout(() => {
        setShowProducts(showProducts - 4);
        setCurrentProducts(products.slice(showProducts - 8, showProducts - 4));
        setAnimationClass('slide-in-left');
      }, 500);
    }
  };

 
  return (
    <>
      {/*Navbar*/}

      <Navbar />
      {/*Carousel*/}
      
      <Carousel/>

      {/* Products Start */}
      <div className="container-fluid product py-5">
      <div className="container py-5">
        <div
          className="section-title text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: '500px' }}
        >
          <p className="fs-5 fw-medium fst-italic text-primary">
            Our Products
          </p>
          <h1 className="display-6">
            Tea has a complex positive effect on the body
          </h1>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {currentProducts.map((product) => (
            <div key={product.id} className={`col ${animationClass}`}>
              <div className="h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <p className="fw-medium text-muted text-center">
                    {product.name}
                    <i className="ms-1 bi bi-arrow-right"></i>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-success rounded-circle me-2"
            disabled={showProducts <= 4}
            onClick={handlePrev}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            className="btn btn-success rounded-circle"
            disabled={showProducts >= products.length}
            onClick={handleNext}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

      {/*Top Seller*/}

      <TopSeller topSellingProduct={topSellingProduct}/>
      
      {/* Contact */}
      <Contact />

      {/*Footer*/}
    </>
  );
};
