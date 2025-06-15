import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    React.useEffect(() => {
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setAge(userData?.age || 0);
        setGender(userData?.gender || '');
        setProfilePicture(userData?.profilePicture || '');
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUserData = {
            firstName,
            lastName,
            age: Number(age),
            gender,
            profilePicture
        };

        try {
            const response = await fetch(BASE_URL + 'profile/edit', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedUserData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            dispatch(addUser(data.user)); // Update the Redux store with the new user data
            console.log('Profile updated successfully:', data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!userData) {
        return (
            <div className="flex justify-center my-10">
                <div className="flex flex-col items-center h-full">
                    <p className="text-lg">No user data available</p>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className="flex justify-center my-10">
                    <div className="flex flex-col items-center h-full">
                        <div className="card bg-base-300 w-96 shadow-sm">
                            <div className="card-body">
                                <h2 className="text-center text-3xl font-bold py-2">Edit Profile</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">First Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="input input-bordered w-full"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Last Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="input input-bordered w-full"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Age</span>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Age"
                                            className="input input-bordered w-full"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Gender</span>
                                        </label>
                                        <select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Profile Picture URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Profile Picture URL"
                                            className="input input-bordered w-full"
                                            value={profilePicture}
                                            onChange={(e) => setProfilePicture(e.target.value)}
                                        />
                                    </div>
                                    <button className="btn btn-primary w-full" onClick={handleSubmit}>Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {userData && (
                        <div className="flex flex-col items-center h-full mx-2">
                            <UserCard feedData={userData} />
                        </div>
                    )}
                </div>
            </>
        )
    }
}




export default Profile