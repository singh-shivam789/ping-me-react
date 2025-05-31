import useUserStore from "../../../lib/stores/user/userStore";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useEffect, useRef, useState } from "react"
import AddFriend from "../../addFriend/AddFriend"
import ChatItem from "./ChatItem"
import axios from "axios";
import "./chatList.css"
import useAppStore from "../../../lib/stores/app/appStore";

export default function ChatList() {
  const [searchInput, setSearchInput] = useState("");
  const isAddFriendSearchVisible = useAppStore((state) => state.isAddFriendSearchVisible);
  const setIsAddFriendSearchVisible = useAppStore((state) => state.setIsAddFriendSearchVisible);
  //    //dummy values, will be fixed when chatStore will be developed
  const [currentUserChats, setCurrentUserChats] = useState([{
    chatId: 1,
    chatData: {
      user: {
        email: "subam@gmail.com",
        username: "subam"
      },
      lastMessage: "Helloo!"
    }
  },
{
    chatId: 2,
    chatData: {
      user: {
        email: "lelepeda@gmail.com",
        username: "lele"
      },
      lastMessage: "Hi!"
    }
  }]);
  const currentUser = useUserStore.getState().user;
  const [addFriendRef, setAddFriendRef] = useState(null);
  const toggleButtonRef = useRef(null);
  useEffect(() => {
  }, [addFriendRef]);

  useOnClickOutside(toggleButtonRef, addFriendRef, setIsAddFriendSearchVisible, isAddFriendSearchVisible)

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src="/search.png" alt="search.png" />
          <input type="text" placeholder="Search" />
        </div>
        <img ref={toggleButtonRef} onClick={() => setIsAddFriendSearchVisible()} className="addImg" src={isAddFriendSearchVisible ? "/minus.png" : "/plus.png"} alt="plus.png" />
      </div>
      <div className="chatItemContainer">
        {currentUserChats.map((chat) => <ChatItem key={chat.chatId} user={chat.chatData.user} 
        lastMessage ={chat.chatData.lastMessage}/>)}
      </div>
      {isAddFriendSearchVisible && <AddFriend setAddFriendRef={setAddFriendRef} />}
    </div>
  )
}