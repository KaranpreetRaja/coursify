import { useState } from "react";
import { Link } from "react-router-dom";
import { GiSpellBook } from "react-icons/gi";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <nav className="flex justify-between items-center p-6 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <GiSpellBook size={50} className="mb-4"/>
                    <Link to="/" className="text-black font-bold text-xl">Coursify</Link>
                </div>
                
                <Link to="/dashboard" className="link">Dashboard</Link>
            </div>

            <div className="flex items-center">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/signup" className="btn-signup hover:bg-blue-700 transition ease-in-out duration-300">Create your account</Link>
            </div>
        </nav>
    )
}