import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants'; // Adjust the import path as necessary
import { useDispatch } from 'react-redux';
import { addConnections } from '../utils/connectionSlice'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connection);

    const fetchConnections = () => {
        fetch(BASE_URL + 'connections', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (!data.message) {
                    dispatch(addConnections(data));
                }
            })
            .catch(error => {
                console.error('Error fetching connections:', error);
            });
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections?.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">Connections</h2>
                <p className="text-center text-neutral-content">No connnetions found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-base-100 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Connections</h2>
            <ul className="space-y-4">
                {connections.map((connection, idx) => (
                    <li key={connection._id || connection.email || idx} className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow hover:shadow-md transition-shadow">
                        <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={connection.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${connection.name}`} alt={connection.name} />
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg text-white">{connection.name}</div>
                            <div className="text-sm text-neutral-content">{connection.age}, {connection.gender}</div>
                        </div>
                        <button className="ml-auto btn btn-primary btn-sm">Message</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Connections