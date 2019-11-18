/*jshint esversion: 9 */
/*
File: ../e-commerce-front/admin/ManageProducts.js

*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
//
const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();
    //
    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };
    //
    useEffect(() => {
        loadProducts();
    }, []);
    //
    const removeProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };
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
      <Layout title="Manage Products"
              description="Perform CRUD on products"
              class_Name="container-fluid">
        <div className="row">
          <div className="col-3">
            {adminLinks()}
          </div>
          <div className="col-9">
            <div className="card">
              <div className="card-header">
                <h5 className="text-right">Total {products.length} products</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {products.map((p, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-right">
                        <strong>{p.name}</strong>
                        <Link to={`/admin/product/update/${p._id}`}>
                          <span className="badge badge-warning badge-pill">Update</span>
                        </Link>
                        <span onClick={() => removeProduct(p._id)} className="badge badge-danger badge-pill">
                          Delete
                        </span>
                    </li>
                  ))}
                </ul>
              </div>
              <br />
            </div>
          </div>
        </div>
      </Layout>
    );
};
//
export default ManageProducts;
