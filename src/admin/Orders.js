/*jshint esversion: 9 */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
//
const Orders = () => {
  //
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();
  //
  const [statusValues, setStatusValues] = useState([]);
  //
  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };
  //
  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);
  //
  const handleStatusChange = (e, orderId) => {
    // console.log("Update Order Status");
    updateOrderStatus(user._id, token, orderId, e.target.value)
      .then(data => {
        if (data.error) {
          console.log( "Failed to Update Status...");
        } else {
          loadOrders();
        }
      });
  };
  //
  const showStatus = (o) => (
    <div className="form-group">
      <span><h5 className="mark mb-4">Status:
      <select
          className="form-control"
          onChange={e => handleStatusChange(e, o._id)}>
          <option>{o.status}</option>
          {statusValues.map((status, index) => (
            <option key={index} value={status}>{status}</option>))
          }
      </select>
      </h5></span>
    </div>
  );
  //
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input value={value} className="form-control" type="text" readOnly />
    </div>
  );
  // In this case orders MUST be passed as the argument
  // ex. numOfOrders(orders)
  const numOfOrders = orders => {
    return orders.length < 1 ? "" : (<h4>Num.of orders: {orders.length}</h4>);
  };
  // In this case it's not mandatory to pass orders as the argument
  // ex. showOrders()
  const showOrders = () => {
    // Return orders.length < 1 ? <h4>No orders...</h4> : null;
    // o = order
    // oI = index, both as argument s to the function orders.map()
    // The same logic applies to p and pI...
    if (orders.length > 0) {
      return (
        <div className="card">
          {orders.map((o, oI) => {
            return (
              <div className="card-header">
                <div key={oI} style={{borderBottom: "2px solid indigo"}}>
                  <span><h5>Order Id: {o._id} / Transaction: {o.transaction_id}</h5></span>
                </div>
                <div className="card-body">
                  <ul className="list-group mb-2">
                    <li className="list-group-item">Customer: {o.user.name}</li>
                    <li className="list-group-item">Ordered: {moment(o.createdAt).fromNow()}</li>
                    <li className="list-group-item">{showStatus(o)}</li>
                    <li className="list-group-item">Total: ${o.amount}</li>
                    <li className="list-group-item">Deliver to: {o.address}</li>
                  </ul>
                  <h6>Total Products Ordered: {o.products.length}</h6>
                  {o.products.map((p, pI) => {
                      return (
                        <div className="card">
                          <div className="card-body">
                            <div key={pI} className="mb-4" style={{padding: "5px", border: "1px solid indigo"}}>
                              {showInput("Title:", p.name)}
                              {showInput("List price:", p.price)}
                              {showInput("Quantity:", p.count)}
                              {showInput("Id:", p._id)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (<h4>No orders found...</h4>);
    }
  };
  //
  return (
    <Layout
      title="Administrative Dashboard"
      description={`Orders's List`}
      class_Name="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {numOfOrders(orders)}
          {showOrders()}
        </div>
      </div>
    </Layout>
  );
};
//
export default Orders;
