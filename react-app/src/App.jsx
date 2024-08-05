import './App.css'
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import React from "react";
import Profile from './pages/profile';
import Course from './pages/course';
import { useState } from 'react';
import Lesson from './pages/lesson';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/dashboard/:uid" element={<Dashboard />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/course/:uid/:course_id" element={<Course/>}/>
            <Route path="/course/:uid/:course_id/lesson/:lesson_id" element={<Lesson/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
