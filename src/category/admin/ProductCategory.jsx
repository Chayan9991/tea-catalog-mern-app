import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CategoryProductContext } from "../../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../../data/constant";

const ProductCategory = () => {
  const { categories, refreshData } = useContext(CategoryProductContext); 

  // Initialize category state with categories from context
  const [category, setCategory] = useState([]);

  // Synchronize local state with context categories
  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  const deleteProductCategory = async (categoryId) => {
    try {
      // Delete category from local state first
      setCategory((prevCategories) => prevCategories.filter((cat) => cat._id !== categoryId));
      
      // Delete category from server
      await axios.delete(`${API_SERVER_BASE_URL}/admin/deleteCategoryById/${categoryId}`);
      
      // Refresh data after deletion
      refreshData();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-2 align-items-center mb-4">
        <h2 className="">Product Category</h2>
        <Link
          to="/admin/addProductCategory"
          className="btn btn-sm btn-success d-flex align-items-center"
          style={{ height: "30px" }}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Category
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category, idx) => (
            <tr key={category._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={`${API_SERVER_BASE_URL}/${category.imageUrl}`}
                  alt=""
                  className=""
                  style={{ height: "50px", width: "50px" }}
                />
              </td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link
                  to={`/admin/editProductCategory/${category._id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProductCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategory;
