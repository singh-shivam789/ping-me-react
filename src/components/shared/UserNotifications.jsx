import "./common.css"
import React from 'react'
import UtilityIcons from "./UtilityIcons"

export default function UserNotifications({user}) {
    return (
        <div className="userNotifications">
            <UtilityIcons whichUserPage="userList" />
        </div>
    )
}
