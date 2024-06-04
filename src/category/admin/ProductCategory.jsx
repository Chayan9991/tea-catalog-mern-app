import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import { CategoryProductContext } from "../../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../../data/constant";

const ProductCategory = () => {
  const { categories, refreshData } = useContext(CategoryProductContext); 
  const [category, setCategory] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [deletingCategory, setDeletingCategory] = useState(null); // State to track the category being deleted

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  const deleteProductCategory = async (categoryId) => {
    setDeletingCategory(categoryId); // Set the category being deleted
    try {
      await axios.delete(`${API_SERVER_BASE_URL}/admin/deleteCategoryById/${categoryId}`);
      refreshData();
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setDeletingCategory(null); // Reset the state after deletion
    }
  };

  const handleImageLoad = (id) => {
    setImageLoaded((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <h4 className="header text-uppercase fw-semibold pt-2">Product Category</h4>
        <Link
          to="/admin/addProductCategory"
          className="btn btn-sm btn-success d-flex align-items-center"
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
          }}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Category
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Image</th>
            <th scope="col">Category Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category, idx) => (
            <tr key={category._id}>
              <td className="align-middle">{idx + 1}</td>
              <td className="align-middle">
                <img
                  src={`${API_SERVER_BASE_URL}/${category.imageUrl}`}
                  alt={category.name}
                  className="img-fluid rounded"
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    opacity: imageLoaded[category._id] ? 1 : 0,
                    transition: "opacity .4s ease-in",
                  }}
                  onLoad={() => handleImageLoad(category._id)}
                />
              </td>
              <td className="align-middle">{category.name}</td>
              <td className="align-middle text-truncate" style={{ maxWidth: "250px" }}>
                {category.description}
              </td>
              <td className="align-middle">
                <div className="d-flex">
                  <Link
                    to={`/admin/editProductCategory/${category._id}`}
                    className="btn btn-primary btn-sm me-2 d-flex align-items-center"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem", borderRadius: "5px" }}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger d-flex align-items-center position-relative"
                    onClick={() => deleteProductCategory(category._id)}
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem", borderRadius: "5px" }}
                    disabled={deletingCategory === category._id} // Disable button while deletion is in progress
                  >
                    {deletingCategory === category._id && ( // Show spinner if deleting this category
                      <ClipLoader color={"#ffffff"} loading={true} size={20} />
                    )}
                    <span className={deletingCategory === category._id ? "visually-hidden" : ""}>
                      <i className="bi bi-trash me-1"></i> Delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategory;
