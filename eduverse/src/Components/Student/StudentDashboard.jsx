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
import {
  getStudent,
  getAllStudents,
  getEnrolledCourses,
  getCourseByID,
  unEnrollStudent,
  removeCourseFromWishlist,
} from "../../Services/api";
import { CourseOverview } from "../CourseOverview";
import { MdLogout } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Triangle } from "react-loader-spinner";

export const StudentDashboard = () => {
  const {
    stoken,
    smail,
    setStudent,
    student,
    CID,
    setCID,
    setTeacher,
    setStudCourse,
  } = useContext(AccountContext);
  const [stud, setStud] = useState({});
  const [myCourses, setMyCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  const viewCourse = async (id) => {
    setCID(id);
    //console.log(id);
    setLoading(true);
    try {
      const data = await getCourseByID(student.token, id);
      if (data) {
        setLoading(false);
        setCourse(data);
        //console.log(data);
        //console.log("saved in state:", course);
      } else console.log(`${id} not found`);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveCourse = async (id) => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave the course?"
    );
    if (!confirmLeave) return;
    const email = student.email;
    const cid = id;
    const body = JSON.stringify({
      cid,
      email,
    });
    try {
      const data = await unEnrollStudent(student.token, body);
      // if (data) {
      //   //console.log(data);
      // } else console.log("not enrolled");
      if (data) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (id) => {
    const confirmLeave = window.confirm(
      "Are you sure you want to remove the course from wishlist?"
    );
    if (!confirmLeave) return;
    const body = {
      _id: stud._id,
      cid: id,
    };
    try {
      const data = await removeCourseFromWishlist(student.token, body);
      // if (data) {
      //   //console.log(data);
      // } else console.log("not enrolled");
      if (data) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCID("");
    const user = getStudentToken();
    setStudent(user);
    setTeacher(null);
    setStudCourse(true);
    const token = user.token;
    const mail = user.email;
    setLoading(true);
    const getInfo = async () => {
      try {
        let student = await getStudent(mail, token);
        //console.log("response:", student);
        if (student) {
          setLoading(false);
          setStud(student);
        } else {
          console.error("No student data received");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    const getMyCourses = async () => {
      try {
        const courses = await getEnrolledCourses(token, mail);
        if (courses) setMyCourses(courses);
        else console.log("No course found");
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
    getMyCourses();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
      {loading ? (
        <div className="h-full w-full flex items-center justify-center p-6 px-16 mt-20">
          <Triangle visible={true} height="80" width="80" color="#31869f" />
        </div>
      ) : CID ? (
        <CourseOverview course={course} />
      ) : (
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
          <div className="h-full flex w-2/3 bg-[#ffe45b80] rounded-2xl shadow-xl gap-3 p-8">
            <div className="w-1/2 flex flex-col h-full justify-center items-center">
              <h1 className="font-bold text-xl text-gray-600">
                Enrolled Courses
              </h1>
              <div className="overflow-auto flex flex-col w-full h-full gap-4 p-4">
                {myCourses &&
                  myCourses.map((item) => (
                    <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
                      <h1 className="font-semibold">{item.cname}</h1>
                      <div className="flex gap-3 justify-center items-center ml-auto">
                        <button
                          className=" font-bold text-xl text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out"
                          onClick={() => viewCourse(item._id)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="font-bold text-xl text-red-600 hover:text-red-400 transition-all ease-in-out"
                          onClick={() => leaveCourse(item._id)}
                        >
                          <MdLogout />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-1/2 flex flex-col h-full  justify-center items-center">
              <h1 className="font-bold text-xl text-gray-600">My Wishlist</h1>
              <div className="overflow-auto flex flex-col w-full h-full gap-4 p-4">
                {stud.wishlist &&
                  stud.wishlist.map((item) => (
                    <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
                      <h1 className="font-semibold">{item.cname}</h1>
                      <div className="flex gap-3 justify-center items-center ml-auto">
                        <button
                          className=" font-bold text-xl text-[#0B5078] hover:text-[#0b50789e] transition-all ease-in-out"
                          onClick={() => viewCourse(item.cid)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="font-bold  text-red-600 hover:text-red-400 transition-all ease-in-out"
                          onClick={() => removeFromWishlist(item.cid)}
                        >
                          <ImBin />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
