import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../data/constant";

const SingleProduct = () => {
  const { productId } = useParams();
  const { products, categories, loading, addItemToCart, cartItems } = useContext(CategoryProductContext);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((prod) => prod._id === productId);
    setProduct(foundProduct);

    if (foundProduct) {
      const getCategory = categories.find(
        (cat) => cat._id === foundProduct.categoryId
      );
      setCategory(getCategory);
    }
  }, [products, productId, categories]);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  const isItemInCart = cartItems.some(cartItem => cartItem._id === productId);

  return (
    <div className="product-container" style={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {product ? (
            <div className="product-content" style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
              <div className="product-image" style={{ flex: "1"}}>
                <img
                  src={`${API_SERVER_BASE_URL}/${product.imageUrl}`}
                  alt="Product"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
              <div className="product-details" style={{ flex: "1" }}>
                <h1 style={{ fontSize: "1.5em", marginBottom: "10px" }}>
                  {product.name}
                </h1>
                <div style={{ fontSize: ".85em", marginBottom: "20px" }}>
                  <p>Price: {product.price}/-</p>
                  <p>Description: {product.description}</p>
                  {category && (
                    <p>Category: {category.name}</p>
                  )}
                </div>
                <button
                  className="btn text-white"
                  style={{
                    backgroundColor: "#20948B",
                    borderRadius: "10px",
                    fontSize: "0.75rem",
                    padding: "10px 20px",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onClick={() => handleAddToCart(product)}
                  disabled={isItemInCart}
                >
                  {isItemInCart ? 'Added' : 'Add To Cart'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">Product not found</p>
          )}
        </>
      )}
    </div>
  );
};

export default SingleProduct;
