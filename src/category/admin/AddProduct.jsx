import { useEffect, useState } from "react";
import { Products } from "../../data/Product";

const AddProduct = () => {
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

  const [category, setCategory] = useState([]);

  useEffect(() => {
    // Fetching product data from Products function
    const { productCategory } = Products();
    setCategory(productCategory);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      // Handle file input separately
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result); // Update image preview
          setProduct({ ...product, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the changes, e.g., API call
    console.log("Product submitted:", product);
  };

  return (
    <div className="container mt-5 col-md-9 mb-5">
      <h1 className="mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
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
            <option value="" disabled>Select category</option>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
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
            accept="image/*" // Allow only image files
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
