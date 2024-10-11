import UserInfo from "../common/UserInfo"
import ChatList from "./chatList/ChatList"
import "./list.css"

export default function List() {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  )
}
