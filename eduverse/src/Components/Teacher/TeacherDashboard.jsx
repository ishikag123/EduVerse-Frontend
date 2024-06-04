import React from "react";
import { useContext, useEffect, useState } from "react";
import img from "../../assets/profile2.jpg";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaStarHalfAlt, FaGraduationCap, FaHeart, FaEye } from "react-icons/fa";
import { AccountContext } from "../../Context/AccountProvider";
import { getTeacherToken } from "../../Services/utils";
import { getMyCourses, getTeacher, getCourseByID } from "../../Services/api";
import { TeacherNav } from "../Navbar/TeacherNav";
import { CourseOverview } from "../CourseOverview";

export const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState();
  const [active, setActive] = useState(false);
  const [categorizedCourses, setCategorizedCourses] = useState({
    upcoming: [],
    active: [],
    inactive: [],
  });
  const { teacher, setTeacher, CID, setCID } = useContext(AccountContext);

  const viewCourse = async (id) => {
    setCID(id);
    //console.log(id);
    try {
      const data = await getCourseByID(teacher.token, id);
      if (data) {
        setCourse(data);
        //console.log(data);
        //console.log("saved in state:", course);
      } else console.log(`${id} not found`);
    } catch (error) {
      console.log(error);
    }
  };

  const checkActive = (end) => {
    const currDate = new Date();
    const endDate = new Date(end);
    if (endDate > currDate) return true;
    else return false;
  };
  //   const currentDate = new Date();

  //   const categorizedCourses = {
  //     upcoming: [],
  //     active: [],
  //     inactive: [],
  //   };

  useEffect(() => {
    setCID("");
    const user = getTeacherToken();
    setTeacher(user);
    //console.log(user);
    const getTeacherInfo = async (token, id) => {
      try {
        const teacher = await getTeacher(token, id);
        if (teacher) {
          //console.log(teacher);
          setTeacherData(teacher);
        } else console.log(`${id} not found`);
      } catch (error) {
        console.log(error);
      }
    };
    const getCourseData = async (token, id) => {
      try {
        const course = await getMyCourses(token, id);
        if (course) {
          //console.log(teacher);
          setCourseData(course);
        } else console.log(`${id} not found`);
      } catch (error) {
        console.log(error);
      }
    };
    getTeacherInfo(user.token, user.email);
    getCourseData(user.token, user.email);
  }, []);

  useEffect(() => {
    const currentDate = new Date();

    const categorized = {
      upcoming: [],
      active: [],
      inactive: [],
    };

    if (!Array.isArray(courseData)) {
      console.error("courses is not an array:", courseData);
      return;
    }

    if (courseData) {
      courseData.forEach((course) => {
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);

        if (startDate > currentDate) {
          categorized.upcoming.push(course);
        } else if (endDate < currentDate) {
          categorized.inactive.push(course);
        } else {
          categorized.active.push(course);
        }
      });
    }

    setCategorizedCourses(categorized);
  }, [courseData]);

  return (
    <div className="h-screen w-full flex flex-col">
      <TeacherNav />

      {CID ? (
        <CourseOverview course={course} />
      ) : (
        <div className="h-full w-full flex gap-4 justify-center items-center p-6 px-16 mt-20">
          <div className="h-full w-1/3 bg-[#0B5078] rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4">
            <img
              src={img}
              alt=""
              className="h-56 w-56 rounded-full shadow-xl mb-12"
            />
            <div className="flex flex-col gap-4 justify-start items-start">
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <BsFillPersonFill className="text-2xl" /> {teacherData.name}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <FaPhoneAlt /> {teacherData.phone}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <IoMail />
                {teacherData.email}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <MdLocationOn className="text-2xl text-left" />
                {teacherData.address}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <FaGraduationCap /> {teacherData.skills}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <FaStarHalfAlt /> {teacherData.rating}
              </div>
              <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
                <h1>{teacherData.experience} years of experience</h1>
              </div>
            </div>
          </div>
          <div className="h-full flex flex-col w-2/3 bg-[#CDE6F5] rounded-2xl shadow-xl gap-4 p-8 overflow-auto">
            <div>
              <h1 className="font-bold text-xl mr-auto">Active Courses</h1>
              <div className=" flex flex-col w-full h-full gap-4 p-4">
                {categorizedCourses.active &&
                  categorizedCourses.active.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
                        <h1 className="font-semibold">{item.cname}</h1>
                        <div className="flex gap-4 ml-auto">
                          <button
                            className="text-[#b39e36] font-bold text-xl hover:text-[#b39e369e] transition-all ease-in delay-75"
                            onClick={() => viewCourse(item._id)}
                          >
                            <FaEye />
                          </button>
                          <div className="text-[#0B5078] font-bold  flex gap-1 justify-center items-center">
                            <BsFillPeopleFill />
                            {courseData.joined_students
                              ? courseData.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {courseData.rating ? courseData.rating : 0}
                          </div>
                        </div>
                      </div>
                    )
                    //   ) : (
                    //     <></>
                    //   )
                  )}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl mr-auto">Upcoming Courses</h1>
              <div className=" flex flex-col w-full h-full gap-4 p-4">
                {categorizedCourses.upcoming &&
                  categorizedCourses.upcoming.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
                        <h1 className="font-semibold">{item.cname}</h1>
                        <div className="flex gap-4 ml-auto">
                          <button
                            className="text-[#b39e36] font-bold text-xl hover:text-[#b39e369e] transition-all ease-in delay-75"
                            onClick={() => viewCourse(item._id)}
                          >
                            <FaEye />
                          </button>
                          <div className="text-[#0B5078] font-bold  flex gap-1 justify-center items-center">
                            <BsFillPeopleFill />
                            {courseData.joined_students
                              ? courseData.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {courseData.rating ? courseData.rating : 0}
                          </div>
                        </div>
                      </div>
                    )
                    //   ) : (
                    //     <></>
                    //   )
                  )}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl mr-auto">Inactive Courses</h1>
              <div className=" flex flex-col w-full h-full gap-4 p-4">
                {categorizedCourses.inactive &&
                  categorizedCourses.inactive.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
                        <h1 className="font-semibold">{item.cname}</h1>
                        <div className="flex gap-4 ml-auto">
                          <button
                            className="text-[#b39e36] font-bold text-xl hover:text-[#b39e369e] transition-all ease-in delay-75"
                            onClick={() => viewCourse(item._id)}
                          >
                            <FaEye />
                          </button>
                          <div className="text-[#0B5078] font-bold  flex gap-1 justify-center items-center">
                            <BsFillPeopleFill />
                            {courseData.joined_students
                              ? courseData.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {courseData.rating ? courseData.rating : 0}
                          </div>
                        </div>
                      </div>
                    )
                    //   ) : (
                    //     <></>
                    //   )
                  )}
              </div>
            </div>
            {/* <button className="bg-[#fee046] hover:bg-[#fdefa8] rounded-2xl shadow-xl p-4 ml-auto mt-auto font-semibold transition-all ease-in delay-75">
              Create Course
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
