import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../data/constant";

const ProductCategory = () => {
  const { categories, products, loading } = useContext(CategoryProductContext);
  const initialShowCount = 8;
  const [showProducts, setShowProducts] = useState(initialShowCount);
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentProducts, setCurrentProducts] = useState(
    categories.slice(0, showProducts)
  );
  const [newProductsStartIndex, setNewProductsStartIndex] = useState(null);
  const [fadingOut, setFadingOut] = useState(false);

  const getMinPriceByCategory = (products, categoryId) => {
    const filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );
    if (filteredProducts.length === 0) {
      return null;
    }
    const prices = filteredProducts.map((product) => product.price);
    const minPrice = Math.min(...prices);
    return minPrice;
  };

  const handleImageLoad = (id) => {
    setImageLoaded((prevState) => ({ ...prevState, [id]: true }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!fadingOut) {
      setCurrentProducts(categories.slice(0, showProducts));
    }
  }, [showProducts, categories]);

  const handleShowMore = () => {
    setNewProductsStartIndex(showProducts);
    setShowProducts(showProducts + initialShowCount);
  };

  const handleShowLess = () => {
    setFadingOut(true);
    setTimeout(() => {
      setNewProductsStartIndex(null);
      setShowProducts(initialShowCount);
      setFadingOut(false);
      window.scrollTo({ top: 500, behavior: "smooth" });
    }, 300); // Duration of fade-out animation
  };

  return (
    <div className="container-fluid product">
      <div className="container">
        <div
          className="section-title text-center mx-auto wow fadeInUp "
          data-wow-delay="0.1s"
        >
          <p
            className="text-center text-uppercase text-secondary fw-semibold" style={{ fontSize: ".99em" }}
          >
            Our Category
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1">
          {/* Spinner */}
          {loading ? (
            <div
              className="spinner-container d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px", width: "100%" }}
            >
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : (
            currentProducts.map((category, index) => {
              const min_price = getMinPriceByCategory(products, category._id);
              return (
                <div
                  key={category._id}
                  className={`col ${
                    newProductsStartIndex !== null &&
                    index >= newProductsStartIndex
                      ? "fade-in"
                      : ""
                  } ${
                    fadingOut && index >= initialShowCount ? "fade-out" : ""
                  }`}
                >
                  <Link
                    to={`/productCategory/${category._id}`}
                    className="card-link text-decoration-none"
                    style={{ color: "inherit" }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={`${category.imageUrl}`}
                        className="card-img-top"
                        alt={category.name}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.4s ease-in-out",
                          display: "block",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onLoad={() => handleImageLoad(category._id)}
                      />

                      <div className="card-body mt-3">
                        <p className="prod-font text-center">
                          {category.name}
                          <i className="ms-1 bi bi-arrow-right"></i>
                          <p className="price">From {min_price}/-</p>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        <div className="text-center mt-4">
          {showProducts < categories.length && (
            <span className="text-link me-3" onClick={handleShowMore}>
              Show More
            </span>
          )}
          {showProducts > initialShowCount && (
            <span className="text-link" onClick={handleShowLess}>
              Show Less
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
