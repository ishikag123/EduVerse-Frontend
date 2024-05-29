import React from "react";
import { useContext } from "react";
import { getAllStudents } from "../../Services/api";
import { AccountContext } from "../../Context/AccountProvider";

export const TestPage = ({ token }) => {
  const { student, stoken } = useContext(AccountContext);
  const getStudents = async () => {
    //e.preventDefault();
    console.log(stoken);
    await getAllStudents(stoken);
  };
  return (
    <div>
      <button onClick={() => getStudents()}>Get students</button>
      <h1>{student.email}</h1>
    </div>
  );
};
