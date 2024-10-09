import React from 'react'
import './userInfo.css'
export default function UserInfo() {
  return (
    <div className='userInfo'>
        <div className='user'>
            <img src='/avatar.png'></img>
            <h2>Akinchand</h2>
        </div>
        <div className='icons'>
            <img src='/more.png'></img>
            <img src='/video.png'></img>
            <img src='/edit.png'></img>
        </div>
    </div>
  )
}
