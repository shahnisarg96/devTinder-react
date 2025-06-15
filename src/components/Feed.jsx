import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector((store) => store.feed);

    const fetchFeed = async () => {
        if(feedData) return; // Avoid fetching if feed data is already present
        try {
            const response = await fetch(BASE_URL + 'feed', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Feed data:', data);
            dispatch(setFeed(data.data));
        } catch (error) {
            console.error('Error fetching feed:', error);
        }
    }

    useEffect(() => {
        fetchFeed();
    }, []);

    return feedData && (
        <div className="flex justify-center my-10">
            <UserCard feedData={feedData[0]} />
        </div>
    )
}

export default Feed