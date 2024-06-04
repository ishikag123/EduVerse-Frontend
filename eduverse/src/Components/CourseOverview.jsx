import React from "react";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Context/AccountProvider";
import { enrollStudent } from "../Services/api";

const cloudName = import.meta.env.VITE_CLOUDNAME;

export const CourseOverview = ({ course }) => {
  const { setCID, teacher, student, CID } = useContext(AccountContext);
  const [left, setLeft] = useState(0);

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

  useEffect(() => {
    const num = course.joined_students
      ? course.seats - course.joined_students.length
      : course.seats;
    setLeft(num);
  }, [course]);

  return (
    <div className="h-full w-full flex gap-6 items-center p-6 px-16 mt-20 overflow-auto">
      {course && (
        <>
          <div className="flex flex-col w-1/2 h-full p-6 gap-6">
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${course.demo}`}
              width="640"
              height="360"
              //style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowfullscreen
              frameborder="0"
            ></iframe>
            <div className="flex">
              <h1 className="mr-auto font-bold text-xl">
                Rating: {course.rating}
              </h1>
              <h1 className="font-bold text-xl">Rate</h1>
            </div>
            <h1 className="font-bold text-2xl">Comments</h1>
            <div className="flex flex-col gap-2 ">
              {course.comment &&
                course.comment.map((item) => (
                  <div className="w-full p-2 px-4 shadow-md border-2 rounded-2xl">
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
              <h2>Course status: {course.status}</h2>
              <h2>Course descrpition: {course.description}</h2>
              <h2>Class duration(per week): {course.duration} hrs</h2>
              <h2>Class timimg: {course.timing}</h2>
              <h2>Location: {course.location}</h2>
              <h2>Category: {course.category}</h2>
              <h2>Who can enroll: {course.level}</h2>
              <h2>Prerequisites: {course.prereq}</h2>
              <h2>Start date: {course.startDate}</h2>
              <h2>End date: {course.endDate}</h2>
              <h2>Enrollment ends: {course.enrollmentLastDate}</h2>
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
              {teacher && !student ? (
                <>
                  <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    Edit
                  </button>
                  <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                    End Course
                  </button>
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
                  <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
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
