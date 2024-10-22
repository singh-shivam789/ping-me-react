import AddFriend from "../../addFriend/AddFriend"
import ChatItem from "./ChatItem"
import { useState } from "react"
import "./chatList.css"
export default function ChatList() {
  const [addRemove, setAddRemove] = useState(false)
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img className="searchImg" src="/search.png" alt="search.png" />
          <input type="text" placeholder="Search" />
        </div>
        <img onClick={() => setAddRemove(prevState => !prevState)} className="addImg" src={addRemove ? "/minus.png" : "/plus.png"} alt="plus.png" />
      </div>
      <div className="chatItemContainer">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
      {addRemove && <AddFriend />}
    </div>
  )
}