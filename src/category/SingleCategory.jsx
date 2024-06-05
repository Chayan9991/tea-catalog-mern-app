import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";

const SingleCategory = () => {
  const { products, loading, categories} = useContext(CategoryProductContext);

  const { categoryId } = useParams();
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filterAndSortProducts = () => {
    return products
      .filter((item) => item.categoryId === categoryId)
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortOption) {
          case "priceLowToHigh":
            return a.price - b.price;
          case "priceHighToLow":
            return b.price - a.price;
          case "bestSelling":
            return b.bestSelling - a.bestSelling;
          default:
            return 0;
        }
      });
  };

  const paginateProducts = (data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number + 1}
              className={`page-item ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              <span
                className="page-link"
                onClick={() => {
                  setCurrentPage(number + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {number + 1}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const filteredProducts = filterAndSortProducts();
  const currentItems = paginateProducts(filteredProducts);

  return (
    <div className="container mt-3">
      <div className="single-category">
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="text-uppercase" style={{ fontSize: "1.5em" }}>
              {categories.find((category) => category._id === categoryId)?.name}
            </p>
          </div>
          <div className="col-12 col-md-6">
            <div className="controls d-flex justify-content-center justify-content-md-end">
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control flex-grow-1 me-2"
                style={{ maxWidth: '350px' }}
              />
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="form-select w-auto"
              >
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="bestSelling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-4 justify-content-center">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center w-100"
                style={{ minHeight: "200px" }}
              >
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : currentItems.length === 0 ? (
              <p className="text-center text-muted">*Product Not Found :(</p>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                >
                  <CategoryCard item={item} />
                </div>
              ))
            )}
          </div>
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default SingleCategory;
