import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

export const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch('http://127.0.0.1:5500/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
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
            console.log(data);
            navigate('/signin');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <div className='flex flex-col p-6 h-auto w-[350px] md:w-[450px] md:h-auto bg-white rounded-lg shadow-md'>
                <img className='self-center mb-4 w-24 sm:w-32 md:w-40 lg:w-48' src={logo} alt="Logo" />
                <h1 className='text-center mb-4 font-sans text-xl font-bold text-gray-600'>Join Our Community</h1>
                <p className='text-center text-base text-gray-600 mb-4'>Sign up to start your journey</p>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        <input
                            className='border p-2 rounded-[8px] outline-none w-5/12 text-gray-600'
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            className='border p-2 rounded-[8px] outline-none w-5/12 text-gray-600'
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <input
                        className='border p-2 rounded-[8px] outline-none text-gray-600'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='border p-2 rounded-[8px] outline-none text-gray-600'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='bg-black text-white p-2 rounded-[8px] mt-4'
                        type='submit'
                    >
                        Sign Up
                    </button>
                    <p
                        className='text-center mt-4 font-sans text-sm font-normal text-gray-600'>
                        Already a member?
                        <Link className='text-orange-600' to="/signin"> Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}