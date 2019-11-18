/*jshint esversion: 9 */
/*
File: Home.js

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
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
//
const Home = () => {
  //
  const [productsBySales, setProductsBySales] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  //
  const loadProductsBySales = () => {
    getProducts("sold").then(data => {
      if(data.error){
        setError(data.error);
      } else {
        setProductsBySales(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if(data.error){
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  //
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySales();
  }, []);
  //
  return (
    <Layout title="E-Commerce React App"
      description="E-commerce app with React"
      class_Name="container-fluid">
      <Search />
      <h3 className="mb-4">Best Sellers</h3>
      <div className="row">
        {productsBySales.map((product, i) => (
          <div className="col-4 mb-3">
            <Card key={i} product={product}/>
          </div>
        ))}
      </div>
      <hr/>
      <h3 className="mb-4">New Arrivals</h3>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div className="col-4 mb-3">
            <Card key={i} product={product}/>
          </div>
        ))}
      </div>
      <hr/>
    </Layout>
  )
};
//
export default Home;
