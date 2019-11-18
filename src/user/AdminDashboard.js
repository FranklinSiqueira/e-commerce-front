/*jshint esversion: 9 */
/*
File: ../e-commerce-front/src/user/controllers/AdminDashboard.js

*/
import React, { Fragment } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
//
const AdminDashboard = () => {
  //
  const { user: { _id, name, email, role } } = isAuthenticated();
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
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Data</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:{name}</li>
          <li className="list-group-item">E-mail:{email}</li>
          <li className="list-group-item">Role:{role === 1 ? "Administrator" : "Registered User"}</li>
        </ul>
      </div>
    );
  };
  //
  const adminHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">History</h3>
        <ul className="list-group">
          <li className="list-group-item">Date:</li>
        </ul>
      </div>
    );
  };
  //
  return (
    <Layout
      title="Administrative Dashboard"
      description={`${name}'s Dashboard`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
          {adminHistory()}
        </div>
      </div>
    </Layout>
  );
};
//
export default AdminDashboard;
