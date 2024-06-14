import React, { useState, useContext } from "react";
import img from "../../assets/teacher.png";
import { AccountContext } from "../../Context/AccountProvider";
import { teacherRegister, teachLogin } from "../../Services/api";

export const TeacherLogin = () => {
  const { teacher, setTeacher, setTeacherLogin, teacherLogin } =
    useContext(AccountContext);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [altPhone, setAltphone] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(0);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ email, password });
    await teachLogin(body);
    const user = JSON.parse(localStorage.getItem("teacherToken"));
    console.log(user);
    if (user) {
      setTeacher(user);
      //window.location.href = "/student-dashboard";
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      name,
      password,
      email,
      phone,
      DOB,
      address,
      altPhone,
      skills,
      experience,
    });
    await teacherRegister(body);
    const user = JSON.parse(localStorage.getItem("teacherToken"));
    console.log(user);
    if (user) {
      setTeacher(user);
      //window.location.href = "/student-dashboard";
    }
  };
  return (
    <div className="flex md:flex-row flex-col gap-0 md:w-3/4 w-11/12 p-0 rounded-xl h-full shadow-xl m-auto border-2 md:bg-transparent overflow-auto bg-[#a5d6f1fc]">
      <div className="md:w-1/2 w-full md:bg-[#a5d6f1fc] flex flex-col rounded-l-xl justify-center items-center p-12 gap-16">
        <h1 className="font-bold text-[#857008] text-5xl">EduVerse</h1>

        <img src={img} alt="" className="md:flex hidden" />
        <h3
          className="font-semibold text-xl text-[#857008d0] hover:text-gray-500 transition-all w-3/4 ease-in-out cursor-pointer text-center md:block hidden"
          onClick={() => setTeacherLogin(false)}
        >
          Are you a Student?
        </h3>
      </div>
      <div className="md:w-3/4 w-full flex flex-col justify-center items-center p-6">
        {login ? (
          <form
            action=""
            className="flex flex-col justify-center items-center h-full gap-6 w-full"
            onSubmit={handleLoginSubmit}
          >
            <input
              type="Email"
              required="true"
              placeholder="Email Id"
              className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required="true"
              placeholder="Write a password"
              className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
              onChange={(e) => setPassword(e.target.value)}
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
            onSubmit={handleRegisterSubmit}
          >
            <input
              type="text"
              required="true"
              placeholder="Your Name"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="Email"
              required="true"
              placeholder="Email Id"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required="true"
              placeholder="Write a password"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              required="true"
              placeholder="Phone number"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Alternative Phone number"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setAltphone(e.target.value)}
            />
            <input
              type="text"
              required="true"
              placeholder="Address"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Skills and Subjects"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setSkills(e.target.value)}
            />
            <input
              type="number"
              placeholder="Experience(in years)"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setExperience(e.target.value)}
            />
            <input
              type="date"
              placeholder="Birth Date"
              className="w-full border-2 rounded-lg p-2 shadow-lg"
              onChange={(e) => setDOB(e.target.value)}
            />
            <div
              className="bg-[#e3c73ffe] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#e3c83faf] transition-all w-3/4 ease-in-out md:hidden block text-center cursor-pointer"
              onClick={() => setTeacherLogin(false)}
            >
              I am a student
            </div>
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
