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
import { Triangle } from "react-loader-spinner";

export const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [categorizedCourses, setCategorizedCourses] = useState({
    upcoming: [],
    active: [],
    inactive: [],
  });
  const { teacher, setTeacher, CID, setCID, setStudent, setStudCourse } =
    useContext(AccountContext);

  const viewCourse = async (id) => {
    setCID(id);
    //console.log(id);
    setLoading(true);
    try {
      const data = await getCourseByID(teacher.token, id);
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

  //   const currentDate = new Date();

  //   const categorizedCourses = {
  //     upcoming: [],
  //     active: [],
  //     inactive: [],
  //   };
  const calculateTeacherRating = (teacher) => {
    const sum = teacher
      ? teacher.rating.reduce((acc, curr) => acc + curr, 0)
      : 0;
    const average =
      teacher && teacher.rating.length ? sum / teacher.rating.length : 0;
    setAvgRating(average.toFixed(1));
  };

  const calculateRating = (course) => {
    const sum = course ? course.rating.reduce((acc, curr) => acc + curr, 0) : 0;
    const average =
      course && course.rating.length ? sum / course.rating.length : 0;
    return average.toFixed(1);
  };

  useEffect(() => {
    setCID("");
    const user = getTeacherToken();
    setTeacher(user);
    setStudent(null);
    setStudCourse(false);
    setLoading(true);
    //console.log(user);
    const getTeacherInfo = async (token, id) => {
      try {
        const teacher = await getTeacher(token, id);
        if (teacher) {
          //console.log(teacher);
          setLoading(false);
          setTeacherData(teacher);
          calculateTeacherRating(teacher);
        } else console.log(`${id} not found`);
      } catch (error) {
        console.log(error);
      }
    };
    const getCourseData = async (token, id) => {
      try {
        const course = await getMyCourses(token, id);
        if (course) {
          //console.log(course);
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

      {loading ? (
        <div className="h-full w-full flex items-center justify-center p-6 px-16 mt-20">
          <Triangle visible={true} height="80" width="80" color="#31869f" />
        </div>
      ) : CID ? (
        <CourseOverview course={course} />
      ) : (
        <div className="h-full w-full flex md:flex-row flex-col gap-4 sm:justify-center sm:items-center sm:p-6 p-2 md:px-16 mt-20">
          <div className="md:h-full sm:h-1/2 h-1/3 md:w-1/3 w-full bg-[#0B5078] rounded-2xl shadow-xl flex md:flex-col justify-center items-center md:gap-4 sm:gap-12 gap-4 md:p-0 p-4">
            <img
              src={teacherData.dp ? teacherData.dp : img}
              alt=""
              className="sm:h-56 sm:w-56 h-36 w-36 sm:rounded-full rounded-xl shadow-xl md:mb-6"
            />
            <div className="flex flex-col sm:gap-4 gap-1 justify-start items-start sm:p-0 py-8 overflow-x-auto">
              <div className="flex font-semibold sm:text-xl text-white justify-center items-center gap-4">
                <BsFillPersonFill className="sm:text-2xl text-xl" />{" "}
                {teacherData.name}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <FaPhoneAlt /> {teacherData.phone}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <IoMail />
                {teacherData.email}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <MdLocationOn className="text-xl text-left" />
                {teacherData.address}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <FaGraduationCap /> {teacherData.skills}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <FaStarHalfAlt /> {avgRating}
              </div>
              <div className="flex font-semibold sm:text-lg text-white justify-center items-center gap-4">
                <h1>
                  {teacherData.experience ? teacherData.experience : 0} years of
                  experience
                </h1>
              </div>
            </div>
          </div>
          <div className="md:h-full flex flex-col md:w-2/3 w-full bg-[#CDE6F5] rounded-2xl shadow-xl gap-3 md:p-8 sm:p-6 p-4 overflow-auto">
            <div>
              <h1 className="font-bold text-xl mr-auto">Active Courses</h1>
              <div className="flex flex-col w-full h-full gap-4 sm:p-4 p-2">
                {categorizedCourses.active &&
                  categorizedCourses.active.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 sm:px-6 bg-white shadow-xl sm:rounded-3xl rounded-xl">
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
                            {item.joined_students
                              ? item.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {calculateRating(item)}
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
              <div className=" flex flex-col w-full h-full gap-4 sm:p-4 p-2">
                {categorizedCourses.upcoming &&
                  categorizedCourses.upcoming.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 sm:px-6 bg-white shadow-xl sm:rounded-3xl rounded-xl">
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
                            {item.joined_students
                              ? item.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {calculateRating(item)}
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
              <div className=" flex flex-col w-full h-full gap-4 sm:p-4 p-2">
                {categorizedCourses.inactive &&
                  categorizedCourses.inactive.map(
                    (item) => (
                      //   checkActive(item.endDate) ? (
                      <div className="w-full flex p-4 sm:px-6 bg-white shadow-xl sm:rounded-3xl rounded-xl">
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
                            {item.joined_students
                              ? item.joined_students.length
                              : 0}
                          </div>
                          <div className="text-red-700 font-bold flex gap-1 justify-center items-center">
                            <FaHeart />
                            {calculateRating(item)}
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
