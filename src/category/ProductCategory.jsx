import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = ({ productCategory }) => {
  const initialShowCount = 8;
  const [showProducts, setShowProducts] = useState(initialShowCount);
  const [currentProducts, setCurrentProducts] = useState(productCategory.slice(0, showProducts));
  const [newProductsStartIndex, setNewProductsStartIndex] = useState(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!fadingOut) {
      setCurrentProducts(productCategory.slice(0, showProducts));
    }
  }, [showProducts]);

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
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }); // Duration of fade-out animation
  };

  return (
    <div className="container-fluid product">
      <div className="container">
        <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s">
          <p className="text-uppercase text-muted" style={{letterSpacing:"3px", fontWeight:500}}>
           Our Category
          </p>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {currentProducts.map((category, index) => (
            <div
              key={category.id}
              className={`col ${
                newProductsStartIndex !== null && index >= newProductsStartIndex ? 'fade-in' : ''
              } ${fadingOut && index >= initialShowCount ? 'fade-out' : ''}`}
            >
              <Link to={`/productCategory/${category.id}`} className="card-link text-decoration-none">
                <div className="h-100">
                  <img
                    src={category.image}
                    className="card-img-top"
                    alt={category.name}
                  />
                  <div className="card-body mt-3">
                    <p className="prod-font text-center">
                      {category.name}
                      <i className="ms-1 bi bi-arrow-right"></i>
                      <p className="price">From ₹50</p>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          {showProducts < productCategory.length && (
            <span
              className="text-link me-3"
              onClick={handleShowMore}
            >
              Show More
            </span>
          )}
          {showProducts > initialShowCount && (
            <span
              className="text-link"
              onClick={handleShowLess}
            >
              Show Less
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
