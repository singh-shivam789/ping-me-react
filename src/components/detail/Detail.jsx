import { getInitialUserState, logoutUser } from "../../utils/userUtils";
import useChatStore from "../../lib/stores/user/chatStore";
import useUserStore from "../../lib/stores/user/userStore";
import { getInitialAppState } from "../../utils/appUtils";
import useAppStore from "../../lib/stores/app/appStore";
import FriendOptions from "./options/FriendOptions";
import SelfOptions from "./options/SelfOptions";
import UserInfo from "../shared//UserInfo";
import { toast } from "react-toastify";
import "./detail.css";


export default function Detail() {
  const chatUser = useChatStore((state) => state.chatUser);
  const currentUser =  useUserStore((state) => state.user);
  const removeFriendHandler = () => {
    //TODO: to implement later
  }
  const deleteUserHandler = () => {
    //TODO: to implement later
  }
  const handleLogOut = async (e) => {
    try {
      await logoutUser();
      useUserStore.persist.clearStorage();
      useUserStore.setState(getInitialUserState());
      useAppStore.persist.clearStorage();
      useAppStore.setState(getInitialAppState());
      useChatStore.persist.clearStorage();
      toast.dark("Bye!");
    }
    catch (err) {
      console.log("Error", err.message);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="detail">
      {chatUser && <UserInfo whichUserPage={"userDetail"} user={chatUser} />}
      {chatUser._id !== currentUser._id ? (<FriendOptions />) : (<SelfOptions />)}
      <div className="logoutAndBlock">
        <div className="blockUser">
          <button onClick={chatUser._id !== currentUser._id ? removeFriendHandler : deleteUserHandler} className="blockUserBtn">{chatUser._id !== currentUser._id ? "Remove friend" : "Delete Account"}</button>
        </div>
        <div className="logout">
          <button onClick={handleLogOut} className="logoutBtn">Logout</button>
        </div>
      </div>
    </div>
  )
}
