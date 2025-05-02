export default function ChatItem(chatData) {
  return (
    <div className="chatItem">
      <img className="chatListUserImg" src={chatData.user?.avatar || "/avatar.png"} alt="chatListUserImg.png" />
      <div className="chatListUserInfo">
        <span>{chatData.user.username}</span>
        <p>{chatData.lastMessage}</p>
      </div>
    </div>
  )
}
