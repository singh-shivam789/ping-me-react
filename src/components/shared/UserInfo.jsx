import UserInfoChat from "./UserInfoChat";
import UserInfoDetail from "./UserInfoDetail";
import UserInfoList from "./UserInfoList";

export default function UserInfo({ whichUserPage, user }) {
  if (whichUserPage === "chatTop") return <UserInfoChat user={user}/>;
  else if (whichUserPage === "userDetail") return <UserInfoDetail user={user}/>;
  else return <UserInfoList user={user}/>;
}