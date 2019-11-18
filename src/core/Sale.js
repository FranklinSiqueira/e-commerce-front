/*jshint esversion: 9 */
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Radiobutton from "./RadioButton";
import { getCategories, getFilteredProducts } from "./apiCore";
import { prices } from "./FixedPrices";
//
const Sale = () => {
  //
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  //
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  // Populate categories field with getCategories Method
  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error){
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  //
  useEffect(() => {
    loadCategories();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);
  //
  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price"){
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };
  //
  const handlePrice = value => {
    //
    const data = prices;
    let array = [];
    for (let key in data){
      if (data[key]._id === parseInt(value)){
        array = data[key].array;
      }
    }
    return array;
  };
  //
  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
        if (data.error){
          setError(data.error);
        } else {
          setFilteredResults(data.data);
          setSize(data.size);
          setSkip(0);
        }
      });
  };
  //
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
        if (data.error){
          setError(data.error);
        } else {
          setFilteredResults([...filteredResults, ...data.data]);
          setSize(data.size);
          setSkip(toSkip);
        }
      });
  };
  //
  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <button
          className="btn btn-warning mb-5"
          onClick={loadMore}>Load more...</button>
      )
    );
  };
  // Render
  return (
    <Layout
      title="Selling Products Inventory"
      description="Products Inventory, Sales and More"
      class_Name="container-fluid">
      <div className="row">
        <div className="col-3">
          <h5>Filter by Category</h5>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")} />
          </ul>
          <h5>Filter by Price</h5>
          <div>
            <Radiobutton
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")} />
          </div>
        </div>
        <div className="col-9">
          <h3 className="mb-4">Products</h3>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div className="col-4 mb-3">
                <Card key={i} product={product}/>
              </div>
            ))}
          </div>
          <hr/>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};
//
export default Sale;
