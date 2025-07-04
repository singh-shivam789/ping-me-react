import ReadIcon from '../../../assets/tick-double.svg?react';
import "../chatList/chatList.css"; 
import moment from 'moment';

export default function ChatItem({ chat, chatSelectHandler, readColor }) {
  return (
    <div onClick={chatSelectHandler} className="chatItem">
      <div className="chatItemUserInfoContainer">
        <img className="chatItemUserImg" src={chat.user?.avatar || "/avatar.png"} alt="chatItemUserImg.png" />
        <div className="chatItemUserInfo">
          <span>{chat.user.username}</span>
          <div className="chatItemMessage">
            {chat.lastMessage && <ReadIcon style={{ color: readColor }} className="readIcon" />
            }
            {chat.lastMessage && <p className='chatItemLastMessageText'>{chat.lastMessage.text}</p>}
          </div>
        </div>
      </div>
      {chat.lastMessage && <p className="chatItemLastMessageTime">{moment(chat.lastMessage.messageTime).calendar(null, {
        sameDay: 'h:mm a',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'MM/DD/YYYY'
      })}</p>}
    </div>
  )
}