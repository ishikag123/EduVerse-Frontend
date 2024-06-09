import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Context/AccountProvider";

export const StudentNav = () => {
  const { setStudent } = useContext(AccountContext);
  const StudentLogout = () => {
    localStorage.removeItem("studentToken");
    console.log("student logged out");
    setStudent(null);
    //   <Navigate to="/" />;
  };
  return (
    <div className="w-full p-6 flex gap-4 fixed z-50 justify-center items-center bg-[#ffffff8e] backdrop-blur-md">
      <Link to="/" className="text-4xl font-extrabold text-[#0B5078]">
        EduVerse
      </Link>
      <div className="flex gap-16 ml-auto text-xl font-bold text-[#0B5078] justify-center items-center">
        <Link to="/student-dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        {/* <Link to="/wishlist">Wishlist</Link>
        <Link to="/fees-pay">Pay fees</Link> */}
        <h1 className="cursor-pointer" onClick={() => StudentLogout()}>
          Logout
        </h1>
      </div>
    </div>
  );
};
