import React, { useEffect, useRef, useState } from 'react';

const Carousel = () => {
  

  return (
    <div className="container-fluid px-0 mb-5">
      <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src="images/carousel-1.jpg" alt="Image" />
            <div className="carousel-caption ">
              <div className="container">
                <div className="row justify-content-center ">
                  <div className="col-lg-7 text-center ">
                    <p className="fs-4 text-white carousel-text">Welcome to <strong className="text-dark carousel-text">TEA House</strong></p>
                    <h1 className="text-dark mb-4 carousel-text">Organic & Quality Tea Production</h1>
                    <a href="/" className="btn btn-light rounded-pill py-3 px-5 carousel-text-link">Explore More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="w-100" src="images/carousel-2.jpg" alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-center ">
                  <div className="col-lg-7 text-center">
                    <p className="fs-4 text-white carousel-text">Welcome to <strong className="text-dark carousel-text">TEA House</strong></p>
                    <h1 className="text-dark mb-4 carousel-text">Organic & Quality Tea Production</h1>
                    <a href="/" className="btn btn-light rounded-pill py-3 px-5 carousel-text-link">Explore More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
