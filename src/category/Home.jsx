import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Carousel from "./Carousel";

export const Home = () => {

  const products = [
    {
      id: 1,
      name: "Green Tea",
      image: "images/product-1.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 2,
      name: "Black Tea",
      image: "images/product-2.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 3,
      name: "Spiced Tea",
      image: "images/product-3.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 4,
      name: "Organic Tea",
      image: "images/product-4.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 5,
      name: "Herbal Tea",
      image: "images/about-1.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 6,
      name: "Fruit Tea",
      image: "images/about-2.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 7,
      name: "Chai Tea",
      image: "images/about-3.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 8,
      name: "Matcha Tea",
      image: "images/about-4.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
  ];

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

  const topSeller = [
    {
      id: 1,
      name: "Nature close tea",
      image: "images/store-product-1.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
    {
      id: 2,
      name: "Green tea tulsi",
      image: "images/store-product-2.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
    {
      id: 3,
      name: "Instant tea premix",
      image: "images/store-product-3.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
  ];



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
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="section-title text-center mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <p className="fs-5 fw-medium fst-italic text-primary">
              Best Seller
            </p>
            <h1 className="display-6">
              Want the best tea? Choose from our Top Selling Products
            </h1>
          </div>
          <div className="row g-4">
            {topSeller.map((product, index) => (
              <div
                className="col-lg-4 col-md-6"
                key={product.id}
                data-wow-delay={`${0.1 * (index + 1)}s`}
              >
                <div className="store-item position-relative text-center">
                  <img
                    className="img-fluid"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <div className="text-center mb-3">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                    <h4 className="mb-3">{product.name}</h4>
                    <p>{product.description}</p>
                    <h4 className="text-primary">{product.price}</h4>
                  </div>
                  <div className="store-overlay">
                    <a
                      href="#"
                      className="btn btn-primary rounded-pill py-2 px-4 m-2"
                    >
                      More Detail <i className="fa fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 text-center" data-wow-delay="0.1s">
              <Link
                to="/products"
                className="btn btn-primary rounded-pill py-3 px-5"
              >
                View More Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <Contact />

      {/*Footer*/}
    </>
  );
};
