import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiSpellBook } from "react-icons/gi";
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const uid = window.localStorage.getItem('uid');

    const handleLogout = async () => {
        const session_id = window.localStorage.getItem('session_id');

        try {
            const response = await axios.delete('/api/user/logout_user', {
                data: { session_id }
            });

            if (response.data.success) {
                setLoggedIn(false);
                window.localStorage.removeItem('session_id');
                navigate("/login");
            } else {
                console.error('Logout failed:', response.data.detail);
            }
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    const userInitials = "AY";

    // useEffect(() => {
    //     const session_id = window.localStorage.getItem('session_id');
    //     if (session_id == null) {
    //         setLoggedIn(false)
    //     }
    //     else{
    //         setLoggedIn(true)
    //     }
    // }, [])

    return (
        <nav className="flex justify-between items-center p-4 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <GiSpellBook size={50} className="mb-4" />
                    {isLoggedIn ?
                        (<span className="text-black font-bold text-xl">Coursify</span>) :
                        (<Link to="/" className="text-black font-bold text-xl">Coursify</Link>)
                    }
                </div>
            </div>

            <div className="flex items-center">
                {isLoggedIn && (
                    <div className="space-x-4">
                        <Link to={`/dashboard/${uid}`} className='hover:text-black text-gray-600 text-lg'>Dashboard</Link>

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
