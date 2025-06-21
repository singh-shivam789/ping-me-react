import useOnClickOutside from "../../hooks/useOnClickOutside";
import useAppStore from "../../lib/stores/app/appStore";
import { useEffect, useRef, useState } from "react";
import AddFriendOption from "./AddFriendOption";
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
      <ListHeader />
      <ChatList />
      <AddFriendOption toggleButtonRef={toggleButtonRef} setIsAddFriendSearchVisible={setIsAddFriendSearchVisible}/>
      {isAddFriendSearchVisible && <AddFriend setAddFriendRef={setAddFriendRef} />}
    </div>
  )
}