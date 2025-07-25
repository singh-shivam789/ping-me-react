import useUserStore from "../../lib/stores/user/userStore";
import "./common.css"

export default function UserInfoChat({ user }) {
  const currentUser = useUserStore((state) => state.user);
  return (
    <div className="userInfoChat">
      {user && (<div className="userChat">
        <img src={user.pfp ? `http://localhost:3000/uploads/${user.pfp}` : "/avatar.png"} alt="Profile" />
        <div>
          <h3>{currentUser.email === user.email ? user.username + " (You)" : user.username}</h3>
          <p className="userStatus">{user.status}</p>
        </div>
      </div>)}
    </div>
  );
}
