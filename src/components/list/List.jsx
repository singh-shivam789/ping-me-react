import useUserStore from "../../lib/stores/user/userStore"
import UserInfo from "../shared//UserInfo"
import ChatList from "./chatList/ChatList"
import "./notifications.css"
import "./list.css"

export default function List() {
  return (
    <div className="list">
      <UserInfo user={useUserStore.getState().user}/>
      <ChatList />
    </div>
  )
}
