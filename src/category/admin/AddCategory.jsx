import{ useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [nameExists, setNameExists] = useState(false);
  const [getCategory, setGetCategory] = useState([]); // Fetch Category from DB
  const [imagePreview, setImagePreview] = useState(null);

  const [category, setCategory] = useState({
    imageUrl: null,
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5000/getAllCategories"
        );

        setGetCategory(categoryResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "name") {
      const nameExists = getCategory.some((category) => category.name === value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameExists) {
      return;
    }

    const formData = new FormData();
    for (const key in category) {
      formData.append(key, category[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/createCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={nameExists}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
