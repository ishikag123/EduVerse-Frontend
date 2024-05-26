import React from "react";

export const StudentLogout = () => {
  localStorage.removeItem("studentToken");
  console.log("student logged out");
};
