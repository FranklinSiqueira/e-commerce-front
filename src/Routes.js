/*jshint esversion: 9 */
/*
File: ../e-commerce-front/src/Routes.js

*/
import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import Product from "./core/Product";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import ManageProducts from "./admin/ManageProducts";
import Orders from "./admin/Orders";
import Sale from "./core/Sale";
import Cart from "./core/Cart";
//
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/sale" exact component={Sale} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  );
};
//
export default Routes;
