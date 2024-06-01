import React from "react";
import { useContext, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { AccountContext } from "../../Context/AccountProvider";
import { getStudentToken } from "../../Services/utils";
import img from "../../assets/profile.jpg";
import { StudentNav } from "../Navbar/StudentNav";
import { getStudent, getAllStudents } from "../../Services/api";

export const StudentDashboard = () => {
  const { stoken, smail, setStudent, student } = useContext(AccountContext);
  const [stud, setStud] = useState({});

  const getInfo = async (student) => {
    const token = student.token;
    const mail = student.email;
    try {
      let student = await getStudent(mail, token);
      //console.log("response:", student);
      if (student) {
        setStud(student);
      } else {
        console.error("No student data received");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    const user = getStudentToken();
    setStudent(user);
    getInfo(user);
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
          <div className="flex flex-col gap-4 justify-start items-start">
            <div className="flex font-bold text-xl text-gray-600 justify-center items-center gap-4">
              <BsFillPersonFill className="text-2xl" /> {stud.name}
            </div>
            <div className="flex font-bold text-xl text-gray-600 justify-center items-center gap-4">
              <FaPhoneAlt /> {stud.phone}
            </div>
            <div className="flex font-bold text-xl text-gray-600 justify-center items-center gap-4">
              <IoMail />
              {stud.email}
            </div>
            <div className="flex font-bold text-xl text-gray-600 justify-center items-center gap-4">
              <MdLocationOn className="text-2xl" /> {stud.address}
            </div>
          </div>
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
