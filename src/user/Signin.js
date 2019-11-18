/*jshint esversion: 9 */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
//
//
// import on top
// import SocialLogin from "./SocialLogin";
// // then inside render method
// // right after the heading, put <SocialLogin /> component
// <h2 className="mt-5 mb-5">Sign In</h2>
// <hr />
// <SocialLogin />
// <hr />
//
//
const Signin = () => {//<div>Home</div>;
  //
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });
  // Function returning another Function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //
  const { email, password, error, loading, redirectToReferrer } = values;
  //
  const { user } = isAuthenticated();
  //
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
    .then(data => {
      if (data.error){
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
                    setValues({ ...values, redirectToReferrer: true });
        });
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
  const showLoading = () => loading && (
    <div className="alert alert-info">
       <h2>Loading...</h2>
    </div>
  );
  //
  const redirectUser = () => {
    if (redirectToReferrer){
      if (user && user.role === 1){
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }
    if (isAuthenticated()){
      return <Redirect to="/" />;
    }
  };
  //
  const signUpForm = () => (
    <form>
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
      description="E-commerce App with React - Sign-in Form"
      class_Name="container col-md-8 offset-md-2">
      {showError()}
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};
//
export default Signin;
