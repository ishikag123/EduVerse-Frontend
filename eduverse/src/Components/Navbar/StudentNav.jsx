import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Context/AccountProvider";
import { TiThMenuOutline } from "react-icons/ti";

export const StudentNav = () => {
  const { setStudent } = useContext(AccountContext);
  const [openMenu, setOpenMenu] = useState(false);
  const StudentLogout = () => {
    localStorage.removeItem("studentToken");
    console.log("student logged out");
    setStudent(null);
    //   <Navigate to="/" />;
  };
  return (
    // <div>
    <div
      className={
        openMenu
          ? "w-full p-6 flex flex-col gap-4 fixed z-50 justify-center items-center bg-[#ffffff8e] backdrop-blur-md"
          : "w-full p-6 flex gap-4 fixed z-50 justify-center items-center bg-[#ffffff8e] backdrop-blur-md"
      }
    >
      <div className="flex w-full">
        <Link to="/" className="text-4xl font-extrabold text-[#0B5078]">
          EduVerse
        </Link>
        <button
          className="md:hidden text-3xl font-bold text-[#0B5078] ml-auto"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <TiThMenuOutline />
        </button>
      </div>
      <div
        className={
          openMenu
            ? "gap-16 text-xl font-bold text-[#0B5078] justify-center items-center flex flex-col"
            : "gap-16 ml-auto text-xl font-bold text-[#0B5078] justify-end items-end md:flex hidden w-full"
        }
      >
        <Link to="/student-dashboard">Dashboard</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/edit-student-profile">Edit Profile</Link>
        {/* <Link to="/wishlist">Wishlist</Link>
        <Link to="/fees-pay">Pay fees</Link> */}
        <h1 className="cursor-pointer" onClick={() => StudentLogout()}>
          Logout
        </h1>
      </div>
    </div>
    // </div>
  );
};
