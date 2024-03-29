/*jshint esversion: 9 */
/*
File: ../e-commerce-front/src/core/Checkout.js

Class: Checkout

Methods:
  Imported:
    From "../auth":
      isAuthenticated
    From "./cartHelpers":
      emptyCart
      removeItem
      getCart
    From "./apiCore":
      getBraintreeClientToken
      processPayment
      createOrder
    From "../core/Layout":
      Layout

  Defined:
    getToken
    handleAddress
    showDropIn
    buy
    getTotal
    showCheckout
    showError
    showSuccess
    showLoading

*/
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
//
import { isAuthenticated } from "../auth";
//
import DropIn from "braintree-web-drop-in-react";
import { getProducts,
          getBraintreeClientToken,
          processPayment,
          createOrder } from "./apiCore";
//
const Checkout = ({ products, setRun = f => f, run = undefined  }) => {
  //
  const [data, setData] = useState({
                  loading: false,
                  success: false,
                  clientToken: null,
                  error: "",
                  instance: {},
                  address: ""});
  // Get user data
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  //
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };
  //
  useEffect(() => {
    getToken(userId, token);
  }, []);
  //
  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };
  //
  const showDropIn = () => {
        return (
          <div onBlur={() => setData({ ...data, error: "" })}>
          {data.clientToken !== null && products.length > 0 ? (
              <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delivery address:</label>
                    <hr />
                    <textarea
                        onChange={handleAddress}
                        className="form-control"
                        value={data.address}
                        placeholder="Type your delivery address here..."
                    />
                </div>
                <DropIn options={{ authorization: data.clientToken,
                                  paypal: {flow: "vault"} }}
                        onInstance={instance => (data.instance = instance)}
                        />
                <button onClick={buy} className="btn btn-success btn-block">
                  process payment
                </button>
              </div>
            ) : null}
        </div>
      )
  };
  //
  let deliveryAddress = data.address;
  //
  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
        .requestPaymentMethod()
        .then(data => {
              // console.log(data);
              nonce = data.nonce;
              // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
              // and also total to be charged
              // console.log("send nonce and total to process: ", nonce, getTotal(products));
              //
              const paymentData = {paymentMethodNonce: nonce, amount: getTotal(products)};
              processPayment(userId, token, paymentData)
                .then(response => {
                      console.log(response);
                      // empty cart
                      // create order
                      const createOrderData = {
                            transaction_id: response.transaction.id,
                            products: products,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                      };
                      createOrder(userId, token, createOrderData)
                        .then(response => {
                              emptyCart(() => {
                                  setRun(!run); // run useEffect in parent Cart
                                  console.log('payment success and empty cart');
                                  setData({loading: false, success: true});
                              });
                        })
                        .catch(error => {
                              console.log(error);
                              setData({ loading: false });
                        }); // End createOrder
                  })
                  .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                  }); // End processPayment
          })
          .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
          }); // End getNonce instantiation
  };
  //
  const getTotal = () => {
      return products.reduce((currentValue, nextValue) =>
              {return currentValue + nextValue.count * nextValue.price;}, 0);
  };
  //
  const showCheckout = () => {
      return isAuthenticated() ? (
          <div>{showDropIn()}</div>
      ) : (
          <Link to="/signin">
              <button className="btn btn-primary">Sign in to checkout</button>
          </Link>
      );
  };
  //
  const showError = error => (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
          {error}
      </div>
  );
  //
  const showSuccess = success => (
      <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
          Thanks! Your payment was successful!
      </div>
  );
  //
  const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;
  //
  return (
  	<div>
    	<h2>Total: ${getTotal()}</h2>
    	{showLoading(data.loading)}
    	{showSuccess(data.success)}
    	{showError(data.error)}
    	{showCheckout()}
  	</div>
  );
};
//
export default Checkout;
