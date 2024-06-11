import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/admin">Admin Home <i className='fas fa-home text-warning'></i></Link>
        <button className="navbar-toggler" type="button" onClick={toggleCollapse} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="admin-nav-link" to="/admin/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="admin-nav-link" to="/admin/category">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="admin-nav-link" to="/admin/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="admin-nav-link" to="/admin/customers">Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="admin-nav-link" to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
