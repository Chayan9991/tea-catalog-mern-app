import { useEffect, useState } from "react";
import { Products } from "../../data/Product";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { allProductData } = Products();

  useEffect(() => {
    console.log(allProductData);
  });
  const [products, setProducts] = useState(allProductData);

  // Function to delete a product
  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    // Make API call to delete product from backend (optional)
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-2 align-items-center mb-4">
        <h2 className="">Product List</h2>
        <Link to="/admin/addProduct" className="btn btn-sm btn-success d-flex align-items-center" style={{height:"30px"}}>
          <i className="bi bi-plus-circle me-2"></i> Add Product
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Manufacturer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProductData.map((product, idx) => (
            <tr key={product.id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.availability ? "Available" : "NA"}</td>
              <td>{product.manufacturer}</td>
              <td>
                <Link
                  to={`/admin/editProduct/${product.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(product.id)}
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

export default ProductList;
