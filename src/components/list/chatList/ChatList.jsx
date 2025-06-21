import UserNotifications from "../../shared/UserNotifications";
import useUserStore from "../../../lib/stores/user/userStore";
import useChatStore from "../../../lib/stores/user/chatStore";
import ChatItem from "./ChatItem"
import "./chatList.css"

export default function ChatList() {

  const chats = useChatStore((state) => state.chats);
  const currentUser = useUserStore((state) => state.user);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src="/search.png" alt="search.png" />
          <input type="text" placeholder="Search" />
        </div>
        <UserNotifications user={currentUser} />
      </div>
      <div className="chatItemContainer">
        {chats.map((chat) => <ChatItem key={chat._id} user={chat.user}
          lastMessage={chat.lastMessage} />)}
      </div>
    </div>
  )
}