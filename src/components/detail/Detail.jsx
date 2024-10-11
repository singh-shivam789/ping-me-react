
import UserInfo from "../common/UserInfo"
import Options from "./options/Options"
import "./detail.css"
export default function Detail() {
  return (
    <div className="detail">
      <UserInfo user={"userDetail"} />
      <Options />
      <div className="blockUser">
        <button>Block User</button>
      </div>
      <div className="logout">
        <button>Logout</button>
      </div>
    </div>
  )
}
