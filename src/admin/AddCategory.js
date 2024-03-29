/*jshint esversion: 9 */
import React, { useState } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
//
const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  // Handler's Functions ("e" is the event)
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // Make request to API to create category
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error){
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      });
  };
  //
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">New Category's Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autofocus
          required/>
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  //
  const showSuccess = () => {
    if (success){
      return (<h3 className="text-success">Category {name} added!</h3>);
    }
  };
  const showError = () => {
    if (error){
      return (<h3 className="text-danger">Category's Name MUST be Unique!</h3>);
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">Back</Link>
    </div>
  );
  //
  return (
    <Layout
      title="Administrative Dashboard"
      description={`Add New Category`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
//
export default AddCategory;
