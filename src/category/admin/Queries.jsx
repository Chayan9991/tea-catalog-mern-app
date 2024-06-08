import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_SERVER_BASE_URL } from "../../data/constant";
import { CategoryProductContext } from "../../context/CategoryProductContext";
import AdminTab from "./AdminTab";

const Queries = () => {
  const { queries, setQueries } = useContext(CategoryProductContext);

  useEffect(() => {
    fetchQueries();
  }, [setQueries]);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(
        `${API_SERVER_BASE_URL}/admin/userQueries`
      );
      setQueries(response.data); // Update queries state via context
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      const response = await axios.delete(
        `${API_SERVER_BASE_URL}/admin/userQueries/${queryId}`
      );
      if (response.status === 200) {
        fetchQueries(); // Refetch queries after deletion
      } else {
        console.error("Failed to delete query");
      }
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  return (
    <div className="container-fluid px-4 mt-3">
      <AdminTab />
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <p className=" h5 text-white ">Queries</p>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr className="small">
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created</th>
                    <th style={{ width: "40%" }}>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((query, index) => (
                    <tr className="small" key={index}>
                      <td>{query.fullName}</td>
                      <td>{query.email}</td>
                      <td>{query.phone}</td>
                      <td>{formatDate(query.createdAt)}</td>
                      <td style={{ wordWrap: "break-word" }}>
                        {query.message}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteQuery(query._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Queries;
