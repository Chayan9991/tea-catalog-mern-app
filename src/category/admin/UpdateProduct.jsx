import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Products } from "../../data/Product";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    id: "",
    categoryId: "", // Provide a default value or set to null if it's initially undefined
    stockStatus: true,
    image: null,
    title: "",
    description: "",
    price: "",
    bestSelling: false,
  });

  const [category, setCategory] = useState({});

  useEffect(() => {
    // Fetching product data from Products function
    const { allProductData, productCategory } = Products();

    const productItem = allProductData.find(
      (item) => item.id === parseInt(productId)
    );

    if (productItem) {
      setProduct(productItem);
      const categoryItem = productCategory.find(
        (item) => item.id === productItem.categoryId
      );
      setCategory(categoryItem);
    } else {
      navigate("/admin/products");
    }
  }, []);

  //   useEffect(() => {
  //     // Fetch product data from an API (this is a placeholder, replace with your API call)
  //     axios.get(`/api/products/${productId}`).then(response => {
  //       setProduct(response.data);
  //     });
  //   }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      // Handle file input separately
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); // Update image preview
        };
        reader.readAsDataURL(file);
      }
    }

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update product data via an API (this is a placeholder, replace with your API call)
    // axios.put(`/api/products/${product.id}`, product).then(() => {
    //   navigate('/admin/products');
    // });
    navigate("/admin/products"); // Navigate back to product list (replace with your actual navigation logic)
  };

  return (
    <div className="container mt-5 col-md-9 mb-5">
      <h1 className="mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className=""></div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*" // Allow only image files
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "200px",
                maxHeight: "50px",
              }}
            />
          )}
          {!imagePreview && (
            <img
              src={product.image}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "200px",
                maxHeight: "200px",
              }}
            />
          )}
        </div>

        <div className="d-flex">
          <div className="mb-3 col-md-4">
            <label htmlFor="categoryId" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryId"
              name="categoryId"
              value={category.name}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="stockStatus" className="form-label">
              Stock Status
            </label>
            <select
              className="form-select"
              id="stockStatus"
              name="stockStatus"
              value={product.stockStatus}
              onChange={handleChange}
              required
            >
              <option value={true}>Available</option>
              <option value={false}>NA</option>
            </select>
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="bestSelling"
            name="bestSelling"
            checked={product.bestSelling}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="bestSelling">
            Best Selling
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
