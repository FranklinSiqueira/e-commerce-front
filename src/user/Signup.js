/*jshint esversion: 9 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from "../core/Layout";
import { signup } from "../auth";
//
const Signup = () => {//<div>Home</div>;
  //
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });
  // Function returning another Function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //
  const {name, email, password, success, error } = values;
  //
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
    .then(data => {
      if (data.error){
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, name: "", email: "", password:  "", error: "", success: true });
      }
    });
  };
  //
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
    </div>
  );
  //
  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? "" : "none"}}>
      Account Created! Now, you can <Link to="/signin">Sign-in</Link>...
    </div>
  );
  //
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}/>
      </div>
      <div className="form-group">
        <label className="text-muted">E-mail:</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}/>
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>submit</button>
    </form>
  );
  //
  return (
    <Layout
      title="E-Commerce React App"
      description="E-commerce App with React - Sign-up Form"
      class_Name="container col-md-8 offset-md-2">
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};
// {JSON.stringify(values)} // Show form values in the body of the page
//
export default Signup;
