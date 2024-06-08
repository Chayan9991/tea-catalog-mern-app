import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CategoryProductContext } from '../../context/CategoryProductContext'

const AdminTab = () => {
    const{orders,  products, queries} = useContext(CategoryProductContext)
  return (
    <div>
        <div className="row">
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-primary shadow">
                  <Link to={"/admin"} className="card-body text-decoration-none">
                    <h5 className="card-title">Sales</h5>
                    <p className="card-text">$12,000</p>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-success shadow">
                  <Link to={"/admin"} className="card-body text-decoration-none">
                    <h5 className="card-title">Orders</h5>
                    <p className="card-text">{orders.length}</p>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-warning shadow">
                  <Link to={"/admin"} className="card-body text-decoration-none">
                    <h5 className="card-title">Products</h5>
                    <p className="card-text">{products.length}</p>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card text-white bg-danger shadow">
                  <Link to="queries" className="card-body text-decoration-none">
                    <h5 className="card-title">Customer Queries</h5>
                    <p className="card-text">{queries.length}</p>
                  </Link>
                </div>
              </div>
            </div>
    </div>
  )
}

export default AdminTab