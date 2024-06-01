import { useState,useContext,  useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CategoryProductContext } from "../../context/CategoryProductContext";

const UpdateProduct = () => {
  const {products,categories, refreshData } = useContext(CategoryProductContext); 
  const { productId } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState(products||{
    name: "",
    description: "",
    categoryId: "",
    stockStatus: true,
    price: "",
    bestSelling: false,
  });


  useEffect(() => {
    const productToUpdate = products.find((prod) => prod._id === productId);
    if (productToUpdate) {
      setProduct(productToUpdate);
      setImagePreview(`http://localhost:5000/${productToUpdate.imageUrl}`);
    }
  }, [products, productId]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setProduct({ ...product, imageUrl: file });
      }
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      const response = await axios.put(
        `http://localhost:5000/admin/updateProduct/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refreshData(); 
      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mt-5 col-md-9 mb-5">
      <h1 className="mb-4">Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
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
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="categoryId"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
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
            accept="image/*"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "200px",
                maxHeight: "200px",
              }}
            />
          )}
        </div>

        <div className="mb-3">
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
