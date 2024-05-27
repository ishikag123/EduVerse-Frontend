import React from "react";
import { createContext, useState } from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
  const [teacherLogin, setTeacherLogin] = useState(false);

  return (
    <AccountContext.Provider
      value={{
        student,
        setStudent,
        teacher,
        setTeacher,
        teacherLogin,
        setTeacherLogin,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
