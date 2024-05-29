import React from "react";

export const CourseOverview = ({ setCID, course }) => {
  const check = () => {
    console.log(course);
  };
  return (
    <div className="h-full w-full flex flex-col gap-4 items-center p-6 px-16 mt-20 overflow-auto">
      <button onClick={() => setCID("")}>Back</button>
      {/* <button onClick={() =>check()}>Back</button> */}
      {course && (
        <div>
          <div>{course.cname}</div>
          <div>{course.startDate}</div>
        </div>
      )}
    </div>
  );
};
