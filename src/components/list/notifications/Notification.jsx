import { decideFriendRequestStatus } from '../../../utils/userUtils'
import useUserStore from "../../../lib/stores/user/userStore";
import useChatStore from '../../../lib/stores/user/chatStore';
import useAppStore from '../../../lib/stores/app/appStore';

export default function Notification({ user }) {
  const removeFriendRequestUser = useUserStore((state) => state.removeFriendRequestUser);
  const currentUser = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const addToUserFriends = useUserStore(state => state.addToUserFriends);
  const addToChats = useChatStore((state) => state.addToChats);

  const handleFriendRequestReject = () => {
    decideFriendRequestStatus(user.email, currentUser._id, "reject").then((res) => {
      setUser(res.user);
      removeFriendRequestUser(user);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleFriendRequestAccept = () => {
    decideFriendRequestStatus(user.email, currentUser._id, "accept").then((res) => {
      setUser(res.user);
      removeFriendRequestUser(user);
      addToUserFriends({
        _id: user._id,
        username: user.username,
        email: user.email,
        pfp: user.pfp
      });
      const friendId = res.initiatedChat.participants.find((id) => id !== currentUser._id)
      const friend = useAppStore.getState().allUsers.find((user) => user._id === friendId);
      res.initiatedChat.user = friend;
      addToChats(res.initiatedChat);
      toast.info(`${friend.username} accepted your friend request`);
      toast.info(`You can now initiate a chat with them!`);
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <div className='notification'>
      <div className="userInfo">
        <img className='notificationUserImg' src={`${user.pfp}` || "./avatar.png"} />
        <span className='notificationMessage'>
          <span className='notificationUserName'>{`${user.username}`}</span>
          <span> sent you a friend request.</span>
        </span>
      </div>
      <div className='notificationBtns'>
        <button onClick={handleFriendRequestAccept} className='notificationBtn' type="submit">Accept</button>
        <button onClick={handleFriendRequestReject} className='notificationBtn' type="submit">x</button>
      </div>
    </div>
  )
}
