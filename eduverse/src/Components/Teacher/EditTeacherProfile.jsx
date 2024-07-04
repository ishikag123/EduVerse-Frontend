import React from "react";
import img from "../../assets/profile3.jpeg";
import { useState, useContext, useEffect } from "react";
import { getTeacherToken } from "../../Services/utils";
import { AccountContext } from "../../Context/AccountProvider";
import { TeacherNav } from "../Navbar/TeacherNav";
import { editTeacher, getTeacher, uploadDP } from "../../Services/api";
import { IoMdPerson } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaCakeCandles } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

export const EditTeacherProfile = () => {
  const { setTeacher, teacher } = useContext(AccountContext);
  const [studInfo, setStudInfo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [altPhone, setAltphone] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(0);
  const [pic, setPic] = useState();
  const [dp, setDp] = useState();

  const teacherLogout = () => {
    localStorage.removeItem("teacherToken");
    console.log("teacher logged out");
    setTeacher(null);
    //   <Navigate to="/" />;
  };

  const changeDP = async (e) => {
    e.preventDefault();
    if (!pic) {
      alert("Choose a photo to change profile picture.");
      return;
    }
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "eduverse_dp_preset");
    console.log(pic);
    try {
      const img = await uploadDP(data);
      //console.log(img.url);
      setDp(img.url);
      if (img) alert("DP Changed!!");
      //console.log(vidURL);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTeacher = async (e) => {
    e.preventDefault();
    // let flag=false;
    let confirmChange;
    if (email !== teacher.email) {
      confirmChange = window.confirm(
        "If you change the email id,you will be automatically logged out.Do you agree to proceed?"
      );
      if (!confirmChange) return;
      //flag=true
    }

    const body = JSON.stringify({
      _id: id,
      name,
      email,
      phone,
      DOB,
      address,
      altPhone,
      skills,
      experience,
      dp,
    });
    console.log(body);
    console.log(teacher.token);
    try {
      const newStud = await editTeacher(teacher.token, body);
      //console.log(newStud);
      if (newStud && confirmChange) {
        teacherLogout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getTeacherToken();
    setTeacher(user);
    const getInfo = async () => {
      try {
        let teacher = await getTeacher(user.token, user.email);
        //console.log("response:", teacher);
        if (teacher) {
          //setLoading(false);
          setStudInfo(teacher);
          setName(teacher.name);
          setEmail(teacher.email);
          setId(teacher._id);
          setAddress(teacher.address);
          setDOB(teacher.DOB);
          setPhone(teacher.phone);
          setAltphone(teacher.altPhone);
          setSkills(teacher.skills);
          setExperience(teacher.experience);
          setDp(teacher.dp ? teacher.dp : "");
        } else {
          console.error("No teacher data received");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    getInfo();
    // console.log(studInfo);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <TeacherNav />
      <div className="h-full w-full flex gap-4 justify-center items-center p-6 md:px-16 mt-20">
        <div className="border-2 shadow-xl w-full h-full rounded-2xl flex md:flex-row flex-col items-center p-4 overflow-auto md:gap-2 gap-4">
          <form
            className="flex flex-col gap-4 bg-gray-200 rounded-lg md:w-1/3 w-full md:h-full p-10 justify-center items-center"
            onSubmit={changeDP}
          >
            <label className="font-semibold cursor-pointer" htmlFor="imgFile">
              {/* {pic ? (
                  <img src={} />
                ) : dp ? (
                  <img src={dp} />
                ) : ( */}
              <img
                src={pic ? URL.createObjectURL(pic) : dp ? dp : img}
                className="sm:w-64 sm:h-64 w-36 h-36 rounded-xl hover:opacity-50 transition-all ease-in delay-75"
              />
              {/* )} */}
            </label>
            <input
              type="file"
              id="imgFile"
              style={{ display: "none" }}
              onChange={(e) => setPic(e.target.files[0])}
            />

            <button className="bg-[#fee046] hover:bg-[#fdefa8] rounded-xl shadow-xl p-3 font-semibold transition-all ease-in delay-75 ">
              Update profile picture
            </button>
          </form>
          <form
            className="flex flex-col justify-center items-center h-full gap-3 w-full md:px-10 px-1"
            onSubmit={updateTeacher}
          >
            <div className="w-full flex gap-3 justify-center items-center">
              <IoMdPerson className="text-2xl text-gray-500" />
              <input
                type="text"
                value={name}
                placeholder="Your name"
                className="border-2 rounded-lg p-2 shadow-lg w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div className="w-full flex gap-3 justify-center items-center">
                <SiGmail className="text-2xl text-gray-500" />
                <input
                  type="Email"
                  value={email}
                  placeholder="teacher Email Id"
                  className="w-full border-2 rounded-lg p-2 shadow-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div> */}
            {/* <input
                    type="password"
                    required="true"
                    placeholder="Write a password"
                    className="w-full border-2 rounded-lg p-2 shadow-lg"
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
            <div className="w-full flex gap-3 justify-center items-center">
              <FaPhone className="text-2xl text-gray-500" />
              <input
                type="text"
                value={phone}
                placeholder="Your phone number"
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-3 justify-center items-center">
              <FaPhone className="text-2xl text-gray-500" />
              <input
                type="text"
                value={altPhone}
                placeholder="Alternative phone number"
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setAltphone(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-3 justify-center items-center">
              <IoLocationSharp className="text-2xl text-gray-500" />
              <input
                type="text"
                value={address}
                placeholder="Your address"
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-3 justify-center items-center">
              <FaCakeCandles className="text-2xl text-gray-500" />
              <input
                type="date"
                id="DOB"
                value={DOB}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-0 justify-center items-center">
              <h3 className="mr-auto text-xs text-gray-400">Guardian's name</h3>
              <input
                type="text"
                value={skills}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col gap-0 justify-center items-center">
              <h3 className="mr-auto text-xs text-gray-400">
                Guardian's phone number
              </h3>
              <input
                type="number"
                value={experience}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <button className="bg-[#0B5078] text-white p-3 px-4 rounded-xl shadow-lg font-semibold hover:bg-[#0b5078c0] transition-all w-full ease-in-out">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
