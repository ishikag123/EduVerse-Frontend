import React from "react";
import { Link } from "react-router-dom";

export const HomeNav = () => {
  return (
    <div className="w-full p-10 gap-4 fixed z-50 justify-center items-center sm:flex hidden">
      <div className="flex gap-20 ml-auto text-xl font-bold text-gray-500">
        <Link to="/">About Us</Link>
        <Link to="/login">Login/Signup</Link>
      </div>
    </div>
  );
};
