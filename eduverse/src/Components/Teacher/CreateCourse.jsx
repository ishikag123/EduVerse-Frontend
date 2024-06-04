import React from "react";
import { useState, useContext, useEffect } from "react";
import { getTeacherToken } from "../../Services/utils";
import { AccountContext } from "../../Context/AccountProvider";
import { TeacherNav } from "../Navbar/TeacherNav";
import { createCourse, uploadVideo } from "../../Services/api";

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
  const [video, setVideo] = useState();

  const uploadDemoVideo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "EduVerse_Preset");
    console.log(video);
    try {
      const vid = await uploadVideo(data);
      setDemo(vid);
      if (vid) alert("Demo video uploaded!!");
      //console.log(vidURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (demo == "") alert("Demo Video required!!!");
    else {
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
    }
  };

  useEffect(() => {
    const user = getTeacherToken();
    setTeacher(user);
    //console.log(teacher);
  }, []);

  useEffect(() => {
    console.log(video);
  }, [video]);

  return (
    <div className="h-screen w-full flex flex-col">
      <TeacherNav />
      <div className="h-full w-full flex gap-4 justify-center items-center p-6 px-16 mt-20">
        <div className="border-black border-2 shadow-xl w-full h-full rounded-2xl flex flex-col gap-2 justify-center items-center p-4 overflow-auto">
          <form
            className="flex w-full justify-center items-center p-4 rounded-xl bg-slate-100 gap-4"
            onSubmit={uploadDemoVideo}
          >
            <label
              className="p-3 shadow-lg border-2 rounded-lg bg-white font-semibold cursor-pointer"
              htmlFor="vidFile"
            >
              {video ? video.name : "Choose Demo Video File"}
            </label>
            <input
              type="file"
              id="vidFile"
              required="true"
              style={{ display: "none" }}
              onChange={(e) => setVideo(e.target.files[0])}
            />

            <button className="bg-[#fee046] hover:bg-[#fdefa8] rounded-xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 ">
              Upload
            </button>
          </form>
          <form onSubmit={handleSubmit} className="w-full h-full flex gap-4 ">
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
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-1/2 h-full">
              <label className="flex w-full gap-2 justify-center items-center pl-2">
                Start Date :
                <input
                  type="date"
                  placeholder="Start date"
                  className="border-2 shadow-lg p-2 w-5/6 ml-auto rounded-lg px-3"
                  required="true"
                  onChange={(e) => setStartDate(e.target.value)}
                  id="startDate"
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
              <input
                type="text"
                placeholder="Prerequisite"
                className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
                onChange={(e) => setPrereq(e.target.value)}
              />
              <button
                className={
                  demo
                    ? "bg-[#fee046] hover:bg-[#fdefa8] rounded-2xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 w-full"
                    : "bg-[#bdbbb0] text-gray-500 rounded-2xl shadow-xl p-3 font-semibold w-full cursor-default"
                }
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
