
import UserInfo from "../common/UserInfo"
import Settings from "./settings/Settings"
import "./detail.css"
export default function Detail() {
  return (
    <div className="detail">
      <UserInfo user={"userDetail"} />
      <Settings />
      <div className="blockUser">
        <button>Block User</button>
      </div>
    </div>
  )
}
