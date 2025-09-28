import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/login.jsx"; 
import Register from "../pages/register.jsx";
import Task from "../pages/task.jsx";
import Navbar from "../pages/navbar.jsx";
import protectedRoutes from "../pages/protected.jsx";

const App = () => {

  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/task" element={<protectedRoutes>
          <Task />
        </protectedRoutes>} />
        <Route path = "/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
