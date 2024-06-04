import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { CategoryProductContext } from "../context/CategoryProductContext";

const AllProducts = () => {
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { products } = useContext(CategoryProductContext);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search term or sort option change
  }, [searchTerm, sortOption]);

  const handleSort = (a, b) => {
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
  };

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort(handleSort);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mt-3">
      <div className="single-category">
        <h2 className=" text-center mb-4">All Products</h2>
        <div className="controls mb-4 d-flex justify-content-end">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control w-25 me-2"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select w-auto"
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="bestSelling">Best Selling</option>
          </select>
        </div>

        <div className="container">
          <div className="row g-4">
            {currentItems.length === 0 ? (
              <p className="text-center text-muted">*Product Not Found :(</p>
            ) : (
              currentItems.map((item) => (
                <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <CategoryCard item={item} />
                </div>
              ))
            )}
          </div>
        </div>

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].map((number) => (
              <li
                key={number + 1}
                className={`page-item ${currentPage === number + 1 ? "active" : ""}`}
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
      </div>
    </div>
  );
};

export default AllProducts;
