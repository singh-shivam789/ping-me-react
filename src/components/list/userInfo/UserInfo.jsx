import React from 'react'
import './userInfo.css'
export default function UserInfo({ user }) {
  return (
    <div className={user === "chatTop" ? "userInfoChat" : "userInfoList"}>
      <div className={user === "chatTop" ? "userChat" : "userList"}>
        <img src="/avatar.png"></img>
        <div>
          <>
            {user === "chatTop" ? (
              <>
                <h4>Akinchand</h4>
                <p className="userStatus">Lorem ipsum, dolor sit amet consectetur</p>
              </>
            ) : (
              <h2>Akinchand</h2>
            )}
          </>

        </div>
      </div>
      <div className={user === "chatTop" ? "iconsChat" : "iconsList"}>
        <img src={user === "chatTop" ? "/phone.png" : "/more.png"} />
        <img src="/video.png" />
        <img src={user === "chatTop" ? "/info.png" : "/edit.png"} />
      </div>
    </div>
  )
}
