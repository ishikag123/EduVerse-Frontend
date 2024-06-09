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
import { formatDate } from "../Services/utils";

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
        setComment("");
      } else console.log("error commenting");
    } catch (error) {
      console.log(error);
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
    <div className="h-full w-full flex gap-6 items-center p-6 px-16 mt-20">
      {course && (
        <>
          <div className="flex flex-col w-1/2 h-full p-6 gap-4">
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
              {comments &&
                comments.map((item) => (
                  <div className="w-full p-2 px-4 shadow-md border-2 rounded-xl">
                    {item}
                  </div>
                ))}
            </div>
          </div>

          <div className="w-1/2 h-full flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Course Overview</h1>
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
                  <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    Edit
                  </button>
                  {/* <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    End Course
                  </button> */}
                  <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    Enrollments
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
                className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75"
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
