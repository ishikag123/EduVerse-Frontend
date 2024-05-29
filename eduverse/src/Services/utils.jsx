import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../Context/AccountProvider";
import axios from "axios";

export const StudentLogout = () => {
  localStorage.removeItem("studentToken");
  console.log("student logged out");
  //   <Navigate to="/" />;
};

export const getStudentToken = () => {
  const user = JSON.parse(localStorage.getItem("studentToken"));
  return user;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
