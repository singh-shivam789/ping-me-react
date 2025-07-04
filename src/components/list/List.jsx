import useOnClickOutside from "../../hooks/useOnClickOutside";
import useAppStore from "../../lib/stores/app/appStore";
import { useEffect, useRef, useState } from "react";
import AddFriend from "../addFriend/AddFriend";
import ChatList from "./chatList/ChatList";
import ListHeader from "./ListHeader";
import "./notifications.css";
import "./list.css";

export default function List() {
  const isAddFriendSearchVisible = useAppStore((state) => state.isAddFriendSearchVisible);
  const setIsAddFriendSearchVisible = useAppStore((state) => state.setIsAddFriendSearchVisible);
  const [addFriendRef, setAddFriendRef] = useState(null);
  const toggleButtonRef = useRef(null);
  
  useEffect(() => {
  }, [addFriendRef]);
  
  useOnClickOutside(toggleButtonRef, addFriendRef, setIsAddFriendSearchVisible, isAddFriendSearchVisible)

  return (
    <div className="list">
      <ListHeader setIsAddFriendSearchVisible={setIsAddFriendSearchVisible} toggleButtonRef={toggleButtonRef}/>
      <ChatList />
      {isAddFriendSearchVisible && <AddFriend setAddFriendRef={setAddFriendRef} />}
    </div>
  )
}