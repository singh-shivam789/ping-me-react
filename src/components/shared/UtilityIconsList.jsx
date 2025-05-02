import { getAllUsersWithMatchingEmails } from '../../utils/userUtils.js';
import { useUserStore } from '../../lib/stores/user/userStore.js'
import useOnClickOutside from '../..//hooks/useOnClickOutside.js';
import Notifications from '../list/notifications/Notifications';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";
import "./common.css";

export default function UtilityIconsList() {
  const currentUser = useUserStore.getState().user;
  const [notificationsVisible, handleNotificationsVisible] = useState(false);
  const [isNotificationBellActive, setIsNotificationBellActive] = useState(false);
  const [friendRequestsUsers, setFriendRequestUsers] = useState([]);
  const toggleButtonRef = useRef(null);
  const notificationsRef = useRef(null);
  const handleNotifications = (e) => {
    handleNotificationsVisible((state) => (!state));
    setIsNotificationBellActive(false);
  }

  useOnClickOutside(toggleButtonRef, notificationsRef, handleNotificationsVisible, notificationsVisible)
  useEffect(() => {
    getAllUsersWithMatchingEmails(currentUser.friendRequests.received).then((users) => {
      setFriendRequestUsers(users);
      if(!users.length){
        setIsNotificationBellActive(false);
      }
      else{
        setIsNotificationBellActive(true);
        toast.info("You have new notifications!");
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [currentUser]);
  return (
    <div className="listIcons">
      <img src="/more.png" alt="More" />
      <img src="/edit.png" alt="Edit" />
      <div  id="notification-icon">
        <img ref={toggleButtonRef} onClick={handleNotifications} id='notification-bell' src="/notification-bell.png" alt="Notifications" />
        {isNotificationBellActive && <span className="notification-dot"></span>}
      </div>

      {notificationsVisible && <Notifications notificationsRef={notificationsRef} friendRequestsUsers={friendRequestsUsers} />}
    </div>
  );
}
