import UserInfoDetail from "./UserInfoDetail";
import UserInfoChat from "./UserInfoChat";
import UserNotifications from "./UserNotifications";

export default function UserInfo({ whichUserPage, user }) {
  if (whichUserPage === "chatTop") return <UserInfoChat user={user}/>;
  else if (whichUserPage === "userDetail") return <UserInfoDetail user={user}/>;
  else return <UserNotifications user={user}/>;
}