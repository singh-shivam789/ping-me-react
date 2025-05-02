import "./common.css"
import React from 'react'
import UtilityIcons from "./UtilityIcons"

export default function UserInfoList({user}) {
    const { username, status, pfp } = user;
    return (
        <div className="userInfoList">
            <div className="userList">
                <img src={pfp || "/avatar.png"} alt="Profile" />
                <h2>{username}</h2>
            </div>
            <UtilityIcons whichUserPage="userList" />
        </div>
    )
}
