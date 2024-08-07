import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import { GiSpellBook } from "react-icons/gi";
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const first_name = e.target.elements.firstName.value;
        const last_name = e.target.elements.lastName.value;
        console.log(password)
        try {
            const response = await axios.post('http://localhost:8000/api/user/register_user', {
                email,
                password,
                first_name,
                last_name
            });
            console.log(response)
            const uid = response.data.uid;
            const session_id = response.data.session_id;
            localStorage.setItem('uid', uid);
            localStorage.setItem('session_id', session_id);

            console.log('Registration successful! uid:', uid, "session_id: ", session_id);
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

    return (
        <div>
            <Navbar />
            <div className="sign-up-form-container">
                <div className="login-form2 flex flex-row mr-3 mb-2 space-x-2 items-center">
                    <GiSpellBook size={50} className="mb-4" />
                    <p className='text-semibold text-xl'>Coursify</p>
                </div>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className='input-field'
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginLeft: 10 }}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className='input-field'
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className='input-field'
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
                            className='input-field'
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button className="btn-submit bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-300 mt-3" type="submit">
                        Signup
                    </button>
                    {errorMessage && (
                        <div className="mt-3 text-red-500">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
