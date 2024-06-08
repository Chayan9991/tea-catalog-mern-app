import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CategoryProductContext } from "../../context/CategoryProductContext";
import { API_SERVER_BASE_URL } from "../../data/constant";
import { Link } from "react-router-dom";
import AdminTab from "./AdminTab";
// Import custom CSS for additional styling

const AdminDashboard = () => {
  const { products, orders, setOrders, queries } = useContext(CategoryProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const[cartTotal, setCartTotal] = useState(0); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_SERVER_BASE_URL}/orders`);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders()


  }, [setOrders]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${API_SERVER_BASE_URL}/admin/orders/${orderId}`
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filterAndSortOrders = (orders) => {
    return orders
      .filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phone.includes(searchTerm) ||
          order.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === "date") {
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortField === "totalValue") {
          comparison = a.totalCartValue - b.totalCartValue;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
  };

  const displayedOrders = filterAndSortOrders(orders);

  return (
    <div className="admin-dashboard">
      <div className="d-flex flex-column flex-md-row">
        <div className="content p-4" style={{ width: "100%" }}>
          <div className="container-fluid">
            <AdminTab />
            <div className="row mt-4">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-header bg-dark text-white">
                    Recent Orders
                  </div>
                  <div className="card-body">
                    <div className="row mb-1 ">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control search-input"
                          placeholder="Search by Order ID, Name, Email, Phone, Address"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select sort-select"
                          value={sortField}
                          onChange={handleSortFieldChange}
                        >
                          <option value="date">Sort by Date</option>
                          <option value="totalValue">
                            Sort by Total Value
                          </option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select sort-order-select"
                          value={sortOrder}
                          onChange={handleSortOrderChange}
                        >
                          <option value="asc">Low to High</option>
                          <option value="desc">High to Low</option>
                        </select>
                      </div>
                    </div>

                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr>
                          <th className="text-primary">Order ID</th>
                          <th className="text-primary">Product Details</th>
                          <th className="text-primary">Contact</th>
                          <th className="text-primary">Total Value</th>
                          <th className="text-primary">Action</th>
                        </tr>
                      </thead>
                      <tbody className="small">
                        {Array.isArray(displayedOrders) &&
                        displayedOrders.length > 0 ? (
                          displayedOrders.map((order) => (
                            <tr key={order._id}>
                              <td className="small text-muted fw-semibold">{order._id}</td>
                              <td>
                                <table className="table table-secondary ">
                                  <thead>
                                    <tr className="small">
                                      <th >Item</th>
                                      <th>Qty</th>
                                      <th>Price/Item</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.cartDetails.map((item) => (
                                      <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                          ₹{item.totalPrice / item.quantity}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                              <td>
                                <ul>
                                  <li>Name: {order.name}</li>
                                  <li>Email: {order.email}</li>
                                  <li>Phone: {order.phone}</li>
                                  <li>Address: {order.address}</li>
                                  <li>Message: {order.message}</li>
                                  <li>
                                    Order Date:{" "}
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString()}
                                  </li>
                                </ul>
                              </td>
                              <td className="fw-semibold">₹{order.totalCartValue}</td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDeleteOrder(order._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No Orders available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
