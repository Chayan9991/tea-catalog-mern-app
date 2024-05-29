import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  return (
    <div>
      {/* Navbar is in App.js*/}
      
      {/* Sidebar and Main Content */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-dark text-white sidebar">
          <div className="p-3">
            <h4>Admin</h4>
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a href="#" className="nav-link active" aria-current="page">Dashboard</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Orders</a>
              </li>
              <li className="nav-item">
                <Link to="/admin/products" className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Customers</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Reports</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="content p-4" style={{ width: '100%' }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-primary">
                  <div className="card-body">
                    <h5 className="card-title">Sales</h5>
                    <p className="card-text">$12,000</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h5 className="card-title">Orders</h5>
                    <p className="card-text">150</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-warning">
                  <div className="card-body">
                    <h5 className="card-title">Products</h5>
                    <p className="card-text">320</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-danger">
                  <div className="card-body">
                    <h5 className="card-title">Customers</h5>
                    <p className="card-text">1,200</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    Recent Orders
                  </div>
                  <div className="card-body">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1234</td>
                          <td>John Doe</td>
                          <td>2023-01-01</td>
                          <td>Completed</td>
                          <td>$120</td>
                        </tr>
                        <tr>
                          <td>1235</td>
                          <td>Jane Smith</td>
                          <td>2023-01-02</td>
                          <td>Pending</td>
                          <td>$220</td>
                        </tr>
                        <tr>
                          <td>1236</td>
                          <td>Bob Johnson</td>
                          <td>2023-01-03</td>
                          <td>Cancelled</td>
                          <td>$150</td>
                        </tr>
                        {/* More rows as needed */}
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
