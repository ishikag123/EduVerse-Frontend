import React from "react";
import { useState } from "react";
import { TeacherLogin } from "./TeacherLogin";

export const Login = () => {
  const [login, setLogin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen w-full py-6">
      {teacher ? (
        <TeacherLogin setTeacher={setTeacher} />
      ) : (
        <div className="flex gap-0 w-3/4 p-0 rounded-xl h-full shadow-xl m-auto border-2">
          <div className="w-1/2 bg-[#ffe45bbb] flex flex-col rounded-l-xl justify-center items-center p-12 gap-20">
            <h1 className="font-bold text-[#0B5078] text-5xl">EduVerse</h1>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quidem eius facilis sit illum qui, nam, unde
              praesentium est alias officiis assumenda officia iste, tempora
              animi enim molestiae? Optio, aliquam?
            </h3>
            <h3
              className="font-semibold text-xl text-[#0b5078c0] hover:text-gray-500 transition-all w-3/4 ease-in-out cursor-pointer text-center"
              onClick={() => setTeacher(true)}
            >
              Are you a Teacher?
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
                <button className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-3/4 ease-in-out">
                  Login
                </button>
                <button
                  className="bg-[#0B5078] text-white p-3 px-4 w-3/4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all ease-in-out"
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
                  required="true"
                  placeholder="Address"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                />
                <input
                  type="date"
                  placeholder="Your Birthdate"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Guardian's Name"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Guardian's Email"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                />
                <input
                  type="text"
                  placeholder="Guardian's Phone number"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                />
                <button className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-3/4 ease-in-out">
                  Register
                </button>
                <button
                  className="bg-[#0B5078] text-white p-3 px-4 w-3/4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all ease-in-out"
                  onClick={() => setLogin(true)}
                >
                  Already have an account?
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
