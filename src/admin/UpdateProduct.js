/*jshint esversion: 9 */
/*
File: ../e-commerce-front/admin/UpdateProduct.js

*/
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
//
const UpdateProduct = ({ match }) => {
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
    redirectToProducts: false,
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
    redirectToProducts,
    formData
  } = values;
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);
  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  //
  const loadFormData = (productId) => {
    getProduct(productId).then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({...values,
          name: data.name,
          description: data.description,
          cost: data.cost,
          price: data.price,
          category: data.category._id,
          quantity: data.quantity,
          shipping: data.shipping,
          // image: "",
          formData: new FormData()});
        loadFormCategories();
      }
    });

    //
  };
  // Populate categories field with getCategories Method
  const loadFormCategories = () => {
    getCategories().then(data => {
      if (data.error){
        setValues({...values, error: data.error});
      } else {
        setValues({categories: data, formData: new FormData()});
      }
    });
  };
  //
  useEffect(() => {
    loadFormData(match.params.productId);
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
    updateProduct(match.params.productId, user._id, token, formData)
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
            error: false,
            redirectToProducts: true,
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
      <h4>Update Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="image"
            onChange={handleChange("image")}
            accept="image/*" />
        </label>
      </div>
      <button className="btn btn-outline-primary">update product</button>
    </form>
  );
  // redirectToProducts
  const redirectUser = () => {
    if(redirectToProducts){
      if (!error){
        return <Redirect to="/admin/products" />;
      }
    }
  };
  //
  const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
      <h3>{`${createdProduct}`} updated...</h3>
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
      <Link to="/admin/products" className="text-warning">Back</Link>
    </div>
  );
  //
  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">New Category</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">New Product</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">Orders' list</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">Manage Products</Link>
          </li>
        </ul>
      </div>
    );
  };
  //
  return (
    <Layout
      title="Administrative Dashboard"
      description={`Update Product`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          <div className="card">
            <div className="card-body">
              {showLoading()}
              {showSuccess()}
              {showError()}
              {newProductForm()}
              {redirectUser()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
//
export default UpdateProduct;
