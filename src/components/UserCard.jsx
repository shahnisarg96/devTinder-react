import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import Toast from './Toast';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ feedData }) => {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleConnectionSend = (status) => {
        fetch(BASE_URL + 'connection/send/' + status + '/' + feedData._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setSuccess(data.message || 'Successful');
                dispatch(removeFeed(feedData._id));
            })
            .catch(error => {
                setError(error.message);
                console.error('Error marking status:', error);
            });
    }

    return (
        <>
            {success && <Toast message={success} type="success" />}
            {error && <Toast message={error} type="error" />}
            <div className="card bg-base-300 w-96 shadow-lg">
                <figure>
                    <img
                        className="rounded-full w-48 h-48 mx-auto mt-4"
                        src={feedData.profilePicture}
                        alt={`${feedData.firstName} ${feedData.lastName}`} />
                </figure>
                <div className="card-body justify-center items-center">
                    <h2 className="card-title">{`${feedData.firstName} ${feedData.lastName}`}</h2>
                    {
                        feedData.age && feedData.gender &&
                        <p>{feedData.age}, {feedData.gender}</p>
                    }
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleConnectionSend('interested')}>Interested</button>
                        <button className="btn btn-secondary" onClick={() => handleConnectionSend('ignored')}>Ignore</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCard