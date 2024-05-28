import React, { useEffect } from "react";
import { useParams, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { Products } from "../data/Product";

const AllProducts = () => {
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(()=>{
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  const {allProductData} =  Products(); 

  
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

  const filteredData = allProductData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort(handleSort);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
      <div className="single-category">
        <p className="heading text-center">All Products</p>
        <div className="controls mt-1 text-end pe-md-4 pe-lg-4">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
            className="search-input me-md-2"
          />
          <select
            value={sortOption}
            onChange={(e) => {setSortOption(e.target.value); setCurrentPage(1)}}
            className="select-dropdown"
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="bestSelling">Best Selling</option>
          </select>
        </div>

        <div className="container d-flex">
          <div
            className="mt-2 gap-4 justify-content-center"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {currentItems.length === 0 ? ( // Check if currentItems is empty
            <p className="text-center text-muted">*Product Not Found :( </p>
          ) : (
            currentItems.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))
          )}
          </div>
        </div>
        <div className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <span
              key={number + 1}
              className={`page-number ${
                currentPage === number + 1 ? "active" : ""
              }`}
              onClick={() => {setCurrentPage(number + 1); window.scrollTo({ top: 0, behavior: 'smooth' });}}
            >
              {number + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
