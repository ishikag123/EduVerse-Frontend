import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../Context/AccountProvider";

export const StudentLogout = () => {
  localStorage.removeItem("studentToken");
  console.log("student logged out");
  //   <Navigate to="/" />;
};
