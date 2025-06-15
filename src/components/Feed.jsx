import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import { useNavigate } from 'react-router';

const Feed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const feedData = useSelector((store) => store.feed);

    const fetchFeed = async () => {
        if (!user) {
            navigate('/login'); // Redirect to login if user is not logged in
            return;
        }
        if (feedData) return; // Avoid fetching if feed data is already present
        try {
            const response = await fetch(BASE_URL + 'feed', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.data) {
                dispatch(setFeed(data.data));
            }
        } catch (error) {
            console.error('Error fetching feed:', error);
        }
    }

    useEffect(() => {
        fetchFeed();
    }, []);

    if (!feedData || feedData.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Feed</h2>
                <p className="text-center text-neutral-content">No feed data available.</p>
            </div>
        );
    }

    return feedData && (
        <div className="flex justify-center my-10">
            <UserCard feedData={feedData[0]} />
        </div>
    )
}

export default Feed