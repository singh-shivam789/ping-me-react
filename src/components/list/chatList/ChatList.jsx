import { useSocketContext } from "../../../hooks/useSocketContext";
import UserNotifications from "../../shared/UserNotifications";
import useUserStore from "../../../lib/stores/user/userStore";
import useChatStore from "../../../lib/stores/user/chatStore";
import { useEffect, useMemo, useState } from "react";
import ChatItem from "./ChatItem";
import "./chatList.css"

export default function ChatList() {
  const socket = useSocketContext();
  const chats = useChatStore((state) => state.chats);
  const [searchInput, setSearchInput] = useState("");
  const currentUser = useUserStore((state) => state.user);
  const [isSocketActive, setIsSocketActive] = useState(false);
  const setChatUser = useChatStore((state) => state.setChatUser);
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);

  const sortChatsBasedOnSearch = (chatA, chatB, searchString) => {
    searchString = searchString.toLowerCase();
    if (chatA.user.username.toLowerCase().startsWith(searchString) && chatB.user.username.toLowerCase().startsWith(searchString)) {
      if (chatA.lastMessage && chatB.lastMessage) {
        if (chatA.lastMessage.messageTime > chatB.lastMessage.messageTime) return -1;
        else return 1;
      }
      else return chatA.user.username.toLowerCase().localeCompare(chatB.user.username.toLowerCase());
    }
    else if (chatA.user.username.toLowerCase().startsWith(searchString) && chatB.user.username.toLowerCase().includes(searchString)) {
      return -1;
    }
    else if (chatB.user.username.toLowerCase().startsWith(searchString) && chatA.user.username.toLowerCase().includes(searchString)) {
      return 1;
    }
    else if (chatA.user.username.toLowerCase().includes(searchString) && chatB.user.username.toLowerCase().includes(searchString)) {
      if (chatA.lastMessage && chatB.lastMessage) {
        if (chatA.lastMessage.messageTime > chatB.lastMessage.messageTime) return -1;
        else return 1;
      }
      else return chatA.user.username.toLowerCase().localeCompare(chatB.user.username.toLowerCase());
    }
    else if (chatA.user.username.toLowerCase().includes(searchString) && !chatB.user.username.toLowerCase().includes(searchString)) {
      return -1;
    }
    else if (!chatA.user.username.toLowerCase().includes(searchString) && chatB.user.username.toLowerCase().includes(searchString)) {
      return 1;
    }
    else {
      if (chatA.lastMessage && chatB.lastMessage) {
        if (chatA.lastMessage.messageTime > chatB.lastMessage.messageTime) return -1;
        else return 1;
      }
      else return chatA.user.username.toLowerCase().localeCompare(chatB.user.username.toLowerCase());
    }
  }
  
  const sortedChats = useMemo(() => {
    const list = chats;
    if(searchInput === "") return list;
    else return list.sort((a, b) => sortChatsBasedOnSearch(a, b, searchInput))
  }, [chats, searchInput])


  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  }

  const chatReadStatusHandler = () => {

  }

  useEffect(() => {
    if (socket != null) {
      setIsSocketActive(true);
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketActive) {
      if (currentUser !== null) {
        socket.on("chat-read", chatReadStatusHandler)
      }
    }
    else return;
    return () => {
      socket.off("chat-read", chatReadStatusHandler)
    }
  }, [socket, isSocketActive]);


  useEffect(() => {
  }, [chats]);

  const chatSelectHandler = (chat) => {
    setChatUser(chat.user);
    setCurrentChat(chat._id);
    if(socket && isSocketActive && chat.user._id !== currentUser._id){
      socket.emit("chat-clicked", {
        chatId: chat._id,
        toUser: chat.participants.find((id) => id !== currentUser._id)
      });
    }
  }

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src="/search.png" alt="search.png" />
          <input onChange={searchInputHandler} type="text" placeholder="Search" />
        </div>
        <UserNotifications user={currentUser} />
      </div>
      <div className="chatItemContainer">
        {sortedChats.map((chat) => <ChatItem key={chat._id} chat={chat} readColor={chat.read === true ? "blue" : "darkSlateGrey"} chatSelectHandler={() => (chatSelectHandler(chat))} />)}
      </div>
    </div>
  )
}