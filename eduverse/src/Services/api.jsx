import React from "react";
import axios from "axios";

const port = "http://localhost:5000";

export const studentRegister = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${port}/student/register`, data, config);
    console.log(res.data);
    localStorage.setItem("studentToken", JSON.stringify(res.data));
    //localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    console.log(err.response.data);
  }
};

export const studentLogin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${port}/student/login`, data, config);
    console.log(res.data);
    localStorage.setItem("studentToken", JSON.stringify(res.data));
    // localStorage.setItem("studentToken", res.data.token);
  } catch (error) {
    console.log(err.response.data);
  }
};

export const getAllStudents = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data}`,
    },
  };
  try {
    const res = await axios.get(`${port}/student/get-all`, config);
    console.log(res.data);
  } catch (error) {
    console.log(err.response.data);
  }
};
export const getStudent = async (mail, token) => {
  //const token = data.stoken;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `${port}/student/get-student/${mail}`,

      config
    );
    console.log(res.data);
  } catch (error) {
    console.log(err.response.data);
  }
};
