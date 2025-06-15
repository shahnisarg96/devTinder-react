import React from 'react'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const [error, setError] = useState(null);
    const [loginToggle, setLoginToggle] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        const userFirstName = firstName.current ? firstName.current.value : '';
        const userLastName = lastName.current ? lastName.current.value : '';

        const apiURL = BASE_URL + (loginToggle ? 'login' : 'signup');
        const requestBody = loginToggle
            ? { email: userEmail, password: userPassword }
            : { firstName: userFirstName, lastName: userLastName, email: userEmail, password: userPassword };

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.user) {
                dispatch(addUser(data.user));
                if (loginToggle) {
                    navigate('/');
                } else {
                    navigate('/profile');
                }
            } else {
                setError(data.message || 'Login failed. Please try again.');
                console.error('Login failed:', data.message || 'Unknown error');
            }
        } catch (error) {
            navigate('/login');
            setError(error.message || 'An error occurred during login.');
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-bold py-2">
                        {loginToggle ? 'Sign In' : 'Sign Up'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="card-actions justify-center">
                            {!loginToggle && (
                                <>
                                    <input type="text" placeholder="First Name" className="input input-bordered" ref={firstName} />
                                    <input type="text" placeholder="Last Name" className="input input-bordered" ref={lastName} />
                                </>
                            )}
                            <input type="email" placeholder="Email" className="input input-bordered" ref={email} />
                            <input type="password" placeholder="Password" className="input input-bordered" ref={password} />
                            {error && <p className="text-red-500 mx-4">{error}</p>}
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary my-4">
                                {loginToggle ? 'Login' : 'Register'}
                            </button>
                        </div>
                        <div className="text-center">
                            {loginToggle ? (
                                <p>
                                    Don't have an account?
                                    &nbsp;
                                    <span
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => setLoginToggle(false)}
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?
                                    &nbsp;
                                    <span
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => setLoginToggle(true)}
                                    >
                                        Sign In
                                    </span>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login