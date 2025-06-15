import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice' // Assuming you have these actions in your userSlice
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = () => {
        fetch(BASE_URL + 'profile/view', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    dispatch(addUser(data.user));
                } else {
                    dispatch(removeUser());
                    navigate('/login');
                }
            })
            .catch(error => console.error('Error fetching user:', error));
    }

    React.useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body