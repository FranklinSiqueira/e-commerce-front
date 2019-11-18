/*jshint esversion: 9 */
/*
File: ../e-commerce-front/admin/AddProduct.js

*/
import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";
//
const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    cost: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    image: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });
  const {
    name,
    description,
    cost,
    price,
    category,
    quantity,
    shipping,
    categories,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);
  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  // Populate categories field with getCategories Method
  const loadFormData = () => {
    getCategories().then(data => {
      if (data.error){
        setValues({...values, error: data.error});
      } else {
        setValues({...values, categories: data, formData: new FormData()});
      }
    });
  };
  //
  useEffect(() => {
    loadFormData();
  }, []);
  // Handlers
  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({...values, error: "", loading: true});
    // Make request to API to create category
    createProduct(user._id, token, formData)
      .then(data => {
        if (data.error){
          setValues({...values, error: data.error});
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            cost: "",
            price: "",
            category: "",
            quantity: "",
            shipping: "",
            image: "",
            loading: false,
            createdProduct: data.name
          });
        }
      });
  };
  // New Image Form (only as a possible reusable component)
  const newImageForm = () => (
    <form className="mb-3">
      <h4>Upload Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input type="file" name="image" accept="image/*" />
        </label>
      </div>
    </form>
  );
  // New Product Form
  const newProductForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
          required/>
      </div>
      <div className="form-group">
        <label className="text-muted">Description:</label>
        <textarea
          type="text"
          className="form-control"
          onChange={handleChange("description")}
          value={description}
          required/>
      </div>
      <div className="form-group">
        <label className="text-muted">Category:</label>
        <select className="form-control" onChange={handleChange("category")}>
          <option>Choose...</option>
          {categories &&
            categories.map((c, i) =>
              (<option key={i} value={c._id}>{c.name}</option>))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping:</label>
        <select className="form-control" onChange={handleChange("shipping")}>
          <option>Choose...</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity:</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange("quantity")}
          value={quantity}
          required/>
      </div>
      <div className="form-group">
        <label className="text-muted">Cost:</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange("cost")}
          value={cost}
          required/>
      </div>
      <div className="form-group">
        <label className="text-muted">Price:</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange("price")}
          value={price}
          required/>
      </div>
      <h4>Upload Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="image"
            onChange={handleChange("image")}
            accept="image/*" />
        </label>
      </div>
      <button className="btn btn-outline-primary">Add product</button>
    </form>
  );
  //
  const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
      <h3>{`${createdProduct}`} added to database...</h3>
    </div>
  );
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      <h3>{error}</h3>
    </div>
  );
  const showLoading = () => (
    loading &&
      (<div className="alert alert-success">
        <h3>Loading...</h3>
      </div>)
  );
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">Back</Link>
    </div>
  );
  //
  return (
    <Layout
      title="Administrative Dashboard"
      description={`Add New Product`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newProductForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};
//
export default AddProduct;
