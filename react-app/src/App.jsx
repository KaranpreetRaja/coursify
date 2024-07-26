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

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
    </>
  )
}

export default App
