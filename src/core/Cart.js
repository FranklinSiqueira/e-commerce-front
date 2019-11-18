/*jshint esversion: 9 */
/*
File: Cart.js

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
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { getCart, removeItem } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
//
const Cart = () => {
  //
  const [items, setItems] = useState([]);
  // const [cartSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);
  //
  useEffect(() => {
    console.log('MAX DEPTH ...');
    setItems(getCart());
  }, [run]);
  //
  const showItems = items => {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="mb-2">
            Your cart has {`${items.length}`} {items.length > 1 ? "items" : "item"}.
            <Link to="/sale"> Continue shopping...</Link>
          </h4>
          <hr />
          {items.map((product, i) => (
            <Card
              key={i}
              product={product}
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
              // changeCartSize={changeCartSize}
            />
          ))}
        </div>
      </div>
      );
  };
  //
  const noItemsMessage = () => (
    <h4>Your Cart is empty.<Link to="/sale"> Continue shopping...</Link></h4>
  );
  //
  return (
    <Layout title="Shopping Cart" description="Review your cart here" className="container-fluid">
      <div className="row">
        <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
        {items.length > 0 ?
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h4 className="mb-2">Your Cart Summary</h4>
                <hr />
                <Checkout products={items} />
              </div>
          </div>
          </div>
          : ""}
      </div>
    </Layout>
  );
};
//
export default Cart;
