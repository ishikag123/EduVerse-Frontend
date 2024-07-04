import React from "react";
import img from "../../assets/profile3.jpeg";
import { useState, useContext, useEffect } from "react";
import { getStudentToken } from "../../Services/utils";
import { AccountContext } from "../../Context/AccountProvider";
import { StudentNav } from "../Navbar/StudentNav";
import { editStudent, getStudent, uploadDP } from "../../Services/api";
import { IoMdPerson } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import { FaPhone } from "react-icons/fa6";
import { FaCakeCandles } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

export const EditStudentProfile = () => {
  const { setStudent, student } = useContext(AccountContext);
  const [studInfo, setStudInfo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sid, setSid] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [Gname, setGname] = useState("");
  const [Gphone, setGphone] = useState("");
  const [GEmail, setGEmail] = useState("");
  const [pic, setPic] = useState();
  const [dp, setDp] = useState();

  const StudentLogout = () => {
    localStorage.removeItem("studentToken");
    console.log("student logged out");
    setStudent(null);
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

  const updateStudent = async (e) => {
    e.preventDefault();
    // let flag=false;
    let confirmChange;
    if (email !== student.email) {
      confirmChange = window.confirm(
        "If you change the email id,you will be automatically logged out.Do you agree to proceed?"
      );
      if (!confirmChange) return;
      //flag=true
    }

    const body = JSON.stringify({
      _id: sid,
      name,
      email,
      phone,
      DOB,
      address,
      Gname,
      Gphone,
      GEmail,
      dp,
    });
    console.log(body);
    console.log(student.token);
    try {
      const newStud = await editStudent(student.token, body);
      //console.log(newStud);
      if (newStud && confirmChange) {
        StudentLogout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = getStudentToken();
    setStudent(user);
    const getInfo = async () => {
      try {
        let student = await getStudent(user.email, user.token);
        //console.log("response:", student);
        if (student) {
          //setLoading(false);
          setStudInfo(student);
          setName(student.name);
          setEmail(student.email);
          setSid(student._id);
          setAddress(student.address);
          setDOB(student.DOB);
          setPhone(student.phone);
          setGEmail(student.GEmail);
          setGname(student.Gname);
          setGphone(student.Gphone);
          setDp(student.dp ? student.dp : "");
        } else {
          console.error("No student data received");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getInfo();
    // console.log(studInfo);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <StudentNav />
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
            onSubmit={updateStudent}
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
                placeholder="Student Email Id"
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
                value={Gname}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setGname(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-0 justify-center items-center">
              <h3 className="mr-auto text-xs text-gray-400">
                Guardian's email id
              </h3>
              <input
                type="text"
                value={GEmail}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setGEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-0 justify-center items-center">
              <h3 className="mr-auto text-xs text-gray-400">
                Guardian's phone number
              </h3>
              <input
                type="text"
                value={Gphone}
                className="w-full border-2 rounded-lg p-2 shadow-lg"
                onChange={(e) => setGphone(e.target.value)}
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
