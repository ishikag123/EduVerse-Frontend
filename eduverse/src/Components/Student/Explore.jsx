import React from "react";
import { useState, useContext, useEffect } from "react";
import { StudentNav } from "../Navbar/StudentNav";
import { AccountContext } from "../../Context/AccountProvider";
import { getTeachers, getCourses, getCourseByID } from "../../Services/api";
import { getStudentToken } from "../../Services/utils";
import { CourseOverview } from "./CourseOverview";

export const Explore = () => {
  const { stoken, smail, setStudent, student, setViewCourse } =
    useContext(AccountContext);
  const [course, setCourse] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [CID, setCID] = useState("");
  const [courseData, setCourseData] = useState();
  //const [loading, setLoading] = useState(false);
  //const [student, setStudent] = useState({});

  useEffect(() => {
    const user = getStudentToken();
    setStudent(user);
    const getCoursesInfo = async (token) => {
      setCourse(false);
      try {
        //const token = student.token;
        const data = await getCourses(token);
        if (data) {
          //console.log("data from internal:", data);
          setCourses(data.courses);
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTeachersInfo(user.token);
    getCoursesInfo(user.token);
  }, []);

  //   useEffect(() => {
  //     const user = getStudentToken();
  //     setStudent(user);
  //     //console.log(user);
  //     // getTeachersInfo(user.token);
  //     // console.log(teachers);
  //     getCoursesInfo(user.token);
  //     console.log("Saved in courses state:", courses);
  //   }, []);

  //   useEffect(() => {
  //     if (!course) {
  //       getTeachersInfo();
  //       console.log(teachers);
  //     } else {
  //       getCoursesInfo();
  //       console.log(courses);
  //     }
  //   }, [course]);

  const check = () => {
    console.log("Saved in teachers state:", courses);
    console.log("Saved in courses state:", courses);
  };

  const viewCourse = async (id) => {
    setCID(id);
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

  //   useEffect(() => {
  //     console.log("saved in state:", courseData);
  //   }, [courseData]);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
      {CID ? (
        <CourseOverview setCID={setCID} course={courseData} />
      ) : (
        <div className="h-full w-full flex flex-col gap-4 items-center p-6 px-16 mt-20 overflow-auto">
          <div className="flex w-full gap-4 justify-center items-center p-10">
            {course ? (
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
              />
            ) : (
              <input
                type="text"
                placeholder="Name of the teacher"
                className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
              />
            )}

            <input
              type="text"
              placeholder="Search by Location"
              className="w-1/2 flex p-4 px-6 bg-white shadow-xl rounded-3xl border-2"
            />
            <button className="w-1/8 flex p-4 px-6 bg-[#e3c73ffe] text-white shadow-xl rounded-3xl font-bold hover:bg-[#e3c83faf] transition-all ease-in-out">
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
                  {courses &&
                    courses.map((item) => (
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
                          <button onClick={() => viewCourse(item._id)}>
                            View
                          </button>
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
                    <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Address
                    </th>
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
                  {teachers &&
                    teachers.map((item) => (
                      <tr>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.name}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.address}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.skills}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.rating}
                        </td>
                        <td className="py-2 bg-gray-100 border-2 border-[#4d84d6] px-3">
                          {item.rating}
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
