import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryProductContext } from "../context/CategoryProductContext";


const SingleProduct = () => {
  const { productId } = useParams();
  const { products, categories, loading, addItemToCart, cartItems } =
    useContext(CategoryProductContext);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageKey, setImageKey] = useState(""); // New state for key

  useEffect(() => {
    const foundProduct = products.find((prod) => prod._id === productId);
    setProduct(foundProduct);

    if (foundProduct) {
      setSelectedImage(`${foundProduct.imageUrl}`);
      setImageKey(`${foundProduct.imageUrl}`); 
      const getCategory = categories.find(
        (cat) => cat._id === foundProduct.categoryId
      );
      setCategory(getCategory);
    }
  }, [products, productId, categories]);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  const isItemInCart = cartItems.some((cartItem) => cartItem._id === productId);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageKey(imageUrl); // Update key to trigger re-render
  };

  return (
    <div className="product-container">
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#123abc" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {product ? (
            <div className="product-content">
              <div className="thumbnails mt-4">
                <img
                  src={product.imageUrl}
                  className="thumbnail"
                  alt="Product Thumbnail"
                  onClick={() => handleImageClick(product.imageUrl)}
                />
                <img
                  src="../../public/images/product-2.jpg"
                  className="thumbnail"
                  alt="Product Thumbnail"
                  onClick={() => handleImageClick("../../public/images/product-2.jpg")}
                />
                <img
                  src="../../public/images/product-3.jpg"
                  className="thumbnail"
                  alt="Product Thumbnail"
                  onClick={() => handleImageClick("../../public/images/product-3.jpg")}
                />
                <img
                  src="../../public/images/product-4.jpg"
                  className="thumbnail"
                  alt="Product Thumbnail"
                  onClick={() => handleImageClick("../../public/images/product-4.jpg")}
                />
              </div>

              <div className="product-image">
                <img src={selectedImage} alt="Product" key={imageKey} /> {/* Updated key */}
              </div>

              <div className="product-details ">
                <p className="heading text-muted " style={{fontSize:"1.5em" , fontWeight:"700"}}>{product.name}</p>
                <p className="price">Price: {product.price}/-</p>
                <p>Description: {product.description}</p>
                {category && <p>Category: {category.name}</p>}
                <button
                  className="add-to-cart-btn "
                  onClick={() => handleAddToCart(product)}
                  disabled={isItemInCart}
                >
                  {isItemInCart ? "Added" : "Add To Cart"}
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
