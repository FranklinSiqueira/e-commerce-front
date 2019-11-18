/*jshint esversion: 9 */
/*
File: ../ecommerce-front/src/user/apiUser.js

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
import React, { useState, useEffect }from 'react';
import { API } from "../config";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
//
export const readUserInfo = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};
//
export const updateUserInfo = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};
//
export const updateUserInfoFrontendData = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};
//
export const readUserShoppingHistory = (userId, token) => {
  return fetch(`${API}/orders/by/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
          })
          .then(response => {
            return response.json();
          })
          .catch(error => {
            console.log(error);
          });
};






// end
