import React from "react";
import { useContext, useState, useEffect } from "react";
import img from "../../assets/profile2.jpg";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaStarHalfAlt, FaGraduationCap } from "react-icons/fa";
import { AccountContext } from "../../Context/AccountProvider";
import ReactStars from "react-rating-stars-component";
import { rateTeacher } from "../../Services/api";

export const TeacherProfile = ({ teacher, courses }) => {
  const [rate, setRate] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const { setCID, setTID, TID, student } = useContext(AccountContext);

  const ratingChanged = (newRating) => {
    setRate(newRating);
  };
  const giveRating = async () => {
    if (rate > 0) {
      const body = {
        email: TID,
        rating: rate,
      };
      try {
        const data = await rateTeacher(student.token, body);
        if (data) calculateRating();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const calculateRating = () => {
    const sum = teacher
      ? teacher.rating.reduce((acc, curr) => acc + curr, 0)
      : 0;
    const average =
      teacher && teacher.rating.length ? sum / teacher.rating.length : 0;
    setAvgRating(average.toFixed(1));
  };

  useEffect(() => {
    giveRating();
  }, [rate]);

  useEffect(() => {
    calculateRating();
  }, [teacher]);

  return (
    <div className="h-full w-full flex md:flex-row flex-col gap-4 sm:justify-center sm:items-center p-6 md:px-16 mt-20">
      <button
        onClick={() => setTID("")}
        className="md:hidden block ml-auto p-2"
      >
        <ImCross />
      </button>
      <div className="md:h-full sm:h-1/2 h-1/3 md:w-1/3 w-full bg-[#0B5078] rounded-2xl shadow-xl flex md:flex-col justify-center items-center md:gap-4 sm:gap-12 gap-6 md:p-0 p-4 py-8">
        <img
          src={img}
          alt=""
          className="sm:h-56 sm:w-56 h-32 w-32 rounded-full shadow-xl md:mb-12"
        />
        <div className="flex flex-col sm:gap-4 gap-2 justify-start items-start sm:p-0 py-8">
          <div className="flex font-bold md:text-xl text-white justify-center items-center gap-4">
            <BsFillPersonFill className="text-2xl" /> {teacher.name}
          </div>
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
            <FaPhoneAlt /> {teacher.phone}
          </div>
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
            <IoMail />
            {teacher.email}
          </div>
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
            <FaGraduationCap /> {teacher.skills}
          </div>
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
            <FaStarHalfAlt /> {avgRating}
          </div>
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
            <h1>{teacher.experience} years of experience</h1>
          </div>
        </div>
      </div>
      <div className="md:h-full flex flex-col md:w-2/3 w-full bg-[#CDE6F5] rounded-2xl shadow-xl gap-3 md:p-8 p-4 overflow-auto md:overflow-hidden">
        <div className="flex">
          <h1 className="font-bold text-xl mr-auto">Active Courses</h1>
          <button onClick={() => setTID("")} className="md:block hidden">
            <ImCross />
          </button>
        </div>

        <div className="overflow-auto flex md:flex-col flex-col-reverse w-full h-full gap-4 sm:p-4 p-2">
          {courses &&
            courses.map((item) => (
              <div className="w-full flex p-4 px-6 bg-white shadow-xl sm:rounded-3xl rounded-xl ">
                <h1 className="font-semibold">{item.cname}</h1>
                <div className="flex gap-4 ml-auto">
                  <button
                    className="text-[#b39e36] font-bold hover:text-[#b39e369e] transition-all ease-in delay-75"
                    onClick={() => setCID(item._id)}
                  >
                    View
                  </button>
                  {/* <button className="text-[#b39e36] font-bold hover:text-[#b39e369e] transition-all ease-in delay-75">
                    Enroll
                  </button> */}
                </div>
              </div>
            ))}
          <div className="flex justify-center items-center w-full mt-auto">
            <h1 className="mr-auto font-bold text-xl text-gray-600">
              Rate Teacher
            </h1>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={32}
              activeColor="#e0c944"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
