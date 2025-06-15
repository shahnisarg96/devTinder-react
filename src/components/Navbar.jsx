import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice'; // Assuming you have a removeUser action in your userSlice
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router';
import { clearFeed } from '../utils/feedSlice'; // Assuming you have a clearFeed action in your feedSlice

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(BASE_URL + 'logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    dispatch(removeUser());
                    dispatch(clearFeed())
                    navigate('/login');
                } else {
                    alert(data.message || 'Logout failed');
                }
            });
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to="/">DevTinder</Link>
            </div>
            <div className="flex gap-2">
                {
                    user &&
                    <>
                        <div className="flex items-center">
                            <p>Welcome, {user.firstName}</p>
                        </div>
                        <div className="dropdown dropdown-end mx-4">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user.profilePicture} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/login" onClick={() => handleLogout()}>Logout</Link></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar