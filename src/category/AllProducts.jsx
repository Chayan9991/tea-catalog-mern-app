import  { useContext, useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { CategoryProductContext } from "../context/CategoryProductContext";

const AllProducts = () => {
  const [sortOption, setSortOption] = useState("bestSelling");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { products, addToCart} = useContext(CategoryProductContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    console.log(addToCart);
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
        <p className="text-center text-uppercase text-secondary fw-semibold mt-2" style={{fontSize:"1.1em"}}>
          Our Products
         
          </p>
        <div className="d-flex justify-content-end mb-4">
          <div className=" col-md-4 d-flex">
            <div className="input-group">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
                id="form1"
                className="form-control btn btn-sm bg-white"
                placeholder="Search..."
                aria-label="Search"
                style={{ outline: "none" }}
              />
            </div>
            <div className="dropdown ms-2">
              <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortOption === "priceLowToHigh"
                  ? "Price: Low to High"
                  : sortOption === "priceHighToLow"
                  ? "Price: High to Low"
                  : "Best Selling"}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a
                    className="dropdown-item small text-muted"
                    href="#"
                    onClick={() => setSortOption("priceLowToHigh")}
                  >
                    Price: Low to High
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item small text-muted"
                    href="#"
                    onClick={() => setSortOption("priceHighToLow")}
                  >
                    Price: High to Low
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item small text-muted"
                    href="#"
                    onClick={() => setSortOption("bestSelling")}
                  >
                    Best Selling
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-4 justify-content-center">
            {currentItems.length === 0 ? (
              <p className="text-center text-muted">*Product Not Found :(</p>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                >
                  <CategoryCard item={item}/>
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
                className={`page-item ${
                  currentPage === number + 1 ? "active" : ""
                }`}
              >
                <span
                  className="px-2 rounded-5 me-1"
                  onClick={() => {
                    setCurrentPage(number + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{ backgroundColor: "#20948B", color: "white", cursor:"pointer" }}
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
