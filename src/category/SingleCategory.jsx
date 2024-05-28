import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { Products } from "../data/Product";

const SingleCategory = () => {
  const { categoryId } = useParams();
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const { productCategory, allProductData } = Products();


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

  // Filter items based on categoryId and searchTerm
  const filteredData = allProductData
    .filter((item) => item.categoryId === parseInt(categoryId))
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort filtered items
  const sortedData = filteredData.sort(handleSort);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
      <div className="single-category">
        <p className="heading text-center">
          {
            productCategory.map((category)=>{
              if(category.id === parseInt(categoryId)){
                return `${category.name}`
              }
            })
          }
        </p>
        <div className="controls mt-1 text-end pe-md-4 pe-lg-4">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input me-md-2"
          />
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
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
            {currentItems.length === 0 ? (
              <p className="text-center text-muted">*Product Not Found :(</p>
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
              onClick={() => {
                setCurrentPage(number + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {number + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
