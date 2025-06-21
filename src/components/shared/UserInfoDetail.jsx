import "./common.css"
import React from 'react'

export default function UserInfoDetail({user}) {
    return (
        <div className="userDetailContainer">
            {user && <div className="userDetail">
                <img src={user.pfp || "/avatar.png"} alt="Profile" />
                <div className="userDetailNameStatus">
                    <h2>{user.username}</h2>
                    <p className="userStatus">{user.status}</p>
                </div>
            </div>}
        </div>
    )
}
