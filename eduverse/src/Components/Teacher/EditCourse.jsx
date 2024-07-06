import React from "react";
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { editCourse, uploadVideo } from "../../Services/api";
import { ImCross } from "react-icons/im";

const cloudName = import.meta.env.VITE_CLOUDNAME;

export const EditCourse = ({ setEditCourse, course }) => {
  const { setTeacher, teacher } = useContext(AccountContext);
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

  const changeVideo = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Choose a photo to change profile picture.");
      return;
    }
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "EduVerse_Preset");
    console.log(video);
    try {
      const vid = await uploadVideo(data);
      setDemo(vid);
      if (vid) alert("Demo video updated!!");
      //console.log(vidURL);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();

    //const created_by = teacher.email;
    //console.log(id);
    const body = JSON.stringify({
      _id: course._id,
      cname,
      topic,
      //created_by,
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
    //console.log(body);
    try {
      const data = await editCourse(teacher.token, body);
      if (!data) console.log("error in edit course api");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCname(course.cname);
    setCategory(course.category);
    setDemo(course.demo);
    setDescription(course.description);
    setDuration(course.duration);
    setEndDate(course.endDate);
    setEnrollmentLastDate(course.enrollmentLastDate);
    setFees(course.fees);
    setLevel(course.level);
    setLocation(course.location);
    setPrereq(course.prereq);
    setSeats(course.seats);
    setStartDate(course.startDate);
    setTiming(course.timing);
    setTopic(course.topic);
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-1 justify-center items-center">
      <button
        onClick={() => setEditCourse("")}
        className="block ml-auto p-4 text-xl"
      >
        <ImCross />
      </button>
      <div className="border-2 shadow-xl w-full h-full rounded-2xl flex md:flex-row flex-col items-center p-4 overflow-auto gap-4">
        <form
          className="flex flex-col gap-4 rounded-lg md:w-1/3 w-full md:h-full md:p-10 p-2 items-center"
          onSubmit={changeVideo}
        >
          {video ? (
            <video
              src={URL.createObjectURL(video)}
              className="w-full rounded-xl "
              controls
            />
          ) : (
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${course.demo}`}
              // width="640"
              height="360"
              //style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowfullscreen
              frameborder="0"
              className="w-full rounded-xl"
            ></iframe>
          )}
          <label
            className="font-semibold cursor-pointer w-full"
            htmlFor="imgFile"
          >
            <div className="bg-[#fee046] hover:bg-[#fdefa8] rounded-xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 cursor-pointer w-full flex  justify-center items-center">
              Choose new demo video
            </div>
          </label>
          <input
            type="file"
            id="imgFile"
            style={{ display: "none" }}
            onChange={(e) => setVideo(e.target.files[0])}
          />

          <button className="bg-[#fee046] hover:bg-[#fdefa8] rounded-xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 w-full">
            Update Demo Video
          </button>
        </form>
        <form
          onSubmit={updateCourse}
          className="items-center md:w-2/3 w-full h-full flex flex-col gap-4 p-4"
        >
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Course Title</h3>
            <input
              type="text"
              placeholder="Course Title"
              value={cname}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setCname(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Course Topic</h3>
            <input
              type="text"
              placeholder="Course Topic"
              value={topic}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">
              Course Description
            </h3>
            <label htmlFor="description">
              <textarea
                cols="150"
                placeholder="Course Description"
                value={description}
                className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">
              Fees (per month in Rs)
            </h3>
            <input
              type="text"
              placeholder="Fees (per month in Rs)"
              value={fees}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setFees(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">
              Course Duration (in hrs per week)
            </h3>
            <input
              type="number"
              placeholder="Course Duration (in hrs per week)"
              value={duration}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Course Timing</h3>
            <input
              type="text"
              placeholder="Class timing"
              value={timing}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setTiming(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Class Location</h3>
            <input
              type="text"
              placeholder="Class Location"
              value={location}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Start Date</h3>
            <input
              type="date"
              placeholder="Start date"
              value={startDate}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">End Date</h3>
            <input
              type="date"
              placeholder="End date"
              value={endDate}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">
              Enrollment Last Date
            </h3>
            <input
              type="date"
              value={enrollmentLastDate}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setEnrollmentLastDate(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Available seats</h3>
            <input
              type="number"
              placeholder="Available seats"
              value={seats}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Category</h3>
            <input
              type="text"
              placeholder="Category"
              value={category}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Who can enroll?</h3>
            <input
              type="text"
              placeholder="Who can enroll?"
              value={level}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-0 justify-center items-center">
            <h3 className="mr-auto text-xs text-gray-400">Prerequisite</h3>
            <input
              type="text"
              placeholder="Prerequisite"
              value={prereq}
              className="border-2 shadow-lg p-2 w-full rounded-lg px-3"
              onChange={(e) => setPrereq(e.target.value)}
            />
          </div>
          <button className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-full ease-in-out">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
