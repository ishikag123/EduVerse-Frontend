import React from "react";
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";

export const CourseOverview = ({ course }) => {
  const { setCID } = useContext(AccountContext);
  return (
    <div className="h-full w-full flex gap-6 items-center p-6 px-16 mt-20 overflow-auto">
      {course && (
        <>
          <div className="flex flex-col w-1/2 h-full p-6 gap-6">
            <iframe
              src="https://www.youtube.com/embed/Rgx8dpiPwpA"
              frameborder="0"
              className="rounded-2xl shadow-xl w-full h-3/5"
            ></iframe>
            <div className="flex">
              <h1 className="mr-auto font-bold text-xl">
                Rating: {course.rating}
              </h1>
              <h1 className="font-bold text-xl">Rate</h1>
            </div>
            <h1 className="font-bold text-2xl">Comments</h1>
            <div className="flex flex-col gap-2 ">
              {course.comment.map((item) => (
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
              <h2>Level: {course.level}</h2>
              <h2>Prerequisites: {course.prereq}</h2>
              <h2>Start date: {course.startDate}</h2>
              <h2>End date: {course.endDate}</h2>
              <h2>Enrollment ends: {course.enrollmentLastDate}</h2>
              <h2>Fees: Rs {course.fees}</h2>
              <h2>Already enrolled: </h2>
              <h2>Seats left: </h2>
              {/* <h1 className="font-bold text-xl">Contact</h1> */}
              <h2>Contact: {course.created_by}</h2>
            </div>
            <div className="w-full flex gap-4">
              <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                Enroll
              </button>
              <button className="p-2 bg-[#f4d84c] text-white font-semibold shadow-xl w-1/3 rounded-2xl hover:bg-[#ffe45baa] transition-all ease-in delay-75">
                Wishlist
              </button>
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
