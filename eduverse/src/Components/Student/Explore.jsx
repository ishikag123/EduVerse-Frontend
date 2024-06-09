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
import { CourseOverview } from "../CourseOverview";
import { TeacherProfile } from "./TeacherProfile";
import { ImSearch } from "react-icons/im";
import { Triangle } from "react-loader-spinner";

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
  const [loading, setLoading] = useState(false);

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
    filteredData = filteredData.sort((a, b) => {
      const ratingA = calculateRating(a);
      const ratingB = calculateRating(b);
      return ratingB - ratingA;
    });
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
    filteredData = filteredData.sort((a, b) => {
      const ratingA = calculateTeacherRating(a);
      const ratingB = calculateTeacherRating(b);
      return ratingB - ratingA;
    });
    setfilteredTeachers(filteredData);
    //console.log(filteredTeachers);
  };

  const viewTeacher = async (id) => {
    setCID("");
    setTID(id);
    //console.log(id);
    setLoading(true);
    try {
      const data = await getTeacherByID(student.token, id);
      if (data) {
        setLoading(false);
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
      setLoading(true);
      try {
        //const token = student.token;
        const data = await getCourses(token);
        if (data) {
          //console.log("data from internal:", data);
          setCourses(data.courses);
          const sortedData = data.courses.sort((a, b) => {
            const ratingA = calculateRating(a);
            const ratingB = calculateRating(b);
            return ratingB - ratingA;
          });
          setLoading(false);
          setFilteredCourse(sortedData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getTeachersInfo = async (token) => {
      setCourse(true);
      setLoading(true);
      try {
        //const token = student.token;
        const data = await getTeachers(token);
        if (data) {
          //console.log("data from internal:", data);
          setLoading(false);
          const sortedData = data.sort((a, b) => {
            const ratingA = calculateTeacherRating(a);
            const ratingB = calculateTeacherRating(b);
            return ratingB - ratingA;
          });
          setTeachers(sortedData);
          setfilteredTeachers(sortedData);
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
      setLoading(true);
      try {
        const data = await getCourseByID(student.token, id);
        if (data) {
          setLoading(false);
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

  // const check = () => {
  //   console.log(teacherData);
  // };

  const calculateRating = (course) => {
    const sum = course ? course.rating.reduce((acc, curr) => acc + curr, 0) : 0;
    const average =
      course && course.rating.length ? sum / course.rating.length : 0;
    return average.toFixed(1);
  };

  const calculateTeacherRating = (teacher) => {
    const sum = teacher
      ? teacher.rating.reduce((acc, curr) => acc + curr, 0)
      : 0;
    const average =
      teacher && teacher.rating.length ? sum / teacher.rating.length : 0;
    return average.toFixed(1);
  };
  //   useEffect(() => {
  //     console.log("saved in state:", teacherData);
  //   }, [teacherData]);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
      {loading ? (
        <div className="h-full w-full flex flex-col gap-4 items-center justify-center p-6 px-16 mt-20 overflow-auto bg-white">
          <Triangle visible={true} height="80" width="80" color="#31869f" />
        </div>
      ) : CID && courseData ? (
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
              className="w-1/8 flex p-4 bg-[#e3c73ffe] text-white shadow-xl rounded-full font-extrabold hover:bg-[#e3c83faf] transition-all ease-in-out text-xl"
              onClick={() => (course ? searchCourses() : filterTeacher())}
            >
              <ImSearch />
            </button>

            {/* <button onClick={() => check()}>Click me</button> */}
          </div>
          <button
            className="w-1/6 flex p-4 bg-teal-600 text-white shadow-xl rounded-3xl font-bold hover:bg-teal-400 transition-all ease-in-out justify-center items-center mx-auto"
            onClick={() => setCourse(!course)}
          >
            {course ? "View Teachers" : "View Courses"}
          </button>
          {course ? (
            <div className="flex justify-center items-center text-center">
              {/* {loading ? (
                <Triangle />
              ) : ( */}
              <table class="table-fixed w-full border">
                <thead className="text-cyan-800 font-bold">
                  <tr>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Course name
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Teacher name
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Topic
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Location
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Rating
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourse &&
                    filteredCourse.map((item) => (
                      <tr className="hover:bg-slate-400 cursor-pointer transition-all ease-in delay-0">
                        <td className="py-2 border-2  bg-[#c4fdfd67] border-[#31869f] px-3">
                          {item.cname}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.teacher_name}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.topic}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.location}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {calculateRating(item)}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3 font-bold text-blue-900 hover:text-cyan-600">
                          <button onClick={() => setCID(item._id)}>View</button>
                          {/* <button>Enroll</button> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* )} */}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              {/* {loading ? (
                <Triangle height="80" width="80" color="#31869f" />
              ) : ( */}
              <table class="table-fixed w-full text-center">
                <thead className="text-cyan-800 font-bold">
                  <tr>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Name
                    </th>
                    {/* <th className="py-4 text-lg font-semibold  border-2 border-[#40C0E7]">
                      Address
                    </th> */}
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Skills
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]">
                      Rating
                    </th>
                    <th className="py-4 text-lg border-2 border-[#31869f]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers &&
                    filteredTeachers.map((item) => (
                      <tr className="hover:bg-slate-400 cursor-pointer transition-all ease-in delay-0">
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.name}
                        </td>
                        {/* <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.address}
                        </td> */}
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {item.skills}
                        </td>
                        <td className="py-2  bg-[#c4fdfd67] border-2 border-[#31869f] px-3">
                          {calculateTeacherRating(item)}
                        </td>
                        <td className="py-2   bg-[#c4fdfd67] border-2 border-[#31869f] px-3 font-bold text-blue-900 hover:text-cyan-600">
                          <button onClick={() => viewTeacher(item.email)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* )} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
