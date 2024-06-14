import React from "react";
import "../Styles/Home.css";
import { HomeNav } from "./Navbar/HomeNav";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <HomeNav />
      <div className="home">
        <div className="text">
          <h1 className="font-bold text-[#0B5078] text-5xl sm:bg-transparent bg-[#ffe55b] sm:w-0 w-full sm:mb-0 mb-auto sm:p-0 p-8 ">
            EduVerse
          </h1>
          <h3 className="sm:text-left text-gray-700 md:text-lg sm:p-0 p-10 py-16 bg-transparent">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
            tempore ipsam mollitia, natus quidem autem quia modi, delectus nisi,
            saepe quis! Aliquid laboriosam asperiores exercitationem minima eum
            rerum error doloribus! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Rerum, quidem amet sapiente ullam, architecto, eum
            non assumenda facilis minima minus dolorem quam impedit iste sit
            alias earum placeat. Quam, ex!
          </h3>
          <div className="sm:hidden flex w-full gap-6 justify-center items-center">
            <Link
              className="p-2 bg-cyan-700 text-center text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
              to="/"
            >
              About Us
            </Link>
            <Link
              className="p-2 bg-cyan-700 text-center text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
              to="/login"
            >
              Login/Signup
            </Link>
          </div>
        </div>
        <div className="triangle-right"></div>
      </div>
    </>
  );
};
