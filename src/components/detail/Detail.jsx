import { useUserStore } from "../../lib/stores/user/userStore";
import { logoutUser } from "../../utils/userUtils";
import UserInfo from "../common/UserInfo";
import Options from "./options/Options";
import { toast } from "react-toastify";
import "./detail.css";

export default function Detail() {
  const handleLogOut = async (e) => {
    try {
      await logoutUser();      
      useUserStore.setState({user: null, isLoading: false});
      toast.dark("Bye!");
    }
    catch (err) {
      console.log("Error", err.message);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="detail">
      <UserInfo whichUserPage={"userDetail"} />
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
