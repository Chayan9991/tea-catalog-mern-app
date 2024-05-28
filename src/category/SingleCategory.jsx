import React, { useEffect } from "react";
import { useParams, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const SingleCategory = () => {
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const mockData = [
    {
      id: 1,
      image: "../../public/images/product-1.jpg",
      title: "Red Tea",
      description: "Description for item 1",
      price: 10,
      bestSelling: true,
    },
    {
      id: 2,
      image: "../../public/images/product-2.jpg",
      title: "Green Tea",
      description: "Description for item 2",
      price: 20,
      bestSelling: false,
    },
    {
      id: 3,
      image: "../../public/images/product-3.jpg",
      title: "Item 3",
      description: "Description for item 3",
      price: 15,
      bestSelling: true,
    },
    {
      id: 4,
      image: "../../public/images/product-4.jpg",
      title: "Item 4",
      description: "Description for item 4",
      price: 30,
      bestSelling: false,
    },
    {
      id: 5,
      image: "../../public/images/about-1.jpg",
      title: "Item 5",
      description: "Description for item 5",
      price: 5,
      bestSelling: true,
    },
    {
      id: 6,
      image: "../../public/images/about-2.jpg",
      title: "Item 6",
      description: "Description for item 6",
      price: 25,
      bestSelling: false,
    },
    {
      id: 7,
      image: "../../public/images/about-3.jpg",
      title: "Item 7",
      description: "Description for item 7",
      price: 50,
      bestSelling: true,
    },
    {
      id: 8,
      image: "../../public/images/about-4.jpg",
      title: "Item 8",
      description: "Description for item 8",
      price: 35,
      bestSelling: false,
    },
    {
      id: 9,
      image: "../../public/images/about-5.jpg",
      title: "Item 9",
      description: "Description for item 9",
      price: 45,
      bestSelling: true,
    },
    {
      id: 10,
      image: "../../public/images/about-6.jpg",
      title: "Item 10",
      description: "Description for item 10",
      price: 40,
      bestSelling: false,
    },
  ];

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

  const filteredData = mockData.filter((item) =>
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
        <p className="heading text-center">Category Name</p>
        <div className="controls mt-1 text-end pe-md-4 pe-lg-4">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

export default SingleCategory;
