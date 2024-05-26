import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const TopSeller = ({topSellingProduct}) => {

  return (
    <>
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
            {topSellingProduct.map((product, index) => (
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

    </>
  )
}

export default TopSeller