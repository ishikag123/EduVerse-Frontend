import React from "react";
import { getAllStudents } from "../../Services/api";

export const TestPage = ({ token }) => {
  const getStudents = async () => {
    //e.preventDefault();
    console.log(token);
    await getAllStudents(token);
  };
  return (
    <div>
      <button onClick={() => getStudents()}>Get students</button>
    </div>
  );
};
