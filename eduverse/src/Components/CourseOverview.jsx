import React from "react";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Context/AccountProvider";
import {
  courseComment,
  enrollStudent,
  rateCourse,
  wishlistCourse,
} from "../Services/api";
import ReactStars from "react-rating-stars-component";
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { formatDate } from "../Services/utils";
import { Enrollments } from "./Teacher/Enrollments";
import { EditCourse } from "./Teacher/EditCourse";

const cloudName = import.meta.env.VITE_CLOUDNAME;

export const CourseOverview = ({ course }) => {
  const { setCID, teacher, student, CID, studCourse } =
    useContext(AccountContext);
  const [left, setLeft] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [rate, setRate] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [viewComm, setViewComm] = useState(false);
  const [editCourse, setEditCourse] = useState(false);

  const handleViewEnrollment = (course) => {
    if (course.joined_students && course.joined_students.length !== 0) {
      setShowEnrollment(true);
    } else {
      setShowEnrollment(false);
      alert("No enrollments to show!!!");
    }
  };

  const enroll = async () => {
    const email = student.email;
    const cid = CID;
    const body = JSON.stringify({
      cid,
      email,
    });
    try {
      const data = await enrollStudent(student.token, body);
      if (data) {
        //console.log(data);
      } else console.log("not enrolled");
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      const body = JSON.stringify({
        cid: CID,
        comment,
      });
      try {
        const data = await courseComment(student.token, body);
        if (data) {
          //window.location.reload;
          //alert("Comment added!!!");
          setComments([...comments, comment]);
          setViewComm(true);
          setComment("");
        } else console.log("error commenting");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const wishlist = async (cid, cname) => {
    const body = {
      email: student.email,
      cid,
      cname,
    };
    try {
      await wishlistCourse(student.token, body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (course) {
      const num = course.joined_students
        ? course.seats - course.joined_students.length
        : course.seats;

      setLeft(num);
      setComments(course ? course.comment : []);
      calculateRating();
      checkActivity(course.startDate, course.endDate);
      setStartDate(formatDate(course.startDate));
      setEndDate(formatDate(course.endDate));
      setEnrollDate(formatDate(course.enrollmentLastDate));
    }
    //console.log(student);
  }, [course]);

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const giveRating = async () => {
    if (rate > 0) {
      const body = {
        cid: CID,
        rating: rate,
      };
      try {
        const data = await rateCourse(student.token, body);
        if (data) calculateRating();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    giveRating();
  }, [rate]);

  const calculateRating = () => {
    const sum = course ? course.rating.reduce((acc, curr) => acc + curr, 0) : 0;
    const average =
      course && course.rating.length ? sum / course.rating.length : 0;
    setAvgRating(average.toFixed(1));
  };

  const checkActivity = (start, end) => {
    const currDate = new Date();
    const endDate = new Date(start);
    const startDate = new Date(end);
    if (startDate > currDate) setStatus("Upcoming");
    else if (endDate > currDate) setStatus("Active");
    else setStatus("Inactive");
  };

  return (
    <div className="h-full w-full flex md:flex-row flex-col gap-6 items-center md:p-6 md:px-16 p-3 mt-20">
      {course &&
        (showEnrollment ? (
          <Enrollments
            enrollments={course.joined_students}
            setShowEnrollment={setShowEnrollment}
            cname={course.cname}
          />
        ) : editCourse ? (
          <EditCourse setEditCourse={setEditCourse} course={course} />
        ) : (
          <>
            <div className="flex flex-col md:w-1/2 w-full md:h-full md:p-6 p-2 gap-4">
              <button
                onClick={() => setCID("")}
                className="md:hidden block ml-auto p-4 text-xl"
              >
                <ImCross />
              </button>
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
              <div className="flex justify-center items-center">
                <div className="mr-auto flex justify-center items-center gap-1">
                  <h1 className="font-bold text-xl">Rating: </h1>
                  <h1
                    className={
                      avgRating > 3
                        ? "font-bold text-xl text-green-600"
                        : "font-bold text-xl text-red-600"
                    }
                  >
                    {avgRating}
                  </h1>
                </div>
                {studCourse ? (
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={32}
                    activeColor="#ffd700"
                  />
                ) : (
                  <></>
                )}
              </div>
              <h1 className="font-bold text-2xl">Comments</h1>

              <div className="flex flex-col gap-4 w-full justify-center items-center">
                {studCourse ? (
                  <form
                    action=""
                    onSubmit={submitComment}
                    className="flex gap-4 w-full justify-center items-center"
                  >
                    <input
                      type="text"
                      className="w-full p-2 px-4 border-2 shadow-md rounded-xl"
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Comment..."
                    />
                    <button className="hover:text-[#f4d84c] text-2xl transition-all ease-in">
                      <IoSend />
                    </button>
                  </form>
                ) : (
                  <></>
                )}
                {!viewComm ? (
                  <button
                    onClick={() => setViewComm(true)}
                    className="md:hidden flex p-3 rounded-2xl border-2 w-full shadow-lg justify-center items-center text-gray-500 font-semibold"
                  >
                    <h1 className="mr-auto">View all comments</h1>
                    <RiArrowDownDoubleFill className="font-bold text-3xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => setViewComm(false)}
                    className="md:hidden flex p-3 rounded-2xl border-2 w-full shadow-lg justify-center items-center text-gray-500 font-semibold"
                  >
                    <h1 className="mr-auto">Close Comments</h1>
                    <RiArrowUpDoubleFill className="font-bold text-3xl" />
                  </button>
                )}
                {comments &&
                  comments.map((item) => (
                    <div
                      className={
                        viewComm
                          ? "w-full p-2 px-4 shadow-md border-2 rounded-xl"
                          : "w-full p-2 px-4 shadow-md border-2 rounded-xl md:block hidden"
                      }
                    >
                      {item}
                    </div>
                  ))}
              </div>
            </div>

            <div className="md:w-1/2 w-full md:h-full flex flex-col gap-4 md:p-0 p-6 text-lg sm:text-base">
              <h1 className="font-bold sm:text-2xl text-3xl">
                Course Overview
              </h1>
              <div className="flex flex-col ">
                <h2>Course name: {course.cname}</h2>
                <h2>Course topic: {course.topic}</h2>
                <h2>Course status: {status}</h2>
                <h2>Course descrpition: {course.description}</h2>
                <h2>Class duration(per week): {course.duration} hrs</h2>
                <h2>Class timimg: {course.timing}</h2>
                <h2>Location: {course.location}</h2>
                <h2>Category: {course.category}</h2>
                <h2>Who can enroll: {course.level}</h2>
                <h2>Prerequisites: {course.prereq}</h2>
                <h2>Start date: {startDate}</h2>
                <h2>End date: {endDate}</h2>
                <h2>Enrollment ends: {enrollDate}</h2>
                <h2>Fees: Rs {course.fees}</h2>
                <h2>
                  Already enrolled:{" "}
                  {course.joined_students ? course.joined_students.length : 0}
                </h2>
                <h2>Seats left :{left}</h2>
                {/* <h1 className="font-bold text-xl">Contact</h1> */}
                <h2>Contact: {course.created_by}</h2>
              </div>
              <div className="w-full flex gap-4">
                {!studCourse ? (
                  <>
                    <button
                      className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
                      onClick={() => setEditCourse(true)}
                    >
                      Edit
                    </button>
                    {/* <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    End Course
                  </button> */}
                    <button
                      className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl sm:w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
                      onClick={() => handleViewEnrollment(course)}
                    >
                      View Enrollments
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
                      onClick={() => enroll()}
                    >
                      Enroll
                    </button>
                    <button
                      className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
                      onClick={() => wishlist(course._id, course.cname)}
                    >
                      Wishlist
                    </button>
                  </>
                )}
                <button
                  onClick={() => setCID("")}
                  className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75 md:block hidden"
                >
                  Back
                </button>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};
