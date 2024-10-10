import { useState } from 'react'
import './chatList.css'
import ChatItem from './ChatItem'
export default function ChatList() {
  const [addRemove, setAddRemove] = useState(true)
  
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img className='searchImg' src="/search.png" alt="search.png" />
          <input type="text" placeholder="Search"/>
        </div>
        <img onClick={() => setAddRemove(prevState => !prevState)} className='addImg' src={addRemove ? "/plus.png" : "/minus.png"} alt="plus.png" />
      </div>
      <div className="chatItemContainer">
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  )
}