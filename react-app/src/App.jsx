import './App.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import React from "react";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={Login}/>
          <Route path="/signup" element={Signup}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
