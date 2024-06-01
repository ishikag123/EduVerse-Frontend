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

function App() {
  const { student, stoken, setSToken, setSMail, teacher } =
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
            element={student ? <TestPage /> : <Navigate to="/" />}
          />
          <Route
            path="/explore"
            element={student ? <Explore /> : <Navigate to="/" />}
          />
          <Route
            path="/teacher-dashboard"
            element={teacher ? <TeacherDashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      {/* </AccountProvider> */}
    </>
  );
}

export default App;
