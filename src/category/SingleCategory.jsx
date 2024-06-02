import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";

const SingleCategory = () => {
  const { products, loading, categories } = useContext(CategoryProductContext);

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
    );
  };

  const filteredProducts = filterAndSortProducts();
  const currentItems = paginateProducts(filteredProducts);

  return (
    <div className="container">
      <div className="single-category">
        <p className="heading text-center">
          {categories.find((category) => category._id === categoryId)?.name}
        </p>
        <div className="controls mt-1 text-end pe-md-4 pe-lg-4">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input me-md-2"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="select-dropdown"
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="bestSelling">Best Selling</option>
          </select>
        </div>

        <div className="container ">
          <div
            className="mt-2 gap-4 justify-content-center"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {loading ? (
              <div
                className="spinner-container d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px", width: "100%" }}
              >
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : currentItems.length === 0 ? (
              <p className="text-center text-muted">*Product Not Found :(</p>
            ) : (
              currentItems.map((item) => (
                <CategoryCard key={item._id} item={item} />
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
