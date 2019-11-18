/*jshint esversion: 9 */
/*
File: Profile.js

Methods:
  imported:
    From "../auth":
      isAuthenticated
    From "./apiUser":
      readUserInfo
      updateUserInfo
      updateUserInfoFrontendData
    From "../core/Layout":
      Layout
  Defined:
    init
    clickSubmitProfileForm
    redirectUserFromProfileForm
    profileForm
*/
import React, { useState, useEffect }from 'react';
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { readUserInfo, updateUserInfo, updateUserInfoFrontendData } from "./apiUser";
//
const Profile = ({ match }) => {
  const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
  });
  const { name, email, password, error, success } = values;
  const  { token } = isAuthenticated();
  const init = userId => {
    // console.console.log(userId);
    readUserInfo(userId, token).then(data => {
      if (data.error) {
        setValues({...values, error: true});
      } else {
        setValues({...values, name: data.name, email: data.email});
      }
    });
  };
  //
  useEffect(() => { init(match.params.userId); }, []);
  //
  const handleChange = name => e => {
    //
    setValues({ ...values, error: false, [name]: e.target.value});
  };
  //
  const clickSubmitProfileForm = e => {
    //
    e.preventDefault();
    // Update backend data
    updateUserInfo(match.params.userId, token, { name, email, password})
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // Update frontend data
        updateUserInfoFrontendData(data, () => {
          setValues({ ...values, name: data.name, email: data.email, success: true });
        });
      }
    });
  };
  //
  const redirectUserFromProfileForm = (success) => {
    if (success) {
      return <Redirect to="/home" />;
    }
  };
  //
  const profileForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name:</label>
        <input value={name} onChange={handleChange("name")} className="form-control" type="text"/>
      </div>
      <div className="form-group">
        <label className="text-muted">E-mail:</label>
        <input value={email} onChange={handleChange("email")} className="form-control" type="email"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input value={password} onChange={handleChange("password")} className="form-control" type="password"/>
      </div>
      <button className="btn btn-outline-primary mt-2 mb-2 mr-2" onClick={clickSubmitProfileForm}>
        save changes
      </button>
    </form>
  );
  //
  return (
    <Layout title="E-Commerce React App"
      description="User Profile Data"
      class_Name="container-fluid">
      <h4 className="mb-4">Available Information</h4>
      <hr/>
      <div className="row">
        {profileForm()}
        {redirectUserFromProfileForm(success)}
      </div>
      <hr/>
    </Layout>
  );
};
//
export default Profile;

// end
