/*jshint esversion: 9 */
/*
File: Card.js

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
// import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItemToCart, updateItem, removeItem } from "./cartHelpers";
// import { createProduct, getCategories } from "./apiAdmin";
//
const Card = ({ product,
                showViewButton = true,
                showAddToCartButton = true,
                cartUpdate = false,
                showRemoveProductButton = false,
                setRun = f => f,
                run = undefined // changeCartSize
              }) => {
  //
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  //
  const showViewProductButton = showViewButton => {
    return (
      showViewButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            view product
          </button>
        </Link>
      )
    );
  };
  //
  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };
  //
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  //
  const showAddToCart = showAddToCartButton => {
    return (
			showAddToCartButton && (
				<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1">
				    Add to cart
				</button>)
    );
  };
  //
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
          <button className="btn btn-outline-danger mt-2 mb-2 mr-2" onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
            }}>Remove item...</button>
        )
    );
  };
  //
  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  //
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  //
  const showStock = (quantity) => {
    return (
            quantity > 0 ?
            (<span className="badge badge-primary badge-pill">in stock</span>) : (
              <span>out of stock</span>)
    );
  };
  //
  return (
      <div className="card">
        <div className="card-header name">
          <h5>{product.name}</h5>
        </div>
        <div className="card-body">
          <ShowImage item={product} url="products"/>
          <p className="lead mt-2">{product.description.substring(0, 50)}</p>
          <p className="black-8">Category: {product.category && product.category.name} - Arrived: {moment(product.createdAt).fromNow()}</p>
          <p className="black-9">{showStock(product.quantity)} List price: ${product.price}</p>
          {showAddToCart(showAddToCartButton)}
          {shouldRedirect(redirect)}
          {showCartUpdateOptions(cartUpdate)}
          {showViewProductButton(showViewButton)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
      </div>
  );
};
//
export default Card;
