import useUserStore from "../../lib/stores/user/userStore";
import UtilityIcons from "./UtilityIcons"
import "./common.css"

export default function UserInfoChat({ user }) {
  const currentUser = useUserStore((state) => state.user);
  return (
    <div className="userInfoChat">
      {user && (<div className="userChat">
        <img src={user.pfp || "/avatar.png"} alt="Profile" />
        <div>
          <h3>{user.username}</h3>
          <p className="userStatus">{user.status}</p>
        </div>
      </div>)}
      {user._id !== currentUser._id && <UtilityIcons whichUserPage="chatTop" />}
    </div>
  );
}
