import React from 'react'
import Notification from './Notification'

export default function Notifications({notificationsRef, friendRequestsUsers}) {
  return (
    <div ref={notificationsRef} className='notifications'>
        {(friendRequestsUsers.map((user) => {
          return <Notification key={user._id} user={user}/>
        }))}    
    </div>
  )
}
