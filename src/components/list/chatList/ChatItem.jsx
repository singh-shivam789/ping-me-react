import useUserStore from '../../../lib/stores/user/userStore';
import ReadIcon from '../../../assets/tick-double.svg?react';
import "../chatList/chatList.css";
import moment from 'moment';

export default function ChatItem({ chat, chatSelectHandler, readColor }) {
  const currentUser = useUserStore(state => state.user);
  return (
    <div onClick={chatSelectHandler} className="chatItem">
      <div className="chatItemUserInfoContainer">
        <img className="chatItemUserImg" src={chat.user.pfp ? `http://localhost:3000/uploads/${chat.user.pfp}` : "/avatar.png"} alt="chatItemUserImg.png" />
        <div className="chatItemUserInfo">
          <span>{chat.user.email === currentUser.email ? chat.user.username + " (You)" : chat.user.username}</span>
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