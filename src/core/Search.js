/*jshint esversion: 9 */
/*
File: ../e-commerce-front/src/core/Search.js

Methods:
  imported:
    From "./apiCore":
      getCategories
      listProducts
    From "./Card":
      Card
  Defined:
    loadCategories
    searchData
    searchedProducts
    searchMessage
    handleChange
    searchSubmit
    searchForm
*/
import React, { useState, useEffect } from "react";
import { getCategories, listProducts } from "./apiCore";
import Card from "./Card";
//
const Search = () => {
  //
  const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
  });
  //
  const { categories, category, search, results, searched } = data;
  //
  const loadCategories = (data) => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({...data, categories: data});
      }
    });
  };
  //
  useEffect(() => {
    loadCategories();
  }, []);
  //
  const searchData = () => {
    //
    if (search) {
      listProducts({ search: search || undefined, category: category })
      .then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };
  //
  const searchedProducts = (results = []) => {
    //
    return (
      <div>
        <h4 className="mt-4">{searchMessage(search, results)}</h4>
        <div className="row">
          {results.map((product, i) => (
            <div className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  //
  const searchMessage = (search, results) => {
    //
    if (search && results.length > 0) {
      return `Found: ${results.length} items...`;
    } else if (search && results.length < 1){
      return `No items found!`;
    }
  };
  //
  const handleChange = name => event => {
    //
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  //
  const searchSubmit = (event) => {
    //
    event.preventDefault();
    searchData();
  };
  //
  const searchForm = () => (
    //
    // return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-md">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="all">All</option>
                {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
              </select>
            </div>
            <input
              type="search"
              className= "form-control"
              onChange={handleChange("search")}
              placeholder="search by name..." />
          </div>
          <div className="btn input-group-append" style={{border: "none"}}>
            <button className="input-group-text">search</button>
          </div>
        </span>
      </form>
  );
  //
  return (
    <div className="row">
      <div className="container mb-3">
        {searchForm()}
      </div>
      <div className="container-fluid mb-3">
        {searchedProducts(results)}
      </div>
    </div>
  );
};
//
export default Search;
