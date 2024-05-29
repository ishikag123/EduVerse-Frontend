import React from "react";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { getStudentToken } from "../../Services/utils";
import img from "../../assets/profile.jpg";
import { StudentNav } from "../Navbar/StudentNav";
import { getStudent, getAllStudents } from "../../Services/api";

export const StudentDashboard = () => {
  const { stoken, smail } = useContext(AccountContext);
  //const [stud, setStud] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const getInfo = async () => {
    const student = await getStudent(smail, stoken);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setAddress(student.address);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
      <div className="h-full w-full flex gap-4 justify-center items-center p-6 px-16 mt-20">
        {/* <button onClick={() => StudentLogout()}>LogOut</button> */}
        {/* <button onClick={() => check()}>check</button> */}
        <div className="h-full w-1/3 bg-[#FFE55B] rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4">
          <img
            src={img}
            alt=""
            className="h-56 w-56 rounded-full shadow-xl mb-12"
          />

          <h1 className="font-bold text-xl text-gray-600">{name}</h1>
          <h1 className="font-bold text-xl text-gray-600">{phone}</h1>
          <h1 className="font-bold text-xl text-gray-600">{email}</h1>
          <h1 className="font-bold text-xl text-gray-600">{address}</h1>
        </div>
        <div className="h-full flex flex-col w-2/3 bg-[#ffe45b80] rounded-2xl shadow-xl gap-4 p-8">
          <h1 className="font-bold text-xl text-gray-600">Enrolled Courses</h1>
          <div className="overflow-auto flex flex-col w-full h-full gap-4 p-4">
            <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
              <h1 className="font-semibold">Course name</h1>
              <button className="ml-auto font-bold text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out">
                View
              </button>
            </div>
            <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
              <h1 className="font-semibold">Course name</h1>
              <button className="ml-auto font-bold text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out">
                View
              </button>
            </div>
            <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
              <h1 className="font-semibold">Course name</h1>
              <button className="ml-auto font-bold text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out">
                View
              </button>
            </div>
            <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
              <h1 className="font-semibold">Course name</h1>
              <button className="ml-auto font-bold text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
