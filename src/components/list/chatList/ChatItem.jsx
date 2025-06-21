import useChatStore from "../../../lib/stores/user/chatStore"

export default function ChatItem({user, lastMessage}) {
  const setChatUser = useChatStore((state) => state.setChatUser);
  const chatListItemHandler = () => {
    setChatUser(user);
  }
  return (
    <div onClick={chatListItemHandler} className="chatItem">
      <img className="chatListUserImg" src={user?.avatar || "/avatar.png"} alt="chatListUserImg.png" />
      <div className="chatListUserInfo">
        <span>{user.username}</span>
        <p>{lastMessage}</p>
      </div>
    </div>
  )
}
