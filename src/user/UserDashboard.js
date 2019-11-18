/*jshint esversion: 9 */
/*
File: .../e-commerce-front/src/user/UserDashboard.js

Methods:
  imported:
    From "./apiCore":
      getProducts
    From "./Card":
      getProducts
    From "./Search":
      Search
    From "../core/Layout":
      Layout
  Defined:
    loadProductsBySales
    loadProductsByArrival
*/
import React, { Fragment, useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import moment from "moment";
import { isAuthenticated } from "../auth";
import { readUserShoppingHistory } from "./apiUser";
//
const Dashboard = () => {
  //
  const { user: { _id, name, email, role } } = isAuthenticated();
  const token = isAuthenticated().token;
  //
  const [history, setHistory] = useState([]);
  //
  const init = (userId, token) => {
    readUserShoppingHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };
  useEffect(() => {
    init(_id, token);
  }, []);
  //
  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>Edit my Data</Link>
          </li>
        </ul>
      </div>
    );
  };
  //
  const userInfo = () => {
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
  const userHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Shopping History</h3>
        <ul className="list-group">
          <li className="list-group-item">Date:</li>
        </ul>
      </div>
    );
  };
  //
  const purchaseHistory = history => {
    return (
      <div className="card">
        <div  className="card-header">
          <h3>Shopping History</h3>
        </div>
        <div className="card-body">
          <div>
            {history.map((h, i) => {
              return (
                <div className="card">
                  <div key={i} className="card-header">
                    <h4>Transaction Id: {h.transaction_id}</h4>
                  </div>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i} className="card-body">
                        <h5>Item: {p.name}</h5>
                        <h6>Unit price: ${p.price}</h6>
                        <h6>Purchased date:{" "} {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  //
  return (
    <Layout
      title="Dashboard"
      description={`${name}'s Dashboard`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};
//
export default Dashboard;
