import React from "react";
import { useState, useContext, useEffect } from "react";
import { StudentNav } from "../Navbar/StudentNav";
import { AccountContext } from "../../Context/AccountProvider";
import {
  getTeachers,
  getCourses,
  getCourseByID,
  getTeacherByID,
  getCourseByTeacher,
} from "../../Services/api";
import { getStudentToken } from "../../Services/utils";
import { CourseOverview } from "./CourseOverview";
import { TeacherProfile } from "./TeacherProfile";

export const Explore = () => {
  const { stoken, smail, setStudent, student, CID, setCID, TID, setTID } =
    useContext(AccountContext);
  const [course, setCourse] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [filteredTeachers, setfilteredTeachers] = useState([]);
  const [searchTopic, setSearchTopic] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [courseData, setCourseData] = useState();
  const [teacherData, setTeacherData] = useState();
  const [coursesByTeacher, setCoursesByTeacher] = useState([]);

  const searchCourses = () => {
    let filteredData = courses;
    if (searchTopic !== "") {
      filteredData = filteredData.filter(
        (item) =>
          item.topic.toLowerCase().includes(searchTopic.toLowerCase()) ||
          item.cname.toLowerCase().includes(searchTopic.toLowerCase())
      );
    }
    if (searchLocation !== "") {
      filteredData = filteredData.filter((item) =>
        item.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    setFilteredCourse(filteredData);
    //console.log(filteredData);
  };
  const filterTeacher = () => {
    let filteredData = teachers;
    if (searchTeacher !== "") {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchTeacher.toLowerCase())
      );
    }
    if (searchLocation !== "") {
      filteredData = filteredData.filter((item) =>
        item.address.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    setfilteredTeachers(filteredData);
    console.log(filteredTeachers);
  };

  const viewTeacher = async (id) => {
    setCID("");
    setTID(id);
    //console.log(id);
    try {
      const data = await getTeacherByID(student.token, id);
      if (data) {
        setTeacherData(data);
        //console.log(data);
        //console.log("saved in state:", courseData);
      } else console.log(`${id} not found`);
    } catch (error) {
      console.log(error);
    }
    try {
      const data = await getCourseByTeacher(student.token, id);
      if (data) setCoursesByTeacher(data);
      else console.log("No courses found");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getStudentToken();
    setStudent(user);
    setCID("");
    setTID("");
    const getCoursesInfo = async (token) => {
      setCourse(false);
      try {
        //const token = student.token;
        const data = await getCourses(token);
        if (data) {
          //console.log("data from internal:", data);
          setCourses(data.courses);
          setFilteredCourse(data.courses);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getTeachersInfo = async (token) => {
      setCourse(true);
      try {
        //const token = student.token;
        const data = await getTeachers(token);
        if (data) {
          //console.log("data from internal:", data);
          setTeachers(data);
          setfilteredTeachers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTeachersInfo(user.token);
    getCoursesInfo(user.token);
  }, []);

  useEffect(() => {
    const viewCourse = async (id) => {
      //setCID(id);
      //console.log(id);
      try {
        const data = await getCourseByID(student.token, id);
        if (data) {
          setCourseData(data);
          //console.log(data);
          //console.log("saved in state:", courseData);
        } else console.log(`${id} not found`);
      } catch (error) {
        console.log(error);
      }
    };
    if (CID) viewCourse(CID);
  }, [CID]);

  const check = () => {
    console.log(teacherData);
  };

  //   useEffect(() => {
  //     console.log("saved in state:", teacherData);
  //   }, [teacherData]);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
      {CID && courseData ? (
        <CourseOverview course={courseData} />
      ) : TID && teacherData ? (
        <TeacherProfile teacher={teacherData} courses={coursesByTeacher} />
      ) : (
        <div className="h-full w-full flex flex-col gap-4 items-center p-6 px-16 mt-20 overflow-auto">
          <div className="flex w-full gap-4 justify-center items-center p-10">
            {course ? (
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
                onChange={(e) => setSearchTopic(e.target.value)}
              />
            ) : (
              <input
                type="text"
                placeholder="Name of the teacher"
                className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
                onChange={(e) => setSearchTeacher(e.target.value)}
              />
            )}

            <input
              type="text"
              placeholder="Search by Location"
              className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button
              className="w-1/8 flex p-4 px-6 bg-[#e3c73ffe] text-white shadow-xl rounded-3xl font-bold hover:bg-[#e3c83faf] transition-all ease-in-out"
              onClick={() => (course ? searchCourses() : filterTeacher())}
            >
              Search
            </button>
            {course ? (
              <button
                className="w-1/8 flex p-4 px-6 bg-[#e3c73ffe] text-white shadow-xl rounded-3xl font-bold hover:bg-[#e3c83faf] transition-all ease-in-out"
                onClick={() => setCourse(false)}
              >
                Teachers
              </button>
            ) : (
              <button
                className="w-1/8 flex p-4 px-6 bg-[#e3c73ffe] text-white shadow-xl rounded-3xl font-bold hover:bg-[#e3c83faf] transition-all ease-in-out "
                onClick={() => setCourse(true)}
              >
                Courses
              </button>
            )}

            {/* <button onClick={() => check()}>Click me</button> */}
          </div>
          {course ? (
            <div>
              <table class="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Course name
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Teacher name
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Topic
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Location
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Rating
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourse &&
                    filteredCourse.map((item) => (
                      <tr>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.cname}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.teacher_name}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.topic}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.location}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.rating}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3 flex gap-2">
                          <button onClick={() => setCID(item._id)}>View</button>
                          <button>Enroll</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table class="table-fixed w-full  ">
                <thead>
                  <tr>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Name
                    </th>
                    {/* <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Address
                    </th> */}
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Skills
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Rating
                    </th>
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers &&
                    filteredTeachers.map((item) => (
                      <tr>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.name}
                        </td>
                        {/* <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.address}
                        </td> */}
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.skills}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.rating}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          <button onClick={() => viewTeacher(item.email)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
