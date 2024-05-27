import React from "react";
import { Link } from "react-router-dom";

export const TeacherNav = () => {
  return (
    <div className="w-full p-6 flex gap-4 fixed z-50 justify-center items-center bg-[#ffffff8e] backdrop-blur-md">
      <Link to="/" className="text-4xl font-extrabold text-[#0B5078]">
        EduVerse
      </Link>
      <div className="flex gap-16 ml-auto text-xl font-bold text-[#0B5078] justify-center items-center">
        <Link to="/teacher-dashboard">Dashboard</Link>
        <Link to="/courses">My courses</Link>
        <Link to="/create-course">Create course</Link>
        <Link to="/fees-status">Fees status</Link>
        <h3>Logout</h3>
      </div>
    </div>
  );
};
