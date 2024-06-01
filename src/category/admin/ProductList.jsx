import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 

const ProductList = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getAllProducts").then((res)=>{
      setProducts(res.data.data); 
    })
  });
  

  // Function to delete a product
  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    axios.delete(`http://localhost:5000/admin/deleteProductById/${productId}`)
  };

  return (
    <div className="container mt-3">
    <div className="d-flex justify-content-between mb-4 align-items-center">
      <h2>Product List</h2>
      <Link to="/admin/addProduct" className="btn btn-sm btn-success d-flex align-items-center">
        <i className="bi bi-plus-circle me-2"></i> Add Product
      </Link>
    </div>
  
    <table className="table table-striped">
      <thead>
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
        {products.map((product, idx) => (
          <tr key={product._id}>
            <td>{idx + 1}</td>
            <td>
               <img
                  src={`http://localhost:5000/${product.imageUrl}`}
                  alt={product.name}
                  style={{ height: "50px", width: "50px" }}
                />
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{product.stockStatus ? "Available" : "NA"}</td>
            <td>{product.bestSelling ? "Yes" : "No"}</td>
            <td className="d-flex justify-content-center pt-3 pb-4">
              <Link
                to={`/admin/editProduct/${product._id}`}
                className="btn btn-primary btn-sm me-2 d-flex align-items-center"
              >
                <i className="bi bi-pencil-square me-1"></i> Edit
              </Link>
              <button
                className="btn btn-sm btn-danger d-flex align-items-center"
                onClick={() => deleteProduct(product._id)}
              >
                <i className="bi bi-trash me-1"></i> Delete
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
