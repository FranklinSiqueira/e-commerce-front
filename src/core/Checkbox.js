/*jshint esversion: 9 */
import React, { useState, useEffect } from "react";
//
const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  //
  const handleToggle = c => () => {
    // Return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // If currently checked wasn't already in "checked state",
    // push it, else pull/take it offline
    if (currentCategoryId === -1){
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  //
  return categories.map((c, i) => (
    <li key={i} className="list-unlisted">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"/>
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};
//
export default Checkbox;
