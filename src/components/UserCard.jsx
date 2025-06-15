import React from 'react'

const UserCard = ({ feedData }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-lg">
            <figure>
                <img
                    className="rounded-full w-48 h-48 mx-auto mt-4"
                    src={feedData.profilePicture}
                    alt={`${feedData.firstName} ${feedData.lastName}`} />
            </figure>
            <div className="card-body justify-center items-center">
                <h2 className="card-title">{`${feedData.firstName} ${feedData.lastName}`}</h2>
                <p>{feedData.age}, {feedData.gender}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Interested</button>
                    <button className="btn btn-secondary">Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard