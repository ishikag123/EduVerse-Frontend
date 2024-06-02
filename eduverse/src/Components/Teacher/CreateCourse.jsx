import React from "react";
import { useState, useContext, useEffect } from "react";
import { getTeacherToken } from "../../Services/utils";
import { AccountContext } from "../../Context/AccountProvider";
import { TeacherNav } from "../Navbar/TeacherNav";
import { createCourse } from "../../Services/api";

export const CreateCourse = () => {
  const { teacher, setTeacher } = useContext(AccountContext);
  const [cname, setCname] = useState("");
  const [description, setDescription] = useState("");
  const [prereq, setPrereq] = useState("");
  const [duration, setDuration] = useState(0);
  const [timing, setTiming] = useState("");
  const [topic, setTopic] = useState("");
  const [fees, setFees] = useState("");
  const [demo, setDemo] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enrollmentLastDate, setEnrollmentLastDate] = useState("");
  const [seats, setSeats] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created_by = teacher.email;
    const body = JSON.stringify({
      cname,
      topic,
      created_by,
      description,
      duration,
      timing,
      location,
      category,
      level,
      startDate,
      endDate,
      enrollmentLastDate,
      seats,
      fees,
      prereq,
      demo,
    });
    await createCourse(body, teacher.token);
  };

  useEffect(() => {
    const user = getTeacherToken();
    setTeacher(user);
    //console.log(teacher);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <TeacherNav />
      <div className="h-full w-full flex gap-4 justify-center items-center p-6 px-16 mt-20">
        <form
          className="border-black border-2 shadow-xl w-full h-full rounded-2xl flex gap-4 justify-center items-center p-4 overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 justify-center items-center w-1/2 h-full">
            <input
              type="text"
              placeholder="Course Title"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              required="true"
              onChange={(e) => setCname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Topic"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setTopic(e.target.value)}
            />
            <label htmlFor="description">
              <textarea
                cols="90"
                placeholder="Course Description"
                className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
                required="true"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            <input
              type="text"
              placeholder="Fees (per month in Rs)"
              required="true"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setFees(e.target.value)}
            />

            <div className="border-2 shadow-lg p-2 w-full h-1/2 rounded-lg px-3">
              Demo Video
            </div>
            <input
              type="text"
              placeholder="Prerequisite"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setPrereq(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 justify-center items-center w-1/2 h-full">
            <input
              type="number"
              placeholder="Course Duration (in hrs per week)"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              required="true"
              onChange={(e) => setDuration(e.target.value)}
            />
            <input
              type="text"
              placeholder="Class timing"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              required="true"
              onChange={(e) => setTiming(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              required="true"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label className="flex w-full gap-2 justify-center items-center pl-2">
              Start Date :
              <input
                type="date"
                placeholder="Start date"
                className="border-2 shadow-lg p-2 w-5/6 ml-auto rounded-lg px-3"
                required="true"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="flex w-full gap-2 justify-center items-center pl-2">
              End Date :
              <input
                type="date"
                placeholder="End date"
                className="border-2 shadow-lg p-2 w-5/6 ml-auto rounded-lg px-3"
                required="true"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label className="flex w-full gap-2 justify-center items-center pl-2">
              Enrollment ends:
              <input
                type="date"
                placeholder="Enrollment ends on"
                className="border-2 shadow-lg p-2 w-5/6 ml-auto rounded-lg px-3"
                required="true"
                onChange={(e) => setEnrollmentLastDate(e.target.value)}
              />
            </label>
            <input
              type="number"
              placeholder="Available seats"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              required="true"
              onChange={(e) => setSeats(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Who can enroll?"
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setLevel(e.target.value)}
            />
            <button className="bg-[#fee046] hover:bg-[#fdefa8] rounded-2xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 w-full">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
