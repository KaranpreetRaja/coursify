import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { GiSpellBook } from "react-icons/gi";
import { useState } from 'react';

export default function Login(){
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        console.log(email);
        console.log(password);
        

        try {
            const response = await axios.put('http://localhost:8000/api/user/login_user', null, {
                params: {
                    email,
                    password
                }
            });
            const uid = response.data.uid;
            const session_id = response.data.session_id;

            localStorage.setItem('uid', uid);
            localStorage.setItem('session_id', session_id);

            console.log('Login successful! uid:', uid, "session_id: ", session_id);
            navigate(`/dashboard/${uid}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMessage(error.response.data.detail);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            console.error('Register failed:', error);
        }
    }


    return(
        <div>
            <Navbar/>
            <div className="login-form-container">
                <div className="login-form2 flex flex-row ml-8 space-x-2 items-center">
                    <GiSpellBook size={50} className="mb-4"/> 
                    <p className='text-semibold text-xl'>Coursify</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="input-field"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="input-field"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="btn-submit bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-300 mt-3" type="submit">
                        Login
                    </button>
                    {errorMessage && (
                        <div className="mt-3 text-red-500">
                            {errorMessage}
                        </div>
                    )}
                    {/* <p className="text-sm font-semibold text-center mt-4">
                        <span className="border-b w-full text-center border-gray-300 py-1">
                            Or
                        </span>
                    </p> */}
                </form>
                {/* <div className="flex justify-center w-full mt-2">
                    <button className="h-12 bg-white border-slate-500 border-2 text-black font-bold py-3 px-10 rounded inline-flex items-center">
                        <FcGoogle size={40}/>
                        <span className="ml-4">Continue with Google</span>
                    </button>
                </div> */}
            </div>
        </div>
    )
}