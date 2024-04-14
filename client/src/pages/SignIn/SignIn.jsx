import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://127.0.0.1:5500/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                rememberMe: rememberMe,
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.statusText);
            }
        })
        .then(data => {
            localStorage.setItem('token', data.access_token); 
            navigate('/');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <div className='flex flex-col p-6 h-auto w-[350px] md:w-[400px] md:h-auto bg-white rounded-lg shadow-md'>
                <img className='self-center mb-4 w-24 sm:w-32 md:w-40 lg:w-48' src={logo} alt="Logo" />
                <h1 className='text-center mb-4 font-sans text-xl font-bold text-gray-600'>Drive Your Dreams</h1>
                <p className='text-center text-base text-gray-600 mb-4'>Your Premium Car Rental Service</p>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
                    <input
                        className='border p-2 rounded-[8px] outline-none text-gray-600'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className='border p-2 rounded-[8px] outline-none text-gray-600'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2 font-sans text-sm font-normal text-gray-600'>
                        <input type='checkbox' checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}/>
                            <label>Remember me</label>
                        </div>
                        <p className='text-orange-600 hover:cursor-pointer font-sans text-sm font-normal'>Forgot password?</p>
                    </div>
                    <button
                        className='bg-black text-white p-2 rounded-[8px] mt-4'
                        type="submit"
                    >
                        Sign in
                    </button>
                    <button
                        className='flex items-center justify-center bg-white text-black p-2 rounded-[8px] mt-2 border-2 border-black'
                    >
                        <FcGoogle className='w-5 h-5 mr-4' />
                        Sign in with Google
                    </button>
                    <p
                        className='text-center mt-4 font-sans text-sm font-normal text-gray-600'>
                        Not a member yet?
                        <Link className='text-orange-600' to="/signup"> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}