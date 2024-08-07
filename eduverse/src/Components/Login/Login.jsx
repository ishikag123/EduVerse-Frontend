import React from "react";
import { useState, useEffect, useContext } from "react";
import { TeacherLogin } from "./TeacherLogin";
import { studentLogin, studentRegister } from "../../Services/api";
import img from "../../assets/student.png";
import { StudentLogout } from "../../Services/utils";
import { TestPage } from "../Student/TestPage";
import { AccountContext } from "../../Context/AccountProvider";

export const Login = () => {
  const {
    student,
    setStudent,
    teacherLogin,
    setTeacherLogin,
    teacher,
    setTeacher,
  } = useContext(AccountContext);
  const [login, setLogin] = useState(false);
  //const [teacher, setTeacher] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gname, setGname] = useState("");
  const [Gphone, setGphone] = useState("");
  const [GEmail, setGEmail] = useState("");
  //const [user, setUser] = useState({});
  //const [test, setTest] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("studentToken"));
    if (user) {
      setStudent(user);
      window.location.href = "/student-dashboard";
    }
    // const token = localStorage.getItem("studentToken");
    // const user = JSON.parse(atob(token.split(".")[1]));
    // console.log(user._id);
  }, [{ student }]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("teacherToken"));
  //   //console.log(user);
  //   if (user) {
  //     setTeacher(user);
  //   }
  //   // const token = localStorage.getItem("studentToken");
  //   // const user = JSON.parse(atob(token.split(".")[1]));
  //   // console.log(user._id);
  // }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("teacherToken"));
    //console.log(user);
    if (user) {
      setTeacher(user);
      window.location.href = "/teacher-dashboard";
    }
  }, [{ teacher }]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ email, password });
    await studentLogin(body);
    const user = JSON.parse(localStorage.getItem("studentToken"));
    if (user) {
      setStudent(user);
      window.location.href = "/student-dashboard";
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
      Gname,
      Gphone,
      GEmail,
    });
    await studentRegister(body);
    const user = JSON.parse(localStorage.getItem("studentToken"));
    if (user) {
      setStudent(user);
      window.location.href = "/student-dashboard";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full py-6 bg-white">
      {teacherLogin ? (
        <TeacherLogin />
      ) : (
        // <TestPage token={student.token} />
        // {test?()}
        <div className="flex md:flex-row flex-col gap-0 md:w-3/4 w-11/12 p-0 rounded-xl h-full shadow-xl m-auto border-2 md:bg-transparent bg-[#ffe45bbb] overflow-auto">
          <div className="md:w-1/2 w-full md:bg-[#ffe45bbb] flex flex-col md:rounded-l-xl justify-center items-center md:p-12 p-8 gap-20">
            <h1 className="font-bold text-[#0B5078] text-5xl">EduVerse</h1>
            <img src={img} alt="" className="md:flex hidden" />
            <h3
              className="font-semibold text-xl text-[#0b5078c0] hover:text-gray-500 transition-all w-3/4 ease-in-out cursor-pointer text-center md:block hidden"
              onClick={() => setTeacherLogin(true)}
            >
              Are you a Teacher?
            </h3>
            {/* <h4>{student.email}</h4> */}
            {/* <h4>{user.token}</h4> */}
            {/* <button onClick={() => StudentLogout()}>Logout</button> */}
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
                  placeholder="Student Email Id"
                  className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  required="true"
                  placeholder="Your password"
                  className="w-3/4 border-2 rounded-lg p-3 shadow-lg"
                  onChange={(e) => setPassword(e.target.value)}
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
                {/* <button
                  className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-3/4 ease-in-out block md:hidden"
                  onClick={() => setTeacherLogin(true)}
                >
                  Are you a teacher?
                </button> */}
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
                  placeholder="Student Name"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="Email"
                  required="true"
                  placeholder="Student Email Id"
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
                  placeholder="Student Phone number"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  required="true"
                  placeholder="Student Address"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="w-full flex flex-col gap-0 justify-center items-center">
                  <h3 className="mr-auto text-xs text-gray-400">Birth Date</h3>
                  <input
                    type="date"
                    required="true"
                    className="w-full border-2 rounded-lg p-2 shadow-lg"
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Guardian's Name"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setGname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Guardian's Email"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setGEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Guardian's Phone number"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setGphone(e.target.value)}
                />
                <div
                  className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-3/4 ease-in-out block md:hidden text-center cursor-pointer"
                  onClick={() => setTeacherLogin(true)}
                >
                  I am a teacher
                </div>
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
