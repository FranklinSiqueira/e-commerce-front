/*jshint esversion: 9 */
/*
File: ../e-commerce-front/src/core/cartHelpers.js

Methods:

  Defined:
    addItemToCart
    itemTotal
    getCart
    updateItem
    removeItem
    emptyCart
*/
export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      // Converts json data to object.
      // The other JSON function to convert object to json
      // is JSON.stringify()
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // Adds item to cart
    cart.push({ ...item, count: 1});
    // Converts in an array and Maps its contents
    // The new array is built from a new set (Set() doesn't allow duplicates)
    cart = Array.from(new Set(cart.map(p => (p._id)))).map(id => {
      return cart.find(p => p._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
//
export const itemTotal = () => {
  if (typeof window !== "undefined"){
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};
//
export const getCart = () => {
  if (typeof window !== "undefined"){
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};
//
export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count; // Add 1 unit of selected item
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
//
export const removeItem = productId => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);  // Subtract 1 unit of selected item
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};
//
export const emptyCart = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
// end
