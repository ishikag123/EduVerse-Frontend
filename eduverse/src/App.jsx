import "./App.css";
import { useContext } from "react";
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

function App() {
  const { student } = useContext(AccountContext);
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
        </Routes>
      </Router>
      {/* </AccountProvider> */}
    </>
  );
}

export default App;
