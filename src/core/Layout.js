/*jshint esversion: 6 */
import React from 'react';
import Menu from "./Menu";
import "../styles.css";
//
const Layout = ({ title = "Page Title",
                  description = "Page description",
                  class_Name,
                  children }) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={class_Name}>{children}</div>
  </div>
);
//
export default Layout;
