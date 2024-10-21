import { useUserStore } from "../../lib/userStore";
import UtilityIcons from "./UtilityIcons"
import "./common.css"
export default function UserInfo({ user }) {
  const { currentUser } = useUserStore();

  return (
    <div className={user === "chatTop" ? "userInfoChat" : user === "userDetail" ? "userDetailContainer" : "userInfoList"}>
      <div className={
        user === "chatTop" ? "userChat"
          : user === "userDetail" ? "userDetail"
            : "userList"}
      >
        <img src={currentUser.avatar || "/avatar.png"} />
        {
          user === "chatTop" || user === "userDetail" ? (
            <div className={user == "userDetail" ? "userDetailNameStatus" : ""}>
              {user == "userDetail" ? <h2>{currentUser.username}</h2> : <h3>{currentUser.username}</h3>}
              <p className="userStatus">Lorem ipsum, dolor sit amet consectetur</p>
            </div>
          ) : (
            <h2>{currentUser.username}</h2>
          )
        }
      </div>
      {user !== "userDetail" && <UtilityIcons user={user} />}
    </div>
  )
}
