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
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;

        try {
            const response = await fetch(BASE_URL + 'login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, password: userPassword }),
            });
            const data = await response.json();

            if (data.user) {
                dispatch(addUser(data.user));
                navigate('/');
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
                    <h2 className="text-center text-3xl font-bold py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="card-actions justify-center">
                            <input type="text" placeholder="Username" className="input input-bordered" ref={email} />
                            <input type="password" placeholder="Password" className="input input-bordered" ref={password} />
                            {error && <p className="text-red-500 mx-4">{error}</p>}
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary my-4">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login