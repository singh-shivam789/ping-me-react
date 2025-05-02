import "./common.css"
import React from 'react'

export default function UserInfoDetail({user}) {
    const { username, pfp } = user;

    return (
        <div className="userDetailContainer">
            <div className="userDetail">
                <img src={pfp || "/avatar.png"} alt="Profile" />
                <div className="userDetailNameStatus">
                    <h2>{username}</h2>
                    <p className="userStatus">{status}</p>
                </div>
            </div>
        </div>
    )
}
