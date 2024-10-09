import { useState } from 'react'
import './chatList.css'

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
      <div className="chatItem">
        <img className="chatListUserImg" src="/avatar.png" alt="chatListUserImg.png" />
        <div className="chatListUserInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="chatItem">
        <img className="chatListUserImg" src="/avatar.png" alt="chatListUserImg.png" />
        <div className="chatListUserInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="chatItem">
        <img className="chatListUserImg" src="/avatar.png" alt="chatListUserImg.png" />
        <div className="chatListUserInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="chatItem">
        <img className="chatListUserImg" src="/avatar.png" alt="chatListUserImg.png" />
        <div className="chatListUserInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="chatItem">
        <img className="chatListUserImg" src="/avatar.png" alt="chatListUserImg.png" />
        <div className="chatListUserInfo">
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      </div>
    </div>
  )
}