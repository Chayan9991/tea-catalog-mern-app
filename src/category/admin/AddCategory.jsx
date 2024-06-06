import { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CategoryProductContext } from "../../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../../data/constant";

const AddCategory = () => {
  const navigate = useNavigate();
  const { categories, refreshData } = useContext(CategoryProductContext);  
  const [nameExists, setNameExists] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [category, setCategory] = useState({
    imageUrl: null,
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "name") {
      const nameExists = categories.some((category) => category.name === value);
      setNameExists(nameExists);
    }

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
          setCategory({ ...category, imageUrl: file });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCategory({
        ...category,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCategory({ ...category, imageUrl: null });
    document.getElementById('image').value = null; // Clear the file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    if (nameExists) {
      return;
    }

    const formData = new FormData();
    for (const key in category) {
      formData.append(key, category[key]);
    }

    try {
      const response = await axios.post(
        `${API_SERVER_BASE_URL}/admin/createCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refreshData();
      navigate("/admin/category");
    } catch (error) {
      console.error(
        "Error submitting category details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="container mt-5 col-md-9 mb-5">
        <h1 className="mb-4">Add Category</h1>
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
              value={category.name}
              onChange={handleChange}
              required
            />
            {nameExists && (
              <div className="alert alert-danger mt-2">
                Category with this name already exists!
              </div>
            )}
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
              value={category.description}
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
              name="imageUrl"
              onChange={handleChange}
              accept="image/*"
            />
            {imagePreview && (
              <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                  }}
                />
                <button
                  type="button"
                  className="btn text-danger rounded-5 btn-sm mt-1 me-1"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                  }}
                  onClick={handleRemoveImage}
                >
                  x
                </button>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={nameExists || isLoading}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
