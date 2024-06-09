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
    <div className="h-full w-full flex gap-4 justify-center items-center p-6 px-16 mt-20">
      <div className="h-full w-1/3 bg-[#0B5078] rounded-2xl shadow-xl flex flex-col justify-center items-center gap-4">
        <img
          src={img}
          alt=""
          className="h-56 w-56 rounded-full shadow-xl mb-12"
        />
        <div className="flex flex-col gap-4 justify-start items-start">
          <div className="flex font-semibold text-lg text-white justify-center items-center gap-4">
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
      <div className="h-full flex flex-col w-2/3 bg-[#CDE6F5] rounded-2xl shadow-xl gap-4 p-8">
        <div className="flex">
          <h1 className="font-bold text-xl mr-auto">Active Courses</h1>
          <button onClick={() => setTID("")}>
            <ImCross />
          </button>
        </div>

        <div className="overflow-auto flex flex-col w-full h-full gap-4 p-4">
          {courses &&
            courses.map((item) => (
              <div className="w-full flex p-4 px-6 bg-white shadow-xl rounded-3xl">
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
              activeColor="#ffd700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
