import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_SERVER_BASE_URL } from "../../data/constant";
import { CategoryProductContext } from "../../context/CategoryProductContext";

const ProductList = () => {
  const { products, loading, refreshData } = useContext(CategoryProductContext);
  const [product, setProduct] = useState(products || []);
  const [imageLoaded, setImageLoaded] = useState({}); // State to track loaded images
  const [deletingProduct, setDeletingProduct] = useState(null); // State to track the product being deleted

  useEffect(() => {
    setProduct(products);
  }, [products]);

  // Function to delete a product
  const deleteProduct = (productId) => {
    setDeletingProduct(productId); // Set the product being deleted
    axios
      .delete(`${API_SERVER_BASE_URL}/admin/deleteProductById/${productId}`)
      .then(() => {
        refreshData();
        toast.success("Your product has been deleted successfully!", {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDeletingProduct(null); // Reset the state after deletion
      });
  };

  const handleImageLoad = (id) => {
    setImageLoaded((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <h4 className="header text-uppercase fw-semibold pt-2">Product List</h4>
        <Link
          to="/admin/addProduct"
          className="btn btn-sm btn-success d-flex align-items-center"
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
          }}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Product
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Best Selling</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, idx) => (
            <tr key={product._id}>
              <td style={{ verticalAlign: "middle" }}>{idx + 1}</td>
              <td style={{ verticalAlign: "middle" }}>
                <img
                  src={`${product.imageUrl}`}
                  alt={product.name}
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    opacity: imageLoaded[product._id] ? 1 : 0,
                    transition: "opacity .4s ease-in",
                  }}
                  onLoad={() => handleImageLoad(product._id)}
                />
              </td>
              <td style={{ verticalAlign: "middle" }}>{product.name}</td>
              <td
                style={{
                  maxWidth: "250px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  verticalAlign: "middle",
                }}
              >
                {product.description}
              </td>
              <td style={{ verticalAlign: "middle" }}>${product.price}</td>
              <td style={{ verticalAlign: "middle" }}>
                {product.stockStatus ? "Available" : "NA"}
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {product.bestSelling ? "Yes" : "No"}
              </td>
              <td style={{ verticalAlign: "middle" }} className="d-flex pt-3 pb-3">
                <Link
                  to={`/admin/editProduct/${product._id}`}
                  className="btn btn-primary btn-sm me-2 d-flex align-items-center"
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "5px",
                  }}
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger d-flex align-items-center position-relative"
                  onClick={() => deleteProduct(product._id)}
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "5px",
                  }}
                  disabled={deletingProduct === product._id} // Disable button while deletion is in progress
                >
                  {deletingProduct === product._id && ( // Show spinner if deleting this product
                    <ClipLoader color={"#ffffff"} loading={true} size={20} />
                  )}
                  <span className={deletingProduct === product._id ? "visually-hidden" : ""}>
                    <i className="bi bi-trash me-1"></i> Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
