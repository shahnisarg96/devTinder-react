import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';

const Sent = () => {
    const [requests, setRequests] = React.useState([]);

    const fetchSentRequests = async () => {
        try {
            const response = await fetch(BASE_URL + 'connection/sent', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (data && data.length > 0) {
                setRequests(data);
            } else {
                setRequests([]);
            }
        } catch (error) {
            console.error('Error fetching sent requests:', error);
            setRequests([]);
        }
    }

    useEffect(() => {
        fetchSentRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Sent Requests</h2>
                <p className="text-center text-neutral-content">No sent requests found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Sent Requests</h2>
                <ul className="space-y-4">
                    {requests.map((request, idx) => (
                        <li key={request._id || request.email || idx} className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow hover:shadow-md transition-shadow">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={request.toUserId.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${request.toUserId.firstName}`} alt={request.toUserId.firstName} />
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-lg text-white">{request.toUserId.firstName} {request.toUserId.lastName}</div>
                                <div className="text-sm text-neutral-content">{request.toUserId.age}, {request.toUserId.gender}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Sent