import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import UserInfo from "../common/UserInfo"
import Options from "./options/Options"
import "./detail.css"

export default function Detail() {
  const handleLogOut = async (e) => {
    signOut(auth);
  }
  return (
    <div className="detail">
      <UserInfo user={"userDetail"} />
      <Options />
      <div className="logoutAndBlock">
        <div className="blockUser">
          <button className="blockUserBtn">Block User</button>
        </div>
        <div className="logout">
          <button onClick={handleLogOut} className="logoutBtn">Logout</button>
        </div>
      </div>
    </div>
  )
}
