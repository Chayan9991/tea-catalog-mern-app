import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";

const SingleProduct = () => {
  const { productId } = useParams();
  const { products, categories, loading } = useContext(CategoryProductContext);
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

  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {product ? (
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <div style={{ width: "300px", height: "300px" }}>
                  <img
                    src={`http://localhost:5000/${product.imageUrl}`}
                    alt="Product"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6 product-details">
                <h1
                  className="heading text-center"
                  style={{ fontSize: "1.5em", marginTop: "0" }}
                >
                  {product.name}
                </h1>
                <div className="product-description mt-5">
                  <p className="" style={{ fontSize: ".85em" }}>
                    Price: {product.price}/-
                  </p>
                  <p className="" style={{ fontSize: ".85em" }}>
                    Description: {product.description}
                  </p>
                  {category && (
                    <p className="" style={{ fontSize: ".85em" }}>
                      Category: {category.name}
                    </p>
                  )}
                </div>
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
