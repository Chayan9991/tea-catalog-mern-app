import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CategoryProductContext } from "../../context/CategoryProductContext";

const UpdateCategory = () => {
  const { categories, refreshData } = useContext(CategoryProductContext);

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageUrl: null,
  });

  useEffect(() => {
    try {
      if (categories.length > 0) {
        const fetchCategory = categories.find(
          (category) => category._id === categoryId
        );
        setCategory(fetchCategory);

        if(fetchCategory.imageUrl){
          setImagePreview(`http://localhost:5000/${fetchCategory.imageUrl}`)
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }, [categoryId, categories]);

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
        setCategory({ ...category, imageUrl: file });
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

    try {
      const formData = new FormData();
      for (const key in category) {
        formData.append(key, category[key]);
      }
      const response = await axios.put(
        `http://localhost:5000/admin/updateCategory/${categoryId}`,
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
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="container mt-5 col-md-9 mb-5">
        <h1 className="mb-4">Update Category</h1>
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
          <button type="submit" className="btn btn-primary">
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
