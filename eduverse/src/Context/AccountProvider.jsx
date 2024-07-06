import React from "react";
import { createContext, useState } from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [stoken, setSToken] = useState("");
  const [smail, setSMail] = useState("");
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
  const [teacherLogin, setTeacherLogin] = useState(false);
  const [viewTeacher, setViewTeacher] = useState("");
  const [studCourse, setStudCourse] = useState(false);
  const [CID, setCID] = useState("");
  const [editCID, setEditCID] = useState("");
  const [TID, setTID] = useState("");

  return (
    <AccountContext.Provider
      value={{
        student,
        setStudent,
        teacher,
        setTeacher,
        teacherLogin,
        setTeacherLogin,
        stoken,
        setSToken,
        smail,
        setSMail,
        viewTeacher,
        setViewTeacher,
        studCourse,
        setStudCourse,
        CID,
        setCID,
        TID,
        setTID,
        editCID,
        setEditCID,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
