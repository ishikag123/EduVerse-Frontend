import "./App.css";
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login/Login";
import { AccountProvider, AccountContext } from "./Context/AccountProvider";
import { StudentDashboard } from "./Components/Student/StudentDashboard";
import { TestPage } from "./Components/Student/TestPage";
import { setAuthToken } from "./Services/utils";
import { Explore } from "./Components/Student/Explore";
import { TeacherDashboard } from "./Components/Teacher/TeacherDashboard";
import { CreateCourse } from "./Components/Teacher/CreateCourse";
import { EditStudentProfile } from "./Components/Student/EditStudentProfile";
import { EditTeacherProfile } from "./Components/Teacher/EditTeacherProfile";

function App() {
  const { student, stoken, setSToken, setSMail, teacher, studInfo } =
    useContext(AccountContext);
  // useEffect(() => {
  //   const student = JSON.parse(localStorage.getItem("studentToken"));
  //   if (student) {
  //     setSToken(student.token);
  //     setSMail(student.email);
  //     //setAuthToken(stoken);
  //   }
  // }, []);

  return (
    <>
      {/* <AccountProvider> */}
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/student-dashboard"
            element={student ? <StudentDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/test-page"
            element={student || teacher ? <TestPage /> : <Navigate to="/" />}
          />
          <Route
            path="/explore"
            element={student ? <Explore /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-student-profile"
            element={
              student ? <EditStudentProfile /> : <Navigate to="/" />
              // <EditStudentProfile />
            }
          />
          <Route
            path="/teacher-dashboard"
            element={teacher ? <TeacherDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/create-course"
            element={teacher ? <CreateCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-teacher-profile"
            element={
              teacher ? <EditTeacherProfile /> : <Navigate to="/" />
              // <EditStudentProfile />
            }
          />
        </Routes>
      </Router>
      {/* </AccountProvider> */}
    </>
  );
}

export default App;
