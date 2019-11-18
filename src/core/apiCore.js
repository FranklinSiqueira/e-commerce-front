/*jshint esversion: 9 */
/*
File: ../ecommerce-front/src/user/apiCore.js

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
import React from "react";
import { API } from "../config";
import queryString from "query-string";
//
export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET",
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
//
export const getCategories = () => {
  return fetch(`${API}/categories`, {
            method: "GET",
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
//
export const checkBox = ({ categories }) => {
  return categories.map((c, i) => (
    <li className="list-unlisted">
      <input type="checkbox" className="form-check-input"/>
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};
//
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {limit, skip, filters};
  // console.log(name, email, password);   // Inspecting variables on the console
  return fetch(`${API}/products/by/search`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"},
            body: JSON.stringify(data)
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
// Called from Search.js
export const listProducts = params => {
  //
  const query = queryString.stringify(params);
  //
  return fetch(`${API}/products/search?${query}`, {
            method: "GET",
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
//
export const listRelatedProducts = productId => {
  return fetch(`${API}/products/related/${productId}`, {
            method: "GET",
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
// Called from Product.js
export const readProductId = productId => {
  //
  return fetch(`${API}/product/${productId}`, {
            method: "GET",
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
// Called from Checkout.js
export const getBraintreeClientToken = (userId, token) => {
  //
  return fetch(`${API}/braintree/getToken/${userId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`}
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
// Called from Checkout.js
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`},
        body: JSON.stringify({ order: createOrderData })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// Called from Checkout.js
export const processPayment = (userId, token, paymentData) => {
  //
  return fetch(`${API}/braintree/payment/${userId}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`},
            body: JSON.stringify(paymentData)
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
// end
