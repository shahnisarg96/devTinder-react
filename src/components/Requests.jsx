import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest, clearRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.request);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchRequests = () => {
        fetch(BASE_URL + 'connection/requests', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (!data.message) {
                    dispatch(addRequest(data));
                } else {
                    dispatch(clearRequest());
                }
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }

    const handleRequestReview = ({ requestId, status }) => {
        fetch(BASE_URL + `connection/review/${status}/${requestId}`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setSuccess(data.message || 'Request reviewed successfully');
                dispatch(removeRequest(requestId));
            })
            .catch(error => {
                setError(error.message || 'Failed to review request');
                console.error('Error reviewing request:', error);
            });
    }

    React.useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Requests</h2>
                <p className="text-center text-neutral-content">No requests found.</p>
            </div>
        );
    }

    return (
        <>
            {success && <div className="alert alert-success shadow-lg mb-4">{success}</div>}
            {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Requests</h2>
                <ul className="space-y-4">
                    {requests.map((request, idx) => (
                        <li key={request._id || request.email || idx} className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow hover:shadow-md transition-shadow">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={request.fromUserId.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${request.fromUserId.firstName}`} alt={request.fromUserId.firstName} />
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-lg text-white">{request.fromUserId.firstName} {request.fromUserId.lastName}</div>
                                <div className="text-sm text-neutral-content">{request.fromUserId.age}, {request.fromUserId.gender}</div>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <button className="btn btn-primary btn-sm" onClick={() => handleRequestReview({ requestId: request.fromUserId._id, status: 'accepted' })}>Accept</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => handleRequestReview({ requestId: request.fromUserId._id, status: 'rejected' })}>Decline</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Requests