import "./common.css"
import React from 'react'
import UtilityIcons from "./UtilityIcons"

export default function UserInfoChat({user}) {
    const { username, status, pfp } = user;
    return (
      <div className="userInfoChat">
        <div className="userChat">
          <img src={pfp || "/avatar.png"} alt="Profile" />
          <div>
            <h3>{username}</h3>
            <p className="userStatus">{status}</p>
          </div>
        </div>
        <UtilityIcons whichUserPage="chatTop" />
      </div>
    );
}
