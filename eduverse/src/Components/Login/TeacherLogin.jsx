import React, { useState, useContext } from "react";
import img from "../../assets/teacher.png";
import { AccountContext } from "../../Context/AccountProvider";

export const TeacherLogin = () => {
  const { teacher, setTeacher, setTeacherLogin, teacherLogin } =
    useContext(AccountContext);
  const [login, setLogin] = useState(false);
  return (
    <div className="flex gap-0 w-3/4 p-0 rounded-xl h-full shadow-xl m-auto border-2">
      <div className="w-1/2 bg-[#a5d6f1fc] flex flex-col rounded-l-xl justify-center items-center p-12 gap-16">
        <h1 className="font-bold text-[#857008] text-5xl">EduVerse</h1>

        <img src={img} alt="" />
        <h3
          className="font-semibold text-xl text-[#857008d0] hover:text-gray-500 transition-all w-3/4 ease-in-out cursor-pointer text-center"
          onClick={() => setTeacherLogin(false)}
        >
          Are you a Student?
        </h3>
      </div>
      <div className="w-3/4 flex flex-col justify-center items-center p-6">
        {login ? (
          <form
            action=""
            className="flex flex-col justify-center items-center h-full gap-6 w-full"
          >
            <input
              type="Email"
              required="true"
              placeholder="Email Id"
              className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
            />
            <input
              type="password"
              required="true"
              placeholder="Write a password"
              className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
            />
            <button className="bg-[#e3c73ffe] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#e3c83faf] transition-all w-3/4 ease-in-out">
              Login
            </button>
            <button
              className="bg-[#e3c73ffe] text-white p-3 px-4 w-3/4 rounded-xl shadow-lg font-semibold hover:bg-[#e3c83faf] transition-all ease-in-out"
              onClick={() => setLogin(false)}
            >
              Don't have an account?
            </button>
          </form>
        ) : (
          <form
            action=""
            className="flex flex-col justify-center items-center h-full gap-3 w-full"
          >
            <input
              type="text"
              required="true"
              placeholder="Your Name"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="Email"
              required="true"
              placeholder="Email Id"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="password"
              required="true"
              placeholder="Write a password"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="text"
              required="true"
              placeholder="Phone number"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="text"
              placeholder="Alternative Phone number"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="text"
              required="true"
              placeholder="Address"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />

            <input
              type="text"
              placeholder="Skills and Subjects"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="number"
              placeholder="Experience(int years)"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <input
              type="date"
              placeholder="Birth Date"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
            />
            <button className="bg-[#e3c73ffe] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#e3c83faf] transition-all w-3/4 ease-in-out">
              Register
            </button>
            <button
              className="bg-[#e3c73ffe] text-white p-3 px-4 w-3/4 rounded-xl shadow-lg font-semibold hover:bg-[#e3c83faf] transition-all ease-in-out"
              onClick={() => setLogin(true)}
            >
              Already have an account?
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
