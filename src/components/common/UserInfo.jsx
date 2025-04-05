import { useUserStore } from "../../lib/stores/user/userStore";
import UtilityIcons from "./UtilityIcons"
import "./common.css"

export default function UserInfo({ whichUserPage }) {
  const user = useUserStore.getState().user;
  return (
    <div className={whichUserPage === "chatTop" ? "userInfoChat" : whichUserPage === "userDetail" ? "userDetailContainer" : "userInfoList"}>
      <div className={
        whichUserPage === "chatTop" ? "userChat"
          : whichUserPage === "userDetail" ? "userDetail"
            : "userList"}
      >
        <img src={user.pfp || "/avatar.png"} />
        {
          whichUserPage === "chatTop" || whichUserPage === "userDetail" ? (
            <div className={whichUserPage === "userDetail" ? "userDetailNameStatus" : ""}>
              {user == "userDetail" ? <h2>{user.username}</h2> : <h3>{user.username}</h3>}
              <p className="userStatus">{user.status}</p>
            </div>
          ) : (
            <h2>{user.username}</h2>
          )
        }
      </div>
      {whichUserPage !== "userDetail" && <UtilityIcons whichUserPage={whichUserPage} />}
    </div>
  )
}
