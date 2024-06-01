import{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const categoryRespnose = await axios.get(
          "http://localhost:5000/getAllCategories"
        );

        setCategories(categoryRespnose.data.data);
        

      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
    
  }, []);

  const deleteProductCategory=(productId)=>{
    setCategories(categories.filter((product) => product.id !== productId));
    axios.delete(`http://localhost:5000/admin/deleteCategoryById/${productId}`) 
    
  }

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
          {categories.map((category, idx) => (
            <tr key={category._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/${category.imageUrl}`}
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
