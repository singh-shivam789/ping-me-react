import { getAllUsersWithMatchingEmails } from '../../utils/userUtils.js';
import { useSocketContext } from '../../hooks/useSocketContext.js';
import useOnClickOutside from '../..//hooks/useOnClickOutside.js';
import Notifications from '../list/notifications/Notifications';
import useUserStore from '../../lib/stores/user/userStore.js'
import useAppStore from '../../lib/stores/app/appStore.js';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from "react-toastify";
import "./common.css";

export default function UtilityIconsList() {

  const currentUser = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const addNewUser = useAppStore((state) => state.addNewUser);

  const [isNotificationBellActive, setIsNotificationBellActive] = useState(false);
  const notificationsVisible = useUserStore((state) => state.notificationsVisible);
  const friendRequestUsers = useUserStore((state) => state.friendRequestUsers);
  const setNotificationsVisible = useUserStore((state) => state.setNotificationsVisible);
  const setFriendRequestUsers = useUserStore((state) => state.setFriendRequestUsers);
  const addToFriendRequestUsers = useUserStore((state) => state.addToFriendRequestUsers);
  const removeFriendRequestUser = useUserStore((state) => state.removeFriendRequestUser);
  
  const toggleButtonRef = useRef(null);
  const notificationsRef = useRef(null);

  const socket = useSocketContext();
  const [isSocketActive, setIsSocketActive] = useState(false);

  const socketNotificationHandler = (data) => {
    addToFriendRequestUsers(data.sentFrom);
    setUser(data.to);
    setIsNotificationBellActive(true);
  }
  const socketNewUserHandler = (data) => {
    addNewUser(data.newUser);
  }
  
  // const socketFriendRequestStatusHandler = (data) => {

  // }

  useEffect(() => {
    if (socket != null) {
      setIsSocketActive(true);
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketActive) {
      if (currentUser !== null) {
        socket.on("friend-request-received", socketNotificationHandler);
        socket.on("user-registered", socketNewUserHandler);
        // socket.on("friend-request-status-changed", socketFriendRequestStatusHandler)
      }
    }
    else return;
    return () => {
      socket.off("friend-request-received", socketNotificationHandler);
      socket.off("user-registered", socketNewUserHandler);
      // socket.off("friend-request-status-changed", socketFriendRequestStatusHandler);
    }
  }, [socket, isSocketActive]);

  const handleNotifications = (e) => {
    setNotificationsVisible();
    setIsNotificationBellActive(false);
  }

  useOnClickOutside(toggleButtonRef, notificationsRef, setNotificationsVisible, notificationsVisible)
  useEffect(() => {
    if (currentUser.friendRequests.received.length == 0) {
      setIsNotificationBellActive(false);
    } else {
      setIsNotificationBellActive(true);
      toast.info("You have new notifications!");
    }
    getAllUsersWithMatchingEmails(currentUser.friendRequests.received).then((users) => {
      setFriendRequestUsers(users);
    }).catch((error) => {
      console.log(error);
    })
  }, [currentUser]);
  return (
    <div className="listIcons">
      <img src="/more.png" alt="More" />
      <img src="/edit.png" alt="Edit" />
      <div onClick={handleNotifications} id="notification-icon">
        <img ref={toggleButtonRef} id='notification-bell' src="/notification-bell.png" alt="Notifications" />
        {isNotificationBellActive && <span className="notification-dot"></span>}
      </div>

      {notificationsVisible && <Notifications notificationsRef={notificationsRef} friendRequestsUsers={friendRequestUsers} />}
    </div>
  );
}
