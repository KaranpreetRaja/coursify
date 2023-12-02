import { useState } from "react";
import { Link } from "react-router-dom";
import { GiSpellBook } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(true);
    const navigate = useNavigate()

    const handleLogout = () => {
        setLoggedIn(false);
        navigate("/");
    };

    const userInitials = "AY"

    return (
        <nav className="flex justify-between items-center p-4 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <GiSpellBook size={50} className="mb-4"/>
                    {isLoggedIn ? 
                        (<span to="/" className="text-black font-bold text-xl">Coursify</span>) : 
                        (<Link to="/" className="text-black font-bold text-xl">Coursify</Link>)
                    }
                </div>
            </div>

            <div className="flex items-center">
                {isLoggedIn && (
                    <div>
                        <Avatar
                            name={userInitials}
                            size="50"
                            round
                            textSizeRatio={2}
                            color="#87CEEB"
                        />

                        <button onClick={handleLogout} className="btn-signup hover:bg-blue-700 transition ease-in-out duration-300">Log out</button>
                    </div>
                )}
                {!isLoggedIn && (
                    <div>
                        <Link to="/login" className="btn-login">Login</Link>
                        <Link to="/signup" className="btn-signup hover:bg-blue-700 transition ease-in-out duration-300">Create your account</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}