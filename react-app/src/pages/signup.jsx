import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const first_name = e.target.elements.firstName.value;
        const last_name = e.target.elements.lastName.value;

        console.log(email);
        console.log(password);
        console.log(first_name);
        console.log(last_name);

        try {
            const response = await axios.post('/api/db/user/register_user', {
                email,
                password,
                first_name,
                last_name
            });

            const uid = response.data.uid;
            const session_id = reponse.data.session_id;

            localStorage.setItem('uid', uid);
            localStorage.setItem('session_id', session_id);

            console.log('Login successful! uid:', uid, "session_id: ", session_id);
            navigate(`/dashboard/${uid}`);
            
        } catch (error) {
            console.error('Register failed:', error.message);
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="sign-up-form-container">
                <div className='sign-up-form'>
                    {/* <h2><img src='/logo.png' width={28} /> PipeGen AI</h2> */}
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
                    <p className="text-sm font-semibold text-center m-4">
                        <span className="border-b w-full text-center border-gray-300 py-1">
                            Or
                        </span>
                    </p>
                </form>
                <button className="h-12 bg-white border-slate-500 border-2 text-black font-bold py-3 px-10 rounded inline-flex items-center">
                        <FcGoogle size={40}/>
                        <span className="ml-4">Continue with Google</span>
                    </button>
            </div>
        </div>
    )
}